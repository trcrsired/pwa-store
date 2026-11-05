/* Store engine for the packed catalogue (docs/store/store.bin).
 *
 * The data never leaves wasm memory: the JS side fetches the 210 KB file,
 * drops the bytes straight into the exported buffer, and from then on only
 * asks questions - how many apps match this query, which app is match number
 * i, give me field f of that app as a view into the blob. There is no JS
 * reader and no JS copy of the catalogue, so the page never builds a 0.56 MB
 * object graph and never parses 316 KB of JavaScript.
 *
 * Everything here is freestanding: static buffers, no allocation, no libc, no
 * floating point. Strings are ::fast_io::u8string_view over the mapped bytes,
 * so every offset is bounds checked once at load time and never again.
 */
#include <cstddef>
#include <cstdint>

#include <fast_io.h>
#include <fast_io_dsal/string_view.h>

#define PWA_STORE_EXPORT(name) extern "C" [[gnu::used, gnu::visibility("default")]] \
	__attribute__((export_name(name)))

namespace
{

/* The record layout has to match scripts/gen_store_bin.js, which is the only
 * writer and which verifies a round trip against categories.js. */
inline constexpr ::std::size_t header_size{32};
inline constexpr ::std::size_t category_size{24};
inline constexpr ::std::size_t app_field_count{10};
/* one (u32 offset, u16 length) pair per field, then a u32 of flags */
inline constexpr ::std::size_t app_size{app_field_count * 6 + 4};
inline constexpr ::std::uint_least16_t format_version{1};

inline constexpr ::std::size_t bin_capacity{1u << 21};  /* 2 MiB, catalogue is 210 KB */
inline constexpr ::std::size_t max_apps{8192};
inline constexpr ::std::size_t category_capacity{512};

/* Field indices, in record order. */
inline constexpr ::std::size_t field_name{0};
inline constexpr ::std::size_t field_name_key{1};
inline constexpr ::std::size_t field_icon{2};
inline constexpr ::std::size_t field_url{3};
inline constexpr ::std::size_t field_description_key{4};
inline constexpr ::std::size_t field_url2{5};
inline constexpr ::std::size_t field_apptype{6};
inline constexpr ::std::size_t field_apptype2{7};
inline constexpr ::std::size_t field_url_display{8};
inline constexpr ::std::size_t field_url_display2{9};

/* Fields a text query is matched against: the two display strings and the URL.
 * Icon paths and the *2 variants are not what a user types. */
inline constexpr ::std::size_t searchable_field_count{5};
inline constexpr ::std::size_t searchable_fields[searchable_field_count]{
	field_name, field_name_key, field_description_key, field_url, field_url_display};

alignas(16) char8_t bin_buffer[bin_capacity];
::std::size_t loaded_bytes{};
::fast_io::u8string_view blob{};
::fast_io::u8string_view categories{};
::fast_io::u8string_view apps{};
::std::uint_least32_t loaded_categories{};
::std::uint_least32_t loaded_apps{};

/* Query text is typed, so it gets its own small buffer: the catalogue buffer is
 * never written to after load. */
inline constexpr ::std::size_t query_capacity{512};
alignas(16) char8_t query_buffer[query_capacity];

alignas(16) ::std::uint_least32_t matches[max_apps];
::std::size_t match_count{};
/* Category name of every app, resolved once at load so a card does not have to
 * walk the category table. */
alignas(16) ::std::uint_least32_t app_category[max_apps];
::fast_io::u8string_view category_names[category_capacity];
::std::uint_least32_t category_flags[category_capacity];

[[nodiscard]] inline ::std::uint_least32_t read_u32(char8_t const *p) noexcept
{
	return static_cast<::std::uint_least32_t>(p[0]) |
		   (static_cast<::std::uint_least32_t>(p[1]) << 8) |
		   (static_cast<::std::uint_least32_t>(p[2]) << 16) |
		   (static_cast<::std::uint_least32_t>(p[3]) << 24);
}

[[nodiscard]] inline ::std::uint_least16_t read_u16(char8_t const *p) noexcept
{
	return static_cast<::std::uint_least16_t>(static_cast<::std::uint_least16_t>(p[0]) |
											  (static_cast<::std::uint_least16_t>(p[1]) << 8));
}

/* A (offset, length) pair taken from a record, resolved against the blob. The
 * bounds were checked when the file was loaded, so this is a slice only. */
[[nodiscard]] inline ::fast_io::u8string_view slice(::std::uint_least32_t offset,
													::std::uint_least16_t length) noexcept
{
	if (length == 0)
	{
		return {};
	}
	return ::fast_io::u8string_view(blob.data() + offset, length);
}

[[nodiscard]] inline ::fast_io::u8string_view app_field(::std::size_t index, ::std::size_t field) noexcept
{
	if (index >= loaded_apps || app_field_count <= field)
	{
		return {};
	}
	char8_t const *const record{apps.data() + index * app_size + field * 6};
	return slice(read_u32(record), read_u16(record + 4));
}

[[nodiscard]] inline ::std::uint_least32_t app_flags(::std::size_t index) noexcept
{
	return read_u32(apps.data() + index * app_size + app_field_count * 6);
}

/* ASCII-only case folding. The catalogue has no locale-sensitive casing needs,
 * and ::fast_io::char_category keeps this off any locale table. */
[[nodiscard]] inline char8_t fold(char8_t ch) noexcept
{
	return ::fast_io::char_category::to_c_lower(ch);
}

[[nodiscard]] inline bool contains(::fast_io::u8string_view haystack,
								   ::fast_io::u8string_view needle) noexcept
{
	if (needle.size() > haystack.size())
	{
		return false;
	}
	char8_t const *const base{haystack.data()};
	::std::size_t const last{haystack.size() - needle.size()};
	for (::std::size_t i{}; i <= last; ++i)
	{
		::std::size_t j{};
		while (j != needle.size() && fold(base[i + j]) == fold(needle.data()[j]))
		{
			++j;
		}
		if (j == needle.size())
		{
			return true;
		}
	}
	return false;
}

[[nodiscard]] inline bool app_matches(::std::size_t index, ::fast_io::u8string_view query) noexcept
{
	for (::std::size_t i{}; i != searchable_field_count; ++i)
	{
		if (contains(app_field(index, searchable_fields[i]), query))
		{
			return true;
		}
	}
	return false;
}

enum load_result : ::std::int_least32_t
{
	load_ok = 0,
	load_bad_magic = 1,
	load_bad_version = 2,
	load_truncated = 3,
	load_too_large = 4,
	load_too_many = 5,
	load_bad_sections = 6,
};

} // namespace

