import os
import shutil
import json
from pathlib import Path
import sys

# 🔧 Usage: python generate_wrappers.py <root_directory>
if len(sys.argv) != 2:
    print("Usage: python generate_wrappers.py <root_directory>")
    sys.exit(1)

ROOT = Path(sys.argv[1])
SHARED_DIR = ROOT / "wrappers_shared"
ICONS_DIR = ROOT / "icons" / "wrappers"
WRAPPER_OUTPUT = ROOT / "wrappers"

# 🌐 Wrapper definitions
WRAPPERS = [
    { "name": "CVS", "url": "https://www.cvs.com" },
    { "name": "Internet Archive", "url": "https://archive.org", "keyify_name": "archive" },
    { "name": "Bing", "url": "https://www.bing.com" },
    { "name": "CCTV", "url": "https://tv.cctv.com" },
    { "name": "cppreference", "url": "https://en.cppreference.com" },
]

# 🔠 Normalize name: lowercase and remove periods
def keyify(name):
    return name.lower().replace(".", "")

# 🧩 Templates
CONFIG_JS = """window.appConfig = {{
  title: "{title}",
  url: "{url}",
  cacheName: "pwa-{key}",
  localStorageKey: "{key}_installed"
}};
"""

INDEX_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="icons/icon.png" type="image/png">
  <script src="config.js"></script>
  <script src="sw-register.js"></script>
  <script src="install-check.js"></script>
</head>
<body>
  <h1>{title}</h1>
  <p id="status">Checking app status...</p>
  <button id="install">Install App</button>
</body>
</html>
"""

def encode(text):
    return text.encode("utf-8")

def build_manifest(name):
    manifest = {
        "name": name,
        "short_name": name,
        "start_url": ".",
        "background_color": "black",
        "theme_color": "black",
        "description": f"A Progressive Web APP Wrapper for {name}",
        "display": "standalone",
        "icons": [{
            "src": "icons/icon.png",
            "type": "image/png",
            "sizes": "512x512"
        }]
    }
    return json.dumps(manifest, indent=2).encode("utf-8")

# 🛠️ Wrapper generation loop
for wrapper in WRAPPERS:
    name = wrapper["name"]

    # Enforce keyify_name
    key = wrapper.get("keyify_name", keyify(name))
    wrapper["keyify_name"] = key  # Ensure it's available for icons and beyond

    url = wrapper["url"]
    icon_file = wrapper.get("icon", f"{key}.png")

    dest = WRAPPER_OUTPUT / key
    icons_dest = dest / "icons"
    icons_dest.mkdir(parents=True, exist_ok=True)

    # Copy shared wrapper files
    for item in SHARED_DIR.iterdir():
        target = dest / item.name
        if item.is_file():
            shutil.copy(item, target)
        elif item.is_dir():
            shutil.copytree(item, target, dirs_exist_ok=True)

    # Copy icon
    icon_src = ICONS_DIR / icon_file
    icon_dst = icons_dest / "icon.png"
    if icon_src.exists():
        shutil.copy(icon_src, icon_dst)
    else:
        print(f"⚠️ Warning: icon not found → {icon_file} for wrapper: {name}")

    # Generate config.js
    with open(dest / "config.js", "wb") as f:
        f.write(encode(CONFIG_JS.format(title=name, url=url, key=key)))

    # Generate index.html
    with open(dest / "index.html", "wb") as f:
        f.write(encode(INDEX_HTML.format(title=name)))

    # Generate manifest.json
    with open(dest / "manifest.json", "wb") as f:
        f.write(build_manifest(name))

    print(f"✅ Generated wrapper: {name} → {key} → icon: {icon_file}")
