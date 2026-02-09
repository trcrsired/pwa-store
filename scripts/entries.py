import json5
import re
from pathlib import Path
import sys

# ------------------------------------------------------------
# Helpers
# ------------------------------------------------------------

def load_js_table(path: Path):
    text = path.read_text(encoding="utf8")
    text = re.sub(r"export\s+const\s+\w+\s*=\s*", "", text).strip()
    if text.endswith(";"):
        text = text[:-1]
    return json5.loads(text)

def esc(s: str):
    return s.replace("\\", "\\\\").replace("\"", "\\\"")

def lit(s: str):
    if not s:
        return "{}"
    return f'U8("{esc(s)}")'

def ident(prefix, key, fallback):
    base = (key or fallback or "unnamed").lower()
    base = re.sub(r"[^a-z0-9]+", "_", base).strip("_")
    return f"{prefix}_{base}"

def map_app_type(s):
    return {
        "pwa": "app_type::pwa",
        "wrapper": "app_type::wrapper",
        "msedge": "app_type::msedge",
        "wechat": "app_type::wechat",
        "wechatmini": "app_type::wechatmini",
        "native": "app_type::native",
    }.get(s, "app_type::none")

# ------------------------------------------------------------
# C++ generator for one locale
# ------------------------------------------------------------

def generate_cpp_for_locale(locale_name, categories, L_main, L_fallback):
    out = []

    out.append("module;\n")
    out.append('#include"pwa_store.hpp"\n')
    out.append("export module pwa_store;\n")
    out.append('#include"common.hpp"\n')
    out.append("export namespace pwa_store{")

    # --------------------------------------------------------
    # Emit app arrays
    # --------------------------------------------------------
    for cat in categories:
        arr = ident(f"category_{locale_name}", cat.get("nameKey"), cat.get("name"))
        out.append(f"inline constexpr app_entry {arr}[]={{")

        # Parent category logic
        if cat.get("isparent"):
            apps = []
            for child in cat.get("children", []):
                apps.extend(child.get("apps", []))
        else:
            apps = cat.get("apps", [])

        for app in apps:
            if app.get("hide"):
                continue

            name = app.get("name", "")
            nameLoc = L_main.get(app.get("nameKey"), L_fallback.get(app.get("nameKey"), ""))
            descLoc = L_main.get(app.get("descriptionKey"), L_fallback.get(app.get("descriptionKey"), ""))
            icon = app.get("icon", "")
            url1 = app.get("url", "")
            url2 = app.get("url2", "")

            # Default apptype
            t1 = map_app_type(app.get("apptype", "pwa"))

            # Validate apptype2
            if url2 and not app.get("apptype2"):
                raise ValueError(f"Error in app '{name}': url2 exists but apptype2 is missing")

            t2 = map_app_type(app.get("apptype2"))

            out.append(
                f"{{{lit(name)},{lit(nameLoc)},{lit(descLoc)},{lit(icon)},{t1},{t2},{lit(url1)},{lit(url2)}}},"
            )

        out.append("};")

    # --------------------------------------------------------
    # Emit category array
    # --------------------------------------------------------
    out.append("inline constexpr category_entry categories[]={")

    for cat in categories:
        arr = ident(f"category_{locale_name}", cat.get("nameKey"), cat.get("name"))
        nameLoc = L_main.get(cat.get("nameKey"), L_fallback.get(cat.get("nameKey"), cat.get("name", "")))
        nameKey = cat.get("nameKey", "")

        out.append(
            f"{{category_type::none,{lit(nameLoc)},{lit(nameKey)},{arr},sizeof({arr})/sizeof({arr}[0]),nullptr,0}},"
        )

    out.append("};")
    out.append("}")  # end namespace

    return "".join(out)

# ------------------------------------------------------------
# Entry point
# ------------------------------------------------------------

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 entries.py <root_path>")
        sys.exit(1)

    root = Path(sys.argv[1]).resolve()

    categories = load_js_table(root / "scripts" / "data" / "categories.js")
    L_fallback = load_js_table(root / "scripts" / "data" / "lang" / "enus.js")

    outdir = root / "cpp"
    outdir.mkdir(parents=True, exist_ok=True)

    for lang_file in (root / "scripts" / "data" / "lang").glob("*.js"):
        lang_name = lang_file.stem
        L_main = load_js_table(lang_file)

        cpp_code = generate_cpp_for_locale(lang_name, categories, L_main, L_fallback)

        (outdir / f"{lang_name}.cppm").write_text(cpp_code, encoding="utf8")
        print(f"Generated {lang_name}.cppm")
