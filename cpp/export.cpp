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

inline constexpr bool contains_ci(::fast_io::u8string_view haystack_lower,
                                  ::fast_io::u8string_view needle_lower) {
  if (needle_lower.is_empty())
    return true;

  return std::search(haystack_lower.begin(), haystack_lower.end(),
                     needle_lower.begin(),
                     needle_lower.end()) != haystack_lower.end();
}

inline constexpr bool field_matches(::pwa_store::strlit s) noexcept {
  if (empty_strlit(s))
    return false;

  temp_buffer.clear();
  temp_buffer.append(s.ptr, s.ptr + s.len);
  to_lower_inplace(temp_buffer);

  return contains_ci(
      ::fast_io::u8string_view(temp_buffer.data(), temp_buffer.size()),
      ::fast_io::u8string_view(search_text.data(), search_text.size()));
}

inline constexpr bool type_allowed(::pwa_store::app_type t,
                                   ::std::uint_least32_t mask) noexcept {
  switch (t) {
  case ::pwa_store::app_type::pwa:
  case ::pwa_store::app_type::wrapper:
  case ::pwa_store::app_type::msedge:
    return (mask & 2u) != 0u;

  case ::pwa_store::app_type::wechat:
  case ::pwa_store::app_type::wechatmini:
    return (mask & 4u) != 0u;

  case ::pwa_store::app_type::native:
    return (mask & 8u) != 0u;

  default:
    return false;
  }
}

inline constexpr bool app_matches_filter(::pwa_store::app_entry const &app,
                                         ::std::uint_least32_t mask) noexcept {
  if (!type_allowed(app.apptype1, mask) && !type_allowed(app.apptype2, mask)) {
    return false;
  }

  if ((mask & 1u) != 0u) {
    return true;
  }

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
// Button label helpers
// ------------------------------------------------------------

inline constexpr bool can_install(::pwa_store::app_type t) noexcept {
  return t == ::pwa_store::app_type::pwa ||
         t == ::pwa_store::app_type::wrapper ||
         t == ::pwa_store::app_type::msedge;
}

inline constexpr ::pwa_store::strlit
install_label(::pwa_store::app_type t) noexcept {
  using namespace ::pwa_store::ui_strings;

  if (t == ::pwa_store::app_type::wrapper || t == ::pwa_store::app_type::msedge)
    return install_wrapper_desc;

  return install_desc;
}

inline constexpr ::pwa_store::strlit
open_label(::pwa_store::app_type t) noexcept {
  using namespace ::pwa_store::ui_strings;

  if (t == ::pwa_store::app_type::wrapper || t == ::pwa_store::app_type::msedge)
    return open_wrapper_desc;

  return open_desc;
}

inline constexpr ::pwa_store::strlit
primary_action_label(::pwa_store::app_type t) noexcept {
  using namespace ::pwa_store::ui_strings;

  if (t == ::pwa_store::app_type::wechatmini)
    return copyurl_desc;

  return open_label(t);
}

// ------------------------------------------------------------
// DOM rendering
// ------------------------------------------------------------

inline constexpr void render_app_card(::pwa_store::app_entry const &app,
                                      ::std::uint_least32_t mask) noexcept {
  ::fast_io::u8ostring_ref_fast_io oref{__builtin_addressof(generated_dom)};

  bool const install_available = (mask & 16u) != 0u;

  print(oref, u8R"(<div class="app-card" data-apptype=")",
        static_cast<::std::uint_least8_t>(app.apptype1));

  if (app.apptype2 != ::pwa_store::app_type::none) {
    print(oref, u8R"(" data-apptype2=")",
          static_cast<::std::uint_least8_t>(app.apptype2));
  }

  print(oref,
        u8R"(">)"
        u8R"(<img src=")",
        app.icon, u8R"(" alt=")", app.name_localized,
        u8R"(" class="app-icon" loading="lazy" decoding="async" />)"
        u8R"(<div class="app-name">)",
        app.name_localized,
        u8R"(</div>)"
        u8R"(<div class="app-description">)",
        app.description_localized, u8R"(</div>)");

  if (app.apptype1 != ::pwa_store::app_type::pwa) {
    print(oref, u8R"(<span class="apptype-badge" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype1), u8R"("></span>)");
  }

  if (!empty_strlit(app.url1)) {
    print(oref, u8R"(<div class="app-url">)", app.url1, u8R"(</div>)");
  }

  print(oref, u8R"(<div class="card-actions">)");

  if (!empty_strlit(app.url1)) {
    bool const allow_install1 = install_available && can_install(app.apptype1);

    if (allow_install1) {
      print(oref, u8R"(<a class="install-button" data-apptype=")",
            static_cast<::std::uint_least8_t>(app.apptype1), u8R"(" href=")",
            app.url1, u8R"(">)", install_label(app.apptype1), u8R"(</a>)");
    }

    print(oref, u8R"(<a class="install-button" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype1), u8R"(" href=")",
          app.url1, u8R"(">)",
          allow_install1 ? open_label(app.apptype1)
                         : primary_action_label(app.apptype1),
          u8R"(</a>)");
  }

  if (app.apptype2 != ::pwa_store::app_type::none && !empty_strlit(app.url2)) {
    bool const allow_install2 = install_available && can_install(app.apptype2);

    print(oref, u8R"(<span class="apptype-badge" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype2),
          u8R"("></span>)"
          u8R"(<div class="app-url">)",
          app.url2, u8R"(</div>)");

    if (allow_install2) {
      print(oref, u8R"(<a class="install-button" data-apptype=")",
            static_cast<::std::uint_least8_t>(app.apptype2), u8R"(" href=")",
            app.url2, u8R"(">)", install_label(app.apptype2), u8R"(</a>)");
    }

    print(oref, u8R"(<a class="install-button" data-apptype=")",
          static_cast<::std::uint_least8_t>(app.apptype2), u8R"(" href=")",
          app.url2, u8R"(">)",
          allow_install2 ? open_label(app.apptype2)
                         : primary_action_label(app.apptype2),
          u8R"(</a>)");
  }

  print(oref, u8R"(</div></div>)");
}

inline constinit ::std::size_t found_count{};

inline constexpr void render_category(::pwa_store::category_entry const &cat,
                                      ::std::uint_least32_t mask) noexcept {
  ::fast_io::u8ostring_ref_fast_io oref{__builtin_addressof(generated_dom)};

  std::size_t before_apps = generated_dom.size();
  print(oref,
        u8R"(<section class="category-block">)"
        u8R"(<h2 class="category-heading">)",
        cat.name_localized,
        u8"</h2>"
        u8R"(<div class="app-grid">)");

  std::size_t local_count{};
  for (std::size_t i{}; i != cat.app_entry_size; ++i) {
    auto const &app = cat.app_entry_data[i];
    if (app_matches_filter(app, mask)) {
      ++local_count;
      render_app_card(app, mask);
    }
  }
  found_count+=local_count;
  if (local_count == 0)
  {
    generated_dom.erase_index(before_apps, generated_dom.size());
    return;
  }
  print(oref, u8"</div></section>");
}

inline void build_dom(::std::uint_least32_t mask) noexcept {
  generated_dom.clear();

  for (auto const &cat : ::pwa_store::categories) {
    render_category(cat, mask);
  }
}

} // anonymous namespace

extern "C" {

[[__gnu__::__visibility__("default")]]
void *resize_search_text(::std::size_t n) noexcept {
  search_text.resize(n);
  return search_text.data();
}

[[__gnu__::__visibility__("default")]]
void *generate_dom(::std::uint_least32_t mask) noexcept {
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