/* Where the JS side writes the fetched bytes. */
PWA_STORE_EXPORT("pwa_store_bin_ptr")
::std::uint_least32_t pwa_store_bin_ptr() noexcept
{
	return static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(bin_buffer));
}

PWA_STORE_EXPORT("pwa_store_bin_capacity")
::std::uint_least32_t pwa_store_bin_capacity() noexcept
{
	return static_cast<::std::uint_least32_t>(bin_capacity);
}

/* Validate the header and every section boundary once. After this the record
 * reads are unchecked slices into a buffer we know is well formed. */
PWA_STORE_EXPORT("pwa_store_load")
::std::int_least32_t pwa_store_load(::std::size_t bytes) noexcept
{
	loaded_bytes = 0;
	loaded_categories = 0;
	loaded_apps = 0;
	match_count = 0;

	if (bin_capacity < bytes)
	{
		return load_too_large;
	}
	if (bytes < header_size)
	{
		return load_truncated;
	}
	if (bin_buffer[0] != u8'P' || bin_buffer[1] != u8'W' || bin_buffer[2] != u8'S' || bin_buffer[3] != u8'T')
	{
		return load_bad_magic;
	}
	if (read_u16(bin_buffer + 4) != format_version)
	{
		return load_bad_version;
	}

	::std::uint_least32_t const category_count{read_u32(bin_buffer + 8)};
	::std::uint_least32_t const app_count{read_u32(bin_buffer + 12)};
	::std::uint_least32_t const string_offset{read_u32(bin_buffer + 16)};
	::std::uint_least32_t const string_bytes{read_u32(bin_buffer + 20)};
	::std::uint_least32_t const category_offset{read_u32(bin_buffer + 24)};
	::std::uint_least32_t const app_offset{read_u32(bin_buffer + 28)};

	if (app_count > max_apps || category_count > category_capacity)
	{
		return load_too_many;
	}
	if (string_offset != header_size || category_offset != string_offset + string_bytes ||
		app_offset != category_offset + category_count * category_size)
	{
		return load_bad_sections;
	}
	if (bytes < app_offset + app_count * app_size)
	{
		return load_truncated;
	}

	blob = ::fast_io::u8string_view(bin_buffer + string_offset, string_bytes);
	categories = ::fast_io::u8string_view(bin_buffer + category_offset,
										  static_cast<::std::size_t>(category_count) * category_size);
	apps = ::fast_io::u8string_view(bin_buffer + app_offset,
									static_cast<::std::size_t>(app_count) * app_size);
	loaded_categories = category_count;
	loaded_apps = app_count;

	/* Resolve category names and map every app to its category in one pass. */
	for (::std::uint_least32_t c{}; c != category_count; ++c)
	{
		char8_t const *const record{categories.data() + c * category_size};
		category_names[c] = slice(read_u32(record), read_u16(record + 4));
		category_flags[c] = record[12];
		::std::uint_least32_t const first{read_u32(record + 16)};
		::std::uint_least32_t const count{read_u32(record + 20)};
		for (::std::uint_least32_t i{}; i != count && first + i < app_count; ++i)
		{
			app_category[first + i] = c;
		}
	}
	loaded_bytes = bytes;
	return load_ok;
}

