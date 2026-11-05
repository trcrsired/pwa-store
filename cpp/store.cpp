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

/* ---------------------------------------------------------------------------
 * Markup generation.
 *
 * Everything above answers questions; this part writes HTML. The JS side ends
 * up doing one innerHTML assignment per render, with no per-card element
 * creation, no per-card listeners and no per-card closures - the delegated
 * listener on #app-store handles every card on the page.
 *
 * Localisation stays in JavaScript: the JS side pushes the active locale table
 * in once (and again whenever the language changes) and the engine resolves
 * keys while printing. That keeps the translations where they are authored,
 * while the DOM itself is still built here.
 * ------------------------------------------------------------------------ */

namespace
{

template <::std::size_t N>
[[nodiscard]] constexpr ::fast_io::u8string_view lit(char8_t const (&text)[N]) noexcept
{
	return ::fast_io::u8string_view(text, N - 1);
}

/* ---- output ------------------------------------------------------------ */

inline constexpr ::std::size_t out_capacity{1u << 21};		/* 2 MiB: all 1297 cards fit */
inline constexpr ::std::size_t legend_capacity{1u << 16};	/* 64 KiB: 56 badges */
alignas(16) char8_t out_buffer[out_capacity];
alignas(16) char8_t legend_buffer[legend_capacity];

struct sink
{
	char8_t *base;
	::std::size_t capacity;
	::std::size_t used{};
	bool overflow{};

