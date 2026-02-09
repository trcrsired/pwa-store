#pragma once
#include<cstdint>
#include<cstddef>

namespace pwa_store
{
enum class app_type:
    ::std::uint_least8_t
{
none,
pwa,
wrapper,
msedge,
wechat,
wechatmini,
native,
};

struct strlit
{
char8_t const* ptr{};
::std::size_t len{};
};

struct app_entry
{
::pwa_store::strlit name;
::pwa_store::strlit name_localized;
::pwa_store::strlit description_localized;
::pwa_store::strlit icon;
pwa_store::app_type apptype1;
pwa_store::app_type apptype2;
::pwa_store::strlit url1;
::pwa_store::strlit url2;
};

enum class category_type:
    ::std::uint_least8_t
{
none,
nsfw
};

struct category_entry
{
::pwa_store::category_type categorytype;
::pwa_store::strlit name;
::pwa_store::strlit name_localized;
::pwa_store::app_entry const *app_entry_data;
::std::size_t app_entry_size;
::pwa_store::category_entry const *children_categories_data;
::std::size_t children_categories_size;
};

}