PWA_STORE_EXPORT("pwa_store_loaded_bytes")
::std::uint_least32_t pwa_store_loaded_bytes() noexcept
{
	return static_cast<::std::uint_least32_t>(loaded_bytes);
}

/* app_count in the high half, category_count in the low half. */
PWA_STORE_EXPORT("pwa_store_counts")
::std::uint_least64_t pwa_store_counts() noexcept
{
	return (static_cast<::std::uint_least64_t>(loaded_apps) << 32) | loaded_categories;
}

/* Filter the catalogue. An empty query matches everything, which is the state
 * the page starts in. Returns the number of matches; the indices are read back
 * with pwa_store_match. */
PWA_STORE_EXPORT("pwa_store_query_ptr")
::std::uint_least32_t pwa_store_query_ptr() noexcept
{
	return static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(query_buffer));
}

PWA_STORE_EXPORT("pwa_store_query_capacity")
::std::uint_least32_t pwa_store_query_capacity() noexcept
{
	return static_cast<::std::uint_least32_t>(query_capacity);
}

PWA_STORE_EXPORT("pwa_store_query")
::std::size_t pwa_store_query(::std::size_t query_length) noexcept
{
	match_count = 0;
	if (query_capacity < query_length)
	{
		return 0;
	}
	::fast_io::u8string_view const query(query_buffer, query_length);
	for (::std::size_t i{}; i != loaded_apps; ++i)
	{
		if (query.is_empty() || app_matches(i, query))
		{
			matches[match_count] = static_cast<::std::uint_least32_t>(i);
			++match_count;
		}
	}
	return match_count;
}

PWA_STORE_EXPORT("pwa_store_match_count")
::std::size_t pwa_store_match_count() noexcept
{
	return match_count;
}

PWA_STORE_EXPORT("pwa_store_match")
::std::uint_least32_t pwa_store_match(::std::size_t index) noexcept
{
	if (match_count <= index)
	{
		return 0xFFFFFFFFu;
	}
	return matches[index];
}

/* A field of one app, as a view into the blob: pointer in the high 32 bits,
 * length in the low 32. The JS side reads it with a Uint8Array subarray, so
 * nothing is copied and nothing is decoded until a card needs it. */
PWA_STORE_EXPORT("pwa_store_field")
::std::uint_least64_t pwa_store_field(::std::uint_least32_t app, ::std::uint_least32_t field) noexcept
{
	::fast_io::u8string_view const value{app_field(app, field)};
	return (static_cast<::std::uint_least64_t>(
				static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(value.data())))
			<< 32) |
		   static_cast<::std::uint_least32_t>(value.size());
}

PWA_STORE_EXPORT("pwa_store_app_flags")
::std::uint_least32_t pwa_store_app_flags(::std::uint_least32_t app) noexcept
{
	return app >= loaded_apps ? 0u : app_flags(app);
}

/* Category name of an app: pointer in the high 32 bits, length in the low 32. */
PWA_STORE_EXPORT("pwa_store_app_category")
::std::uint_least64_t pwa_store_app_category(::std::uint_least32_t app) noexcept
{
	if (app >= loaded_apps)
	{
		return 0;
	}
	::fast_io::u8string_view const name{category_names[app_category[app]]};
	return (static_cast<::std::uint_least64_t>(
				static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(name.data())))
			<< 32) |
		   static_cast<::std::uint_least32_t>(name.size());
}

PWA_STORE_EXPORT("pwa_store_category_name")
::std::uint_least64_t pwa_store_category_name(::std::uint_least32_t category) noexcept
{
	if (loaded_categories <= category)
	{
		return 0;
	}
	::fast_io::u8string_view const name{category_names[category]};
	return (static_cast<::std::uint_least64_t>(
				static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(name.data())))
			<< 32) |
		   static_cast<::std::uint_least32_t>(name.size());
}

PWA_STORE_EXPORT("pwa_store_category_flags")
::std::uint_least32_t pwa_store_category_flags(::std::uint_least32_t category) noexcept
{
	return loaded_categories <= category ? 0u : category_flags[category];
}

/* First app and app count of a category: needed for the category legend. */
PWA_STORE_EXPORT("pwa_store_category_span")
::std::uint_least64_t pwa_store_category_span(::std::uint_least32_t category) noexcept
{
	if (loaded_categories <= category)
	{
		return 0;
	}
	char8_t const *const record{categories.data() + category * category_size};
	return (static_cast<::std::uint_least64_t>(read_u32(record + 16)) << 32) | read_u32(record + 20);
}