	void append(char8_t const *bytes, ::std::size_t count) noexcept
	{
		if (capacity - used < count)
		{
			overflow = true;
			return;
		}
		if (count != 0)
		{
			::fast_io::freestanding::my_memcpy(base + used, bytes, count);
			used += count;
		}
	}
	void append(::fast_io::u8string_view text) noexcept { append(text.data(), text.size()); }
	void put(char8_t ch) noexcept
	{
		if (capacity <= used)
		{
			overflow = true;
			return;
		}
		base[used] = ch;
		++used;
	}
	/* Text and attribute values are escaped the same way: the five characters
	 * that can end a text node or an attribute early. */
	void append_escaped(::fast_io::u8string_view text) noexcept
	{
		for (::std::size_t i{}; i != text.size(); ++i)
		{
			char8_t const ch{text.data()[i]};
			switch (ch)
			{
			case u8'&':
				append(lit(u8"&amp;"));
				break;
			case u8'<':
				append(lit(u8"&lt;"));
				break;
			case u8'>':
				append(lit(u8"&gt;"));
				break;
			case u8'"':
				append(lit(u8"&quot;"));
				break;
			case u8'\'':
				append(lit(u8"&#39;"));
				break;
			default:
				put(ch);
			}
			if (overflow) { return; }
		}
	}
	void append_number(::std::size_t value) noexcept
	{
		char8_t digits[24];
		::std::size_t count{};
		do
		{
			digits[count++] = static_cast<char8_t>(u8'0' + (value % 10));
			value /= 10;
		} while (value != 0);
		while (count != 0)
		{
			put(digits[--count]);
		}
	}
};

/* ---- localisation ------------------------------------------------------ */

inline constexpr ::std::size_t l10n_slots{8192};   /* power of two */
inline constexpr ::std::size_t l10n_max{4096};
inline constexpr ::std::size_t staging_capacity{2u << 20};

alignas(16) ::fast_io::u8string_view l10n_keys[l10n_max];
alignas(16) ::fast_io::u8string_view l10n_values[l10n_max];
alignas(16) ::std::uint_least32_t l10n_table[l10n_slots];	/* 0 = empty, otherwise index + 1 */
::std::size_t l10n_count{};

/* Pairs are appended here by the JS side and never moved, so the views above
 * stay valid. */
alignas(16) char8_t staging_buffer[staging_capacity];
::std::size_t staging_used{};

/* Hand rolled: ::fast_io::freestanding::my_memcmp compiles to a memcmp call,
 * which a freestanding module would have to import. */
[[nodiscard]] inline bool bytes_equal(char8_t const *left, char8_t const *right,
									  ::std::size_t count) noexcept
{
	for (::std::size_t i{}; i != count; ++i)
	{
		if (left[i] != right[i])
		{
			return false;
		}
	}
	return true;
}

[[nodiscard]] inline ::std::size_t hash_key(::fast_io::u8string_view key) noexcept
{
	::std::uint_least32_t hash{2166136261u};
	for (::std::size_t i{}; i != key.size(); ++i)
	{
		hash ^= key.data()[i];
		hash *= 16777619u;
	}
	return hash & (l10n_slots - 1);
}

/* Returns the value for key, or an empty view. */
[[nodiscard]] inline ::fast_io::u8string_view l10n_lookup(::fast_io::u8string_view key) noexcept
{
	if (l10n_count == 0 || key.is_empty())
	{
		return {};
	}
	::std::size_t slot{hash_key(key)};
	for (;;)
	{
		::std::uint_least32_t const entry{l10n_table[slot]};
		if (entry == 0)
		{
			return {};
		}
		::fast_io::u8string_view const stored{l10n_keys[entry - 1]};
		if (stored.size() == key.size() && bytes_equal(stored.data(), key.data(), key.size()))
		{
			return l10n_values[entry - 1];
		}
		slot = (slot + 1) & (l10n_slots - 1);
	}
}

/* L(key) semantics: the localised text, or the key itself when the locale has
 * no entry, so a missing translation shows up as a visible identifier instead
 * of disappearing. */
[[nodiscard]] inline ::fast_io::u8string_view translate(::fast_io::u8string_view key) noexcept
{
	::fast_io::u8string_view const value{l10n_lookup(key)};
	return value.is_empty() ? key : value;
}

[[nodiscard]] inline ::fast_io::u8string_view translate_or(::fast_io::u8string_view key,
														   ::fast_io::u8string_view fallback) noexcept
{
	::fast_io::u8string_view const value{l10n_lookup(key)};
	if (value.is_empty())
	{
		return fallback;
	}
	return value;
}

/* ---- filtering --------------------------------------------------------- */

/* Filter bits: which kinds of app the toolbar has switched on. */
inline constexpr ::std::uint_least32_t filter_pwa{1u << 0};
inline constexpr ::std::uint_least32_t filter_wechat{1u << 1};
inline constexpr ::std::uint_least32_t filter_native{1u << 2};

[[nodiscard]] inline bool equals_folded(::fast_io::u8string_view left,
										::fast_io::u8string_view right) noexcept
{
	if (left.size() != right.size())
	{
		return false;
	}
	for (::std::size_t i{}; i != left.size(); ++i)
	{
		if (fold(left.data()[i]) != fold(right.data()[i]))
		{
			return false;
		}
	}
	return true;
}

[[nodiscard]] inline ::std::uint_least32_t app_kind(::fast_io::u8string_view apptype) noexcept
{
	if (apptype.is_empty())
	{
		return filter_pwa;
	}
	if (equals_folded(apptype, lit(u8"wechat")) || equals_folded(apptype, lit(u8"wechatmini")))
	{
		return filter_wechat;
	}
	if (equals_folded(apptype, lit(u8"native")))
	{
		return filter_native;
	}
	return filter_pwa;
}

[[nodiscard]] inline bool selected_by_kind(::std::size_t index, ::std::uint_least32_t filter_flags) noexcept
{
	::std::uint_least32_t kinds{app_kind(app_field(index, field_apptype))};
	::fast_io::u8string_view const apptype2{app_field(index, field_apptype2)};
	if (!apptype2.is_empty())
	{
		kinds |= app_kind(apptype2);
	}
	return (kinds & filter_flags) != 0;
}

[[nodiscard]] inline bool visible(::std::size_t index, bool nsfw_allowed) noexcept
{
	::std::uint_least32_t const flags{app_flags(index)};
	if ((flags & 2u) != 0u) /* hide */
	{
		return false;
	}
	if ((flags & 1u) != 0u && !nsfw_allowed) /* nsfw */
	{
		return false;
	}
	return true;
}

/* The strings a query is matched against, in the order the JS side used to
 * concatenate them: localised name, raw name, localised description, raw
 * description key, url, url2, and both display strings. */
[[nodiscard]] inline bool app_matches_query(::std::size_t index, ::fast_io::u8string_view query) noexcept
{
	if (query.is_empty())
	{
		return true;
	}
	::fast_io::u8string_view const name_key{app_field(index, field_name_key)};
	if (contains(app_field(index, field_name), query) ||
		(!name_key.is_empty() && contains(translate(name_key), query)) ||
		contains(name_key, query))
	{
		return true;
	}
	::fast_io::u8string_view const description_key{app_field(index, field_description_key)};
	if (contains(description_key, query) ||
		(!description_key.is_empty() && contains(translate(description_key), query)))
	{
		return true;
	}
	return contains(app_field(index, field_url), query) || contains(app_field(index, field_url2), query) ||
		   contains(app_field(index, field_url_display), query) ||
		   contains(app_field(index, field_url_display2), query);
}

[[nodiscard]] inline bool category_matches_query(::std::uint_least32_t category,
												 ::fast_io::u8string_view query) noexcept
{
	if (query.is_empty())
	{
		return true;
	}
	char8_t const *const record{categories.data() + category * category_size};
	::fast_io::u8string_view const name{slice(read_u32(record), read_u16(record + 4))};
	if (contains(name, query))
	{
		return true;
	}
	::fast_io::u8string_view const key{slice(read_u32(record + 6), read_u16(record + 10))};
	return !key.is_empty() && contains(translate(key), query);
}

/* ---- render state ------------------------------------------------------ */

struct page_state
{
	::std::size_t total{};
	::std::size_t page{1};
	::std::size_t pages{};
	::std::size_t page_apps{};
	::std::size_t page_size{200};
};

page_state last_page{};
alignas(16) ::std::size_t category_hits[category_capacity];
alignas(16) ::std::size_t category_first_page[category_capacity];
::std::size_t legend_used{};

} // namespace

