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
ICONS_DIR = ROOT / "docs" / "store" / "icons" / "wrappers"
WRAPPER_OUTPUT = ROOT / "docs" / "wrappers"

WRAPPERS = [
  { "name": "CVS", "url": "https://www.cvs.com" },
  { "name": "Internet Archive", "url": "https://archive.org", "keyify_name": "archive" },
  { "name": "Bing", "url": "https://www.bing.com" },
  { "name": "MSN", "url": "https://www.msn.com" },
  { "name": "CCTV", "url": "https://tv.cctv.com" },
  { "name": "ifeng", "url": "https://www.ifeng.com" },
  { "name": "cppreference", "url": "https://en.cppreference.com" },
  { "name": "Compiler Explorer", "url": "https://godbolt.org", "keyify_name": "godbolt" },
  { "name": "linux.die", "url": "https://en.cppreference.com" },
  { "name": "MMO Champion", "url": "https://www.mmo-champion.com", "keyify_name": "mmo-champion" },
  { "name": "Target", "url": "https://www.target.com" },
  { "name": "TED", "url": "https://www.ted.com" },
  { "name": "Tieba", "url": "https://tieba.baidu.com" },
  { "name": "v86", "url": "https://copy.sh/v86" },
  { "name": "Walmart", "url": "https://www.walmart.com" },
  { "name": "WarcraftLogs", "url": "https://www.warcraftlogs.com" },
  { "name": "Raider.IO", "url": "https://raider.io", "keyify_name": "raiderio" },
  { "name": "MapleStory", "url": "https://www.nexon.com/maplestory" },
  { "name": "Doordash", "url": "https://www.doordash.com" },
  { "name": "Lyft", "url": "https://www.lyft.com" },
  { "name": "USPS", "url": "https://www.usps.com"},
  { "name": "UHS", "url": "https://www.uhs.com" },
  { "name": "Delta Dental", "url": "https://www.deltadental.com", "keyify_name": "deltadental" },
  { "name": "KFC", "url": "https://www.kfc.com" },
  { "name": "Subway", "url": "https://www.subway.com" },
  { "name": "McDonald's", "url": "https://www.mcdonalds.com", "keyify_name": "mcdonalds" },
  { "name": "Gmail", "url": "https://mail.google.com" },

  { "name": "IRS", "url": "https://www.irs.gov" },
  { "name": "USCIS", "url": "https://www.uscis.gov" },
  { "name": "SSA", "url": "https://www.ssa.gov" },
  { "name": "TSA", "url": "https://www.tsa.gov" },
  { "name": "DOS", "url": "https://www.state.gov" },
  { "name": "USA.gov", "url": "https://www.usa.gov" },
  { "name": "IdentityTheft", "url": "https://www.identitytheft.gov" },
  { "name": "FTC", "url": "https://www.ftc.gov" },
  { "name": "FDA", "url": "https://www.fda.gov" },
  { "name": "FED", "url": "https://www.federalreserve.gov" },
  { "name": "DOL", "url": "https://www.dol.gov" },
  { "name": "DOD", "url": "https://www.defense.gov" },
  { "name": "GSA", "url": "https://www.gsa.gov" },
  { "name": "DHS", "url": "https://www.dhs.gov" },
  { "name": "DEA", "url": "https://www.dea.gov" },
  { "name": "EEOC", "url": "https://www.eeoc.gov" },
  { "name": "NSA", "url": "https://www.nsa.gov" },
  { "name": "DOJ", "url": "https://www.justice.gov" },
  { "name": "OMB", "url": "https://www.whitehouse.gov/omb" },
  { "name": "NASA", "url": "https://www.nasa.gov" },
  { "name": "White House", "url": "https://www.whitehouse.gov", "keyify_name": "whitehouse" },

  { "name": "Herb Sutter", "url": "https://herbsutter.com", "keyify_name": "herbsutter" },
  { "name": "GCC MCF", "url": "https://gcc-mcf.lhmouse.com", "keyify_name": "gccmcf", "icon": "lhmouse.webp" },
  { "name": "Bank of America", "url": "https://www.bankofamerica.com", "keyify_name": "bankofamerica" },
  { "name": "Free Software Foundations", "url": "https://www.fsf.org", "keyify_name": "fsf" },
  { "name": "Mumu Emulator(模拟器)", "url": "https://mumu.163.com", "keyify_name": "mumu" },
  { "name": "MumuPlayer", "url": "https://www.mumuplayer.com", "keyify_name": "mumuplayer", "icon": "mumu.webp" },
  { "name": "UN", "url": "https://www.un.org" },
  { "name": "Lightnovel Kingdom", "url": "https://www.lightnovel.fun/cn", "keyify_name": "lightnovelkingdom" },
  { "name": "BrowserBench", "url": "https://browserbench.org" },
  { "name": "NY Times", "url": "https://www.nytimes.com" , "keyify_name": "nytimes"},
  { "name": "Netflix", "url": "https://www.netflix.com" },
  { "name": "ISO C++", "url": "https://isocpp.org" , "keyify_name": "isocpp"},
  { "name": "WeChat Read", "url": "https://weread.qq.com" , "keyify_name": "wechatread"},
  { "name": "NVIDIA", "url": "https://www.nvidia.com" },
  { "name": "CurseForge", "url": "https://www.curseforge.com" },
  { "name": "MineCraft Forum", "url": "https://www.minecraftforum.net", "keyify_name": "minecraftforum" },
  { "name": "Paypal", "url": "https://www.paypal.com" },
  { "name": "GeeksForGeeks", "url": "https://www.geeksforgeeks.org" },
  { "name": "WPS", "url": "https://www.wps.com/wpsdocs" },
  { "name": "WPS (CN)", "url": "https://www.kdocs.cn", "keyify_name":"wpscn", "icon":"wps.webp" },
  { "name": "QQ Mail", "url": "https://mail.qq.com", "keyify_name":"qqmail" },
  { "name": "163 Mail", "url": "https://mail.163.com", "keyify_name":"netease163" },
  { "name": "126 Mail", "url": "https://mail.126.com", "keyify_name":"netease126" },
  { "name": "yeah.net Mail", "url": "https://mail.yeah.net", "keyify_name":"yeahnet" },
  { "name": "Tao Piao Piao", "url": "https://www.taopiaopiao.com", "keyify_name":"taopiaopiao" },

  { "name": "Marxists Internet Archive", "url": "https://www.marxists.org", "keyify_name": "marxistsorg" },
  { "name": "REVCOM.US", "url": "https://revcom.us/en", "keyify_name": "revcomus" },
  { "name": "YouVersion Bible", "url": "https://bible.com", "keyify_name": "biblecom" },
  { "name": "Al Jazeera", "url": "https://www.aljazeera.com", "keyify_name": "aljazeera" },
  { "name": "CGTN", "url": "https://www.cgtn.com" },

  { "name" : "HotCRP", "url": "https://hotcrp.com" },

  { "name" : "Binghamton Univeristy", "url": "https://www.binghamton.edu", "keyify_name": "binghamton_edu"},
  { "name" : "Fudan University", "url": "https://www.fudan.edu.cn", "keyify_name": "fudan" },
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
  <link rel="icon" href="icons/icon.webp" type="image/webp">
  <script src="config.js"></script>
  <script src="sw-register.js"></script>
  <script src="install-check.js"></script>
</head>
<body>
  <h1>{title}</h1>
  <p id="status">Checking app status...</p>
  <button id="install">Install App</button>
    <div>
        URL of this website (you may need to copy it manually into your browser if the browser interface doesn’t allow you to open it directly): 
        <a href="#" id="self-link" target="_blank" rel="noopener"></a>
    </div>
    <div>
        Jump to: 
        <a href="#" id="jump-link" target="_blank" rel="noopener"></a>
    </div>
  <script src="detectssa.js"></script>
</body>
</html>
"""

def encode(text):
    return text.encode("utf-8")

def build_manifest(name, key):
    manifest = {
        "name": name,
        "short_name": name,
        "start_url": f"/wrappers/{key}/?source=pwa",
        "scope": f"/wrappers/{key}/",
        "background_color": "black",
        "theme_color": "black",
        "description": f"PWA Wrapper for {name}",
        "display": "standalone",
        "icons": [{
            "src": f"/wrappers/{key}/icons/icon.webp",
            "type": "image/webp",
            "sizes": "512x512"
        }]
    }
    return json.dumps(manifest, indent=2).encode("utf-8")

# 🚮 Clean existing wrappers
if WRAPPER_OUTPUT.exists():
    shutil.rmtree(WRAPPER_OUTPUT)

# 🛠️ Wrapper generation loop
for wrapper in WRAPPERS:
    name = wrapper["name"]

    # Enforce keyify_name
    key = wrapper.get("keyify_name", keyify(name))
    wrapper["keyify_name"] = key  # Ensure it's available for icons and beyond

    url = wrapper["url"]
    icon_file = wrapper.get("icon", f"{key}.webp")

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
    icon_dst = icons_dest / "icon.webp"
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
        f.write(build_manifest(name, key))

    print(f"✅ Generated wrapper: {name} → {key} → icon: {icon_file}")
