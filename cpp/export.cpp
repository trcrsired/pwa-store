import fast_io;
import pwa_store;
#include <algorithm>
#include <cstddef>

namespace pwa_store {
inline constexpr ::fast_io::basic_io_scatter_t<char8_t>
print_alias_define(::fast_io::io_alias_t, ::pwa_store::strlit str) noexcept {
  return {str.ptr, str.len};
}
} // namespace pwa_store

namespace {

::fast_io::u8string search_text;
::fast_io::u8string generated_dom;
::fast_io::u8string temp_buffer;

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

inline constexpr bool empty_strlit(::pwa_store::strlit s) noexcept {
  return s.ptr == nullptr || s.len == 0;
}

inline constexpr void to_lower_inplace(::fast_io::u8string &s) noexcept {
  ::fast_io::char_category::ranges::to_c_lower(s);
}
// ------------------------------------------------------------
// Search logic
// ------------------------------------------------------------

inline constexpr bool contains_ci(::fast_io::u8string_view haystack_lower,
                                  ::fast_io::u8string_view needle_lower) {
  if (needle_lower.is_empty())
    return true;

  return std::search(haystack_lower.begin(), haystack_lower.end(),
                     needle_lower.begin(),
                     needle_lower.end()) != haystack_lower.end();
}

inline constexpr bool field_matches(pwa_store::strlit s) noexcept {
  if (empty_strlit(s))
    return false;

  // copy field into temp_buffer
  temp_buffer.clear();
  temp_buffer.append(s.ptr, s.ptr + s.len);

  // lowercase in-place
  to_lower_inplace(temp_buffer);

  // compare
  return contains_ci(
      ::fast_io::u8string_view(temp_buffer.data(), temp_buffer.size()),
      ::fast_io::u8string_view(search_text.data(), search_text.size()));
}

inline constexpr bool type_allowed(pwa_store::app_type t,
                                   ::std::uint_least32_t mask) noexcept {
  switch (t) {
  case pwa_store::app_type::pwa:
  case pwa_store::app_type::wrapper:
  case pwa_store::app_type::msedge:
    return (mask & 1u);

  case pwa_store::app_type::wechat:
  case pwa_store::app_type::wechatmini:
    return (mask & 2u);

  case pwa_store::app_type::native:
    return (mask & 4u);

  default:
    return false;
  }
}

inline constexpr bool app_matches_filter(pwa_store::app_entry const &app,
                                         ::std::uint_least32_t mask) noexcept {
  if (!type_allowed(app.apptype1, mask) && !type_allowed(app.apptype2, mask)) {
    return false;
  }

  if (search_text.is_empty()) {
    return true;
  }

  // match each field individually
  if (field_matches(app.name_localized))
    return true;
  if (field_matches(app.name))
    return true;
  if (field_matches(app.description_localized))
    return true;
  if (field_matches(app.url1))
    return true;
  if (field_matches(app.url2))
    return true;

  return false;
}

// ------------------------------------------------------------
// DOM rendering
// ------------------------------------------------------------

inline constexpr void
render_app_card(pwa_store::app_entry const &app) noexcept {
  ::fast_io::u8ostring_ref_fast_io oref{__builtin_addressof(generated_dom)};

  //
  // Card container with metadata
  //
  if (app.apptype2 == pwa_store::app_type::none) {
    print(oref, u8R"(<div class="app-card" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype1), u8R"(">)");
  } else {
    print(oref, u8R"(<div class="app-card" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype1),
          u8R"(" data-apptype2=")",
          static_cast<::std::uint_least8_t>(app.apptype2), u8R"(">)");
  }

  //
  // Icon
  //
  print(oref, u8R"(<img src=")", app.icon, u8R"(" alt=")", app.name_localized,
        u8R"(" class="app-icon" loading="lazy" decoding="async" />)"

        //
        // Name + description
        //
        u8R"(<div class="app-name">)",
        app.name_localized, u8"</div>", u8R"(<div class="app-description">)",
        app.description_localized, u8"</div>");

  //
  // Badge for primary apptype (numeric)
  //
  if (app.apptype1 != pwa_store::app_type::pwa) {
    print(oref, u8R"(<span class="apptype-badge" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype1), u8R"("></span>)");
  }

  //
  // Primary URL
  //
  if (!empty_strlit(app.url1)) {
    print(oref, u8R"(<div class="app-url">)", app.url1, u8"</div>");
  }

  //
  // Actions container
  //
  print(oref, u8R"(<div class="card-actions">)");

  //
  // Primary button
  //
  if (!empty_strlit(app.url1)) {
    print(oref, u8R"(<a class="install-button" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype1), u8R"(" href=")",
          app.url1, u8R"(">Open</a>)");
  }

  //
  // Secondary URL + button — ONLY if apptype2 exists
  //
  if (app.apptype2 != pwa_store::app_type::none && !empty_strlit(app.url2)) {
    // Secondary badge
    print(oref, u8R"(<span class="apptype-badge" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype2),
          u8R"("></span>)"

          // Secondary URL line
          u8R"(<div class="app-url">)",
          app.url2,
          u8"</div>"

          // Secondary button
          u8R"(<a class="install-button" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype2), u8R"(" href=")",
          app.url2, u8R"(">Open</a>)");
  }

  //
  // Close actions + card
  //
  print(oref, u8"</div></div>");
}

inline constinit ::std::size_t found_count{};
inline constexpr void render_category(pwa_store::category_entry const &cat,
                                      ::std::uint_least32_t mask) noexcept {
  ::fast_io::u8ostring_ref_fast_io oref{__builtin_addressof(generated_dom)};

  print(oref, u8R"(<section class="category-block">)",
        u8R"(<h2 class="category-heading">)", cat.name_localized, u8"</h2>",
        u8R"(<div class="app-grid">)");

  for (std::size_t i{}; i != cat.app_entry_size; ++i) {
    auto const &app = cat.app_entry_data[i];
    if (app_matches_filter(app, mask)) {
      ++found_count;
      render_app_card(app);
    }
  }

  print(oref, u8"</div></section>");
}

inline void build_dom(::std::uint_least32_t mask) noexcept {
  generated_dom.clear();

  for (auto const &cat : pwa_store::categories) {
    render_category(cat, mask);
  }
}

} // anonymous namespace

// ------------------------------------------------------------
// WASM API
// ------------------------------------------------------------
extern "C" {

[[__gnu__::__visibility__("default")]]
void *resize_search_text(::std::size_t n) noexcept {
  search_text.resize(n);
  return search_text.data();
}

[[__gnu__::__visibility__("default")]]
void *generate_dom(bool empty_str, ::std::uint_least32_t mask) noexcept {
  if (empty_str || search_text.empty())
    search_text.clear();
  found_count = 0;
  build_dom(mask);
  return generated_dom.data();
}

[[__gnu__::__visibility__("default")]]
void *get_generated_dom_data() noexcept {
  return generated_dom.data();
}

[[__gnu__::__visibility__("default")]]
::std::size_t get_generated_dom_size() noexcept {
  return generated_dom.size();
}

[[__gnu__::__visibility__("default")]]
::std::size_t get_last_found_entries_count() noexcept {
  return found_count;
}
}