/* ---- the renderer ------------------------------------------------------ */

namespace
{

/* One card. The element order mirrors the DOM the JS renderer used to build,
 * so the existing stylesheet keeps working unchanged. */
void emit_card(sink &out, ::std::size_t index, bool install_enabled) noexcept
{
	::fast_io::u8string_view const name_key{app_field(index, field_name_key)};
	::fast_io::u8string_view const name{translate_or(name_key, app_field(index, field_name))};
	::fast_io::u8string_view const description_key{app_field(index, field_description_key)};
	::fast_io::u8string_view const description{translate(description_key)};
	::fast_io::u8string_view const apptype{app_field(index, field_apptype)};
	::fast_io::u8string_view const apptype2{app_field(index, field_apptype2)};
	::std::uint_least32_t const flags{app_flags(index)};

	out.append(lit(u8"<div class=\"app-card\"><img src=\""));
	out.append_escaped(app_field(index, field_icon));
	out.append(lit(u8"\" alt=\""));
	out.append_escaped(name);
	out.append(lit(u8"\" class=\"app-icon\" loading=\"lazy\" decoding=\"async\" />"
					 "<div class=\"app-name\">"));
	out.append_escaped(name);
	out.append(lit(u8"</div><div class=\"app-description\">"));
	out.append_escaped(description);
	out.append(lit(u8"</div>"));
	if ((flags & 1u) != 0u)
	{
		out.append(lit(u8"<span class=\"nsfw-badge\">NSFW</span>"));
	}
	if (!apptype.is_empty() && !equals_folded(apptype, lit(u8"pwa")))
	{
		out.append(lit(u8"<span class=\"apptype-badge\">"));
		out.append_escaped(translate(apptype));
		out.append(lit(u8"</span>"));
	}

	/* The WeChat entries all point at the same redirect directory, and which
	 * one it is depends on the active language. */
	::fast_io::u8string_view const wechat_directory{lit(u8"../store/wechat/")};
	::fast_io::u8string_view const wechat_language{translate_or(lit(u8"lang"), lit(u8"enus"))};

	auto emit_links = [&](::fast_io::u8string_view type, ::fast_io::u8string_view url,
						  ::fast_io::u8string_view url_display) {
		bool const is_wechat{equals_folded(type, lit(u8"wechat"))};
		::fast_io::u8string_view target{url};
		if (is_wechat)
		{
			out.append(lit(u8"<div class=\"app-url\">"));
			out.append_escaped(wechat_directory);
			out.append_escaped(wechat_language);
			out.append(lit(u8"/</div>"));
			target = {};
		}
		if (!url_display.is_empty())
		{
			out.append(lit(u8"<div class=\"app-url\">"));
			out.append_escaped(url_display);
			out.append(lit(u8"</div>"));
		}
		if (!target.is_empty())
		{
			out.append(lit(u8"<div class=\"app-url\">"));
			out.append_escaped(target);
			out.append(lit(u8"</div>"));
		}
		return target;
	};

	/* Both URL blocks are printed before the buttons, so all buttons can share
	 * one actions container: the JS renderer appended the second type's button
	 * into the same container anyway. */
	::fast_io::u8string_view const url{app_field(index, field_url)};
	::fast_io::u8string_view const url2{app_field(index, field_url2)};
	::fast_io::u8string_view const url_display{app_field(index, field_url_display)};
	::fast_io::u8string_view const url_display2{app_field(index, field_url_display2)};

	::fast_io::u8string_view const target1{emit_links(apptype, url, url_display)};
	::fast_io::u8string_view const target2{apptype2.is_empty() ? ::fast_io::u8string_view{}
															   : emit_links(apptype2, url2, url_display2)};

	auto emit_button = [&](::fast_io::u8string_view type, ::fast_io::u8string_view target) {
		bool const is_wechat_mini{equals_folded(type, lit(u8"wechatmini"))};
		::fast_io::u8string_view const wechat_target{
			equals_folded(type, lit(u8"wechat"))
				? ::fast_io::u8string_view{}
				: target};
		if (is_wechat_mini)
		{
			out.append(lit(u8"<button class=\"install-button\" data-copy=\""));
			out.append_escaped(wechat_target);
			out.append(lit(u8"\">"));
			out.append_escaped(translate(lit(u8"copyurl_desc")));
			out.append(lit(u8"</button>"));
			return;
		}
		::fast_io::u8string_view const label{
			equals_folded(type, lit(u8"wrapper")) ? translate(lit(u8"open_wrapper_desc"))
												 : translate(lit(u8"open_desc"))};
		if (!wechat_target.is_empty())
		{
			out.append(lit(u8"<a class=\"install-button\" href=\""));
			out.append_escaped(wechat_target);
			out.append(lit(u8"\">"));
		}
		else
		{
			out.append(lit(u8"<a class=\"install-button\">"));
		}
		out.append_escaped(label);
		out.append(lit(u8"</a>"));
		if (!install_enabled || equals_folded(type, lit(u8"native")) || equals_folded(type, lit(u8"wechat")))
		{
			return;
		}
		out.append(lit(u8"<button class=\"install-button\" data-install=\""));
		out.append_escaped(target);
		out.append(lit(u8"\">"));
		out.append_escaped(equals_folded(type, lit(u8"wrapper")) ? translate(lit(u8"install_wrapper_desc"))
																 : translate(lit(u8"install_desc")));
		out.append(lit(u8"</button>"));
	};

	out.append(lit(u8"<div class=\"card-actions\">"));
	emit_button(apptype, url);
	if (!apptype2.is_empty())
	{
		emit_button(apptype2, url2);
	}
	out.append(lit(u8"</div>"));

	if (!apptype2.is_empty())
	{
		out.append(lit(u8"<span class=\"apptype-badge\">"));
		out.append_escaped(translate(apptype2));
		out.append(lit(u8"</span>"));
		/* The second type prints its own links only when they say something the
		 * first type did not. */
		if (!url_display2.is_empty() && !equals_folded(url_display2, url_display))
		{
			out.append(lit(u8"<div class=\"app-url\">"));
			out.append_escaped(url_display2);
			out.append(lit(u8"</div>"));
		}
		if (!target2.is_empty() && !equals_folded(target2, url_display))
		{
			out.append(lit(u8"<div class=\"app-url\">"));
			out.append_escaped(target2);
			out.append(lit(u8"</div>"));
		}
	}
	out.append(lit(u8"</div>"));
}

/* Both passes over the catalogue agree on what a match is; this is the one
 * definition. */
[[nodiscard]] bool counted_in_category(::std::uint_least32_t category, ::fast_io::u8string_view query,
									   ::std::uint_least32_t filter_flags, bool nsfw_allowed,
									   bool category_hit) noexcept
{
	char8_t const *const record{categories.data() + category * category_size};
	if ((record[12] & 1u) != 0u && !nsfw_allowed)
	{
		return false; /* an NSFW category hides all of its apps */
	}
	::std::uint_least32_t const first{read_u32(record + 16)};
	::std::uint_least32_t const count{read_u32(record + 20)};
	for (::std::uint_least32_t i{}; i != count && first + i < loaded_apps; ++i)
	{
		::std::size_t const index{static_cast<::std::size_t>(first + i)};
		if (!visible(index, nsfw_allowed) || !selected_by_kind(index, filter_flags))
		{
			continue;
		}
		if (category_hit || app_matches_query(index, query))
		{
			return true;
		}
	}
	return false;
}

} // namespace

PWA_STORE_EXPORT("pwa_store_staging_ptr")
::std::uint_least32_t pwa_store_staging_ptr() noexcept
{
	return static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(staging_buffer));
}

PWA_STORE_EXPORT("pwa_store_staging_capacity")
::std::uint_least32_t pwa_store_staging_capacity() noexcept
{
	return static_cast<::std::uint_least32_t>(staging_capacity);
}

PWA_STORE_EXPORT("pwa_store_l10n_reset")
void pwa_store_l10n_reset() noexcept
{
	l10n_count = 0;
	staging_used = 0;
	for (::std::size_t i{}; i != l10n_slots; ++i)
	{
		l10n_table[i] = 0;
	}
}

/* One pair per call; the key starts at offset and the value immediately
 * follows it. Re-adding a key overwrites it, so a fallback table can be pushed
 * first and the active language over it. */
PWA_STORE_EXPORT("pwa_store_l10n_add")
::std::int_least32_t pwa_store_l10n_add(::std::size_t offset, ::std::size_t key_length,
										::std::size_t value_length) noexcept
{
	::std::size_t const total{key_length + value_length};
	if (staging_capacity < offset + total)
	{
		return 1;
	}
	if (l10n_slots <= l10n_count * 2)
	{
		return 2;
	}
	::fast_io::u8string_view const key(staging_buffer + offset, key_length);
	::fast_io::u8string_view const value(staging_buffer + offset + key_length, value_length);
	if (staging_used < offset + total)
	{
		staging_used = offset + total;
	}
	::std::size_t const hash{hash_key(key)};
	::std::size_t slot{hash};
	for (;;)
	{
		::std::uint_least32_t const entry{l10n_table[slot]};
		if (entry == 0)
		{
			if (l10n_max <= l10n_count)
			{
				return 2;
			}
			l10n_keys[l10n_count] = key;
			l10n_values[l10n_count] = value;
			l10n_table[slot] = static_cast<::std::uint_least32_t>(l10n_count + 1);
			++l10n_count;
			return 0;
		}
		::fast_io::u8string_view const stored{l10n_keys[entry - 1]};
		if (stored.size() == key.size() && bytes_equal(stored.data(), key.data(), key.size()))
		{
			l10n_values[entry - 1] = value;
			return 0;
		}
		slot = (slot + 1) & (l10n_slots - 1);
	}
}

PWA_STORE_EXPORT("pwa_store_l10n_count")
::std::size_t pwa_store_l10n_count() noexcept
{
	return l10n_count;
}

/* Translate one key, for the handful of strings the toolbar needs. */
PWA_STORE_EXPORT("pwa_store_translate")
::std::uint_least64_t pwa_store_translate(::std::size_t offset, ::std::size_t key_length) noexcept
{
	if (staging_capacity < offset + key_length)
	{
		return 0;
	}
	::fast_io::u8string_view const value{translate(::fast_io::u8string_view(staging_buffer + offset, key_length))};
	return (static_cast<::std::uint_least64_t>(
				static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(value.data())))
			<< 32) |
		   static_cast<::std::uint_least32_t>(value.size());
}

/* Render one page of cards. Returns the markup as pointer << 32 | length; the
 * counters are read back with pwa_store_last_*. */
PWA_STORE_EXPORT("pwa_store_render")
::std::uint_least64_t pwa_store_render(::std::size_t query_length, ::std::size_t page,
									   ::std::size_t page_size, ::std::uint_least32_t filter_flags,
									   ::std::uint_least32_t nsfw_allowed,
									   ::std::uint_least32_t install_enabled) noexcept
{
	sink out{out_buffer, out_capacity};
	sink legend{legend_buffer, legend_capacity};
	last_page = page_state{};
	legend_used = 0;
	if (query_capacity < query_length || page_size == 0)
	{
		return 0;
	}
	::fast_io::u8string_view const query(query_buffer, query_length);
	bool const nsfw{nsfw_allowed != 0};

	/* Pass one: per-category match counts, running total, first page of each
	 * category for the legend. */
	::std::size_t total{};
	for (::std::uint_least32_t category{}; category != loaded_categories; ++category)
	{
		bool const category_hit{category_matches_query(category, query)};
		char8_t const *const record{categories.data() + category * category_size};
		::std::uint_least32_t const first{read_u32(record + 16)};
		::std::uint_least32_t const count{read_u32(record + 20)};
		::std::size_t hits{};
		bool const usable{counted_in_category(category, query, filter_flags, nsfw, category_hit)};
		if (usable)
		{
			for (::std::uint_least32_t i{}; i != count && first + i < loaded_apps; ++i)
			{
				::std::size_t const index{static_cast<::std::size_t>(first + i)};
				if (visible(index, nsfw) && selected_by_kind(index, filter_flags) &&
					(category_hit || app_matches_query(index, query)))
				{
					++hits;
				}
			}
		}
		category_hits[category] = hits;
		category_first_page[category] = total / page_size + 1;
		total += hits;
	}

	last_page.total = total;
	last_page.page_size = page_size;
	last_page.pages = (total + page_size - 1) / page_size;
	last_page.page = page == 0 ? 1 : (last_page.pages < page ? (last_page.pages == 0 ? 1 : last_page.pages) : page);
	::std::size_t const page_start{(last_page.page - 1) * page_size};
	::std::size_t const page_end{page_start + page_size};

	/* Pass two: emit only what falls on this page, but keep walking so the
	 * continuation markers know about the parts that did not. */
	if (total != 0)
	{
		::std::size_t seen{};
		for (::std::uint_least32_t category{}; category != loaded_categories; ++category)
		{
			::std::size_t const hits{category_hits[category]};
			if (hits == 0)
			{
				continue;
			}
			::std::size_t const first_global{seen};
			::std::size_t const last_global{seen + hits - 1};
			seen += hits;

			bool const on_this_page{first_global < page_end && page_start <= last_global};
			if (!on_this_page)
			{
				continue;
			}

			char8_t const *const record{categories.data() + category * category_size};
			::fast_io::u8string_view const name_key{slice(read_u32(record + 6), read_u16(record + 10))};
			::fast_io::u8string_view const name{translate_or(name_key, slice(read_u32(record), read_u16(record + 4)))};
			::std::uint_least32_t const first_app{read_u32(record + 16)};
			::std::uint_least32_t const app_count{read_u32(record + 20)};
			::std::size_t const visible_hits{
				(page_end < last_global + 1 ? page_end : last_global + 1) - (first_global < page_start ? page_start : first_global)};

			out.append(lit(u8"<section class=\"category-block\"><h2 class=\"category-heading expanded\" "
							 "role=\"button\" tabindex=\"0\" aria-expanded=\"true\"><span class=\"category-title\">"));
			out.append_escaped(name);
			out.append(lit(u8" <span class=\"category-count\">("));
			out.append_number(visible_hits);
			out.append(lit(u8")</span>"));
			if ((record[12] & 1u) != 0u)
			{
				out.append(lit(u8" <span class=\"nsfw-badge\">NSFW</span>"));
			}
			out.append(lit(u8"</span></h2>"));

			if (first_global < page_start)
			{
				out.append(lit(u8"<div class=\"category-continuation category-continuation-top\" "
								 "data-page=\""));
				out.append_number(last_page.page - 1);
				out.append(lit(u8"\">"));
				out.append_escaped(translate(lit(u8"more_on_prev_page")));
				out.append(lit(u8"</div>"));
			}

			out.append(lit(u8"<div class=\"app-grid expanded\">"));
			::std::size_t position{first_global};
			for (::std::uint_least32_t i{}; i != app_count && first_app + i < loaded_apps; ++i)
			{
				::std::size_t const index{static_cast<std::size_t>(first_app + i)};
				if (!visible(index, nsfw) || !selected_by_kind(index, filter_flags))
				{
					continue;
				}
				bool const category_hit{category_matches_query(category, query)};
				if (!category_hit && !app_matches_query(index, query))
				{
					continue;
				}
				if (page_start <= position && position < page_end)
				{
					emit_card(out, index, install_enabled != 0);
				}
				++position;
			}
			out.append(lit(u8"</div>"));

			if (page_end <= last_global)
			{
				out.append(lit(u8"<div class=\"category-continuation\" data-page=\""));
				out.append_number(last_page.page + 1);
				out.append(lit(u8"\">"));
				out.append_escaped(translate(lit(u8"more_on_next_page")));
				out.append(lit(u8"</div>"));
			}
			out.append(lit(u8"</section>"));
		}
	}
	last_page.page_apps =
		(total < page_end ? total : page_end) - (page_start < total ? page_start : total);

	/* The legend lists every category that still has a match, with the page it
	 * starts on, so a click does not have to search the flat list again. */
	for (::std::uint_least32_t category{}; category != loaded_categories; ++category)
	{
		if (category_hits[category] == 0)
		{
			continue;
		}
		char8_t const *const record{categories.data() + category * category_size};
		::fast_io::u8string_view const name_key{slice(read_u32(record + 6), read_u16(record + 10))};
		::fast_io::u8string_view const name{translate_or(name_key, slice(read_u32(record), read_u16(record + 4)))};
		legend.append(lit(u8"<span class=\"category-badge clickable\" data-page=\""));
		legend.append_number(category_first_page[category]);
		legend.append(lit(u8"\" data-category=\""));
		legend.append_escaped(name);
		legend.append(lit(u8"\">"));
		legend.append_escaped(name);
		if ((record[12] & 1u) != 0u)
		{
			legend.append(lit(u8"<span class=\"nsfw-badge\">NSFW</span>"));
		}
		legend.append(lit(u8"</span>"));
	}
	legend_used = legend.used;

	if (out.overflow || legend.overflow)
	{
		return 0; /* never hand back a truncated page */
	}
	return (static_cast<::std::uint_least64_t>(
				static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(out_buffer)))
			<< 32) |
		   static_cast<::std::uint_least32_t>(out.used);
}

PWA_STORE_EXPORT("pwa_store_legend")
::std::uint_least64_t pwa_store_legend() noexcept
{
	return (static_cast<::std::uint_least64_t>(
				static_cast<::std::uint_least32_t>(reinterpret_cast<::std::uintptr_t>(legend_buffer)))
			<< 32) |
		   static_cast<::std::uint_least32_t>(legend_used);
}

PWA_STORE_EXPORT("pwa_store_last_total")
::std::size_t pwa_store_last_total() noexcept
{
	return last_page.total;
}

PWA_STORE_EXPORT("pwa_store_last_pages")
::std::size_t pwa_store_last_pages() noexcept
{
	return last_page.pages;
}

PWA_STORE_EXPORT("pwa_store_last_page")
::std::size_t pwa_store_last_page() noexcept
{
	return last_page.page;
}

PWA_STORE_EXPORT("pwa_store_last_page_apps")
::std::size_t pwa_store_last_page_apps() noexcept
{
	return last_page.page_apps;
}
