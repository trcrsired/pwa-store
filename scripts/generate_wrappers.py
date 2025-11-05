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
  { "name": "Base64.Guru", "url": "https://base64.guru", "keyify_name": "base64guru" },
  { "name": "CVS", "url": "https://www.cvs.com" },
  { "name": "Whirlpool", "url": "https://www.whirlpool.com" },
  { "name": "Android Authority", "url": "https://www.androidauthority.com", "keyify_name": "androidauthority"},
  { "name": "armrepo.ver.lt", "url": "https://armrepo.ver.lt","keyify_name": "armrepoverlt", "icon": "msstore.webp" },
  { "name": "Internet Archive", "url": "https://archive.org", "keyify_name": "archive" },
  { "name": "APK Premier", "url": "https://apkpremier.com", "keyify_name": "apkpremier" },
  { "name": "BTSOW", "url": "https://btsow.lol" },
  { "name": "Level1Techs", "url": "https://level1techs.com" },
  { "name": "Gamers Nexus", "url": "https://gamersnexus.net" },
  { "name": "Beebom", "url": "https://beebom.com" },
  { "name": "Influencersplace", "url": "https://influencersplace.com" },
  { "name": "perplexity", "url": "https://www.perplexity.ai" },
  { "name": "G2 AI", "url": "https://ai.g2.com" },
  { "name": "Tencent Yuanbao", "url": "https://yuanbao.tencent.com/chat" },
  { "name": "豆包", "url": "https://www.doubao.com/chat", "keyify_name": "doubao" },
  { "name": "stack.watch", "url": "https://stack.watch", "keyify_name": "stackwatch" },
  { "name": "NIST Time", "url": "https://www.time.gov", "keyify_name": "timegov" },
  { "name": "Microsoft Account", "url": "https://account.microsoft.com", "icon": "microsoft.webp" },
  { "name": "Microsoft Partner", "url": "https://partner.microsoft.com", "icon": "microsoft.webp" },
  { "name": "MSN", "url": "https://www.msn.com" },
  { "name": "Bing", "url": "https://www.bing.com" },
  { "name": "Bing Videos", "url": "https://www.bing.com/videos", "icon": "bing.webp" },
  { "name": "Bing Maps", "url": "https://www.bing.com/maps", "icon": "bing.webp" },
  { "name": "Bing Images", "url": "https://www.bing.com/images", "icon": "bing.webp" },
  { "name": "Bing News", "url": "https://www.bing.com/news", "icon": "bing.webp" },
  { "name": "Bing Shop", "url": "https://www.bing.com/shop", "icon": "bing.webp" },
  { "name": "Bing Travel", "url": "https://www.bing.com/travel", "icon": "bing.webp" },
  { "name": "Bing Flights", "url": "https://www.bing.com/flights", "icon": "bing.webp" },
  { "name": "CCTV", "url": "https://tv.cctv.com" },
  { "name": "ifeng", "url": "https://www.ifeng.com" },
  { "name": "观察者网", "url": "https://www.guancha.cn", "keyify_name": "guanchazhe" },
  { "name": "乌有之乡", "url": "https://www.wyzxwk.com", "keyify_name": "wuyouzhixiang" },
  { "name": "红歌会", "url": "https://www.szhgh.com", "keyify_name": "honggehui" },
  { "name": "新语丝", "url": "https://xinyusi.org", "keyify_name": "xinyusi" },
  { "name": "조선일보", "url": "https://www.chosun.com", "keyify_name": "thechosundaily" },
  { "name": "cppreference", "url": "https://en.cppreference.com" },
  { "name": "Compiler Explorer", "url": "https://godbolt.org", "keyify_name": "godbolt" },
  { "name": "linux.die", "url": "https://linux.die.net" },
  { "name": "MMO Champion", "url": "https://www.mmo-champion.com", "keyify_name": "mmo-champion" },
  { "name": "Target", "url": "https://www.target.com" },
  { "name": "TED", "url": "https://www.ted.com" },
  { "name": "Zoosk", "url": "https://zoosk.com" },
  { "name": "eHarmony", "url": "https://www.eharmony.com" },
  { "name": "Tieba", "url": "https://tieba.baidu.com" },
  { "name": "Termux", "url": "https://termux.dev" },
  { "name": "Alibaba", "url": "https://www.alibaba.com" },
  { "name": "BigGo", "url": "https://biggo.com" },
  { "name": "Walmart", "url": "https://www.walmart.com" },
  { "name": "The Home Depot", "url": "https://www.homedepot.com", "keyify_name": "homedepot" },
  { "name": "WarcraftLogs", "url": "https://www.warcraftlogs.com" },
  { "name": "Raider.IO", "url": "https://raider.io", "keyify_name": "raiderio" },
  { "name": "MapleStory", "url": "https://www.nexon.com/maplestory" },
  { "name": "Doordash", "url": "https://www.doordash.com" },
  { "name": "Lyft", "url": "https://www.lyft.com" },
  { "name": "Delish", "url": "https://www.delish.com" },
  { "name": "USPS", "url": "https://www.usps.com"},
  { "name": "China EMS", "url": "https://www.ems.com.cn"},
  { "name": "UHS", "url": "https://www.uhs.com" },
  { "name": "Delta Dental", "url": "https://www.deltadental.com", "keyify_name": "deltadental" },
  { "name": "Women's Health", "url": "https://www.womenshealthmag.com", "keyify_name": "womenshealth" },
  { "name": "VSIGO(视客眼镜)", "url": "https://www.vsigo.cn", "keyify_name": "vsigo" },
  { "name": "KFC", "url": "https://www.kfc.com" },
  { "name": "Subway", "url": "https://www.subway.com" },
  { "name": "McDonald's", "url": "https://www.mcdonalds.com", "keyify_name": "mcdonalds" },
  { "name": "Apple Store", "url": "https://www.apple.com/store", "keyify_name": "applestore", "icon": "apple.webp" },
  { "name": "Apple Retail Store", "url": "https://www.apple.com/retail", "keyify_name": "appleretail", "icon": "apple.webp" },
  { "name": "Luckin Coffee", "url": "https://in.luckincoffee.com", "keyify_name": "luckin" },
  { "name": "Gmail", "url": "https://mail.google.com" },
  { "name": "Google Trends", "url": "https://trends.google.com" },
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
  { "name": "ID.me", "url": "https://id.me", "keyify_name": "idme" },

  { "name": "中国政府网", "url": "https://www.gov.cn", "keyify_name": "govcn" },
  { "name": "连云港住房公积金", "url": "https://12329.zfgjj.lyg.gov.cn", "keyify_name": "lygfund" },
  { "name": "Richard Dawkins Foundation", "url": "https://richarddawkins.net" },
  { "name": "Herb Sutter", "url": "https://herbsutter.com", "keyify_name": "herbsutter" },
  { "name": "Bjarne Stroustrup", "url": "https://www.stroustrup.com", "keyify_name": "bjarnestroustrup" },
  { "name": "GCC MCF", "url": "https://gcc-mcf.lhmouse.com", "keyify_name": "gccmcf", "icon": "lhmouse.webp" },
  { "name": "Webull", "url": "https://www.webull.com" },
  { "name": "Bank of America", "url": "https://www.bankofamerica.com" },
  { "name": "胡润百富", "url": "https://www.hurun.net", "keyify_name": "hurun" },
  { "name": "Free Software Foundations", "url": "https://www.fsf.org", "keyify_name": "fsf" },
  { "name": "RA2: Chrono Divide", "url": "https://game.chronodivide.com", "keyify_name": "chronodivide" },
  { "name": "Floppy Bird", "url": "https://nebezb.com/floppybird" },
  { "name": "Eaglercraft", "url": "https://eaglercraft.com" },
  { "name": "Mumu Emulator(模拟器)", "url": "https://mumu.163.com", "keyify_name": "mumu" },
  { "name": "MumuPlayer", "url": "https://www.mumuplayer.com", "keyify_name": "mumuplayer", "icon": "mumu.webp" },
  { "name": "UN", "url": "https://www.un.org" },
  { "name": "Marie Claire", "url": "https://www.marieclaire.com" },
  { "name": "悦颜社", "url": "https://yueyanshe.com", "keyify_name": "yueyanshe" },
  { "name": "Lightnovel Kingdom", "url": "https://www.lightnovel.fun/cn" },
  { "name": "BrowserBench", "url": "https://browserbench.org" },
  { "name": "ClearWebStats", "url": "https://www.clearwebstats.com" },
  { "name": "China Firewall Test", "url": "https://www.chinafirewalltest.com" },
  { "name": "NY Times", "url": "https://www.nytimes.com" , "keyify_name": "nytimes"},
  { "name": "Netflix", "url": "https://www.netflix.com" },
  { "name": "Pixiv", "url": "https://www.pixiv.net" },
  { "name": "DramaBox", "url": "https://www.dramaboxapp.com" },
  { "name": "LeetCode (CN)", "url": "https://leetcode.cn", "keyify_name": "leetcodecn", "icon": "leetcode.webp"},
  { "name": "ISO C++", "url": "https://isocpp.org" , "keyify_name": "isocpp"},
  { "name": "WeChat Read", "url": "https://weread.qq.com" , "keyify_name": "wechatread"},
  { "name": "Qingting FM", "url": "https://www.qtfm.cn" , "keyify_name": "qingtingfm"},
  { "name": "Ximalaya", "url": "https://www.ximalaya.com" },
  { "name": "NVIDIA", "url": "https://www.nvidia.com" },
  { "name": "阮一峰", "url": "https://www.ruanyifeng.com", "keyify_name": "ruanyifeng" },
  { "name": "Veritasium", "url": "https://www.veritasium.com" },
  { "name": "The Lunduke Journal", "url": "https://lunduke.com" },

  { "name": "MGTOW.TV", "url": "https://www.mgtow.tv" },
  { "name": "Better Bachelor", "url": "https://betterbachelor.locals.com" },
  { "name": "The33Secrets", "url": "https://www.the33secrets.com"},

  { "name": "CurseForge", "url": "https://www.curseforge.com" },
  { "name": "MineCraft Forum", "url": "https://www.minecraftforum.net", "keyify_name": "minecraftforum" },
  { "name": "IGN", "url": "https://www.ign.com" },
  { "name": "Wowhead", "url": "https://www.wowhead.com" },
  { "name": "NGA", "url": "https://bbs.nga.cn", "keyify_name": "ngacn" },
  { "name": "Paypal", "url": "https://www.paypal.com" },
  { "name": "Moomoo", "url": "https://www.moomoo.com" },
  { "name": "TheStreet", "url": "https://www.thestreet.com" },
  { "name": "MarketWatch", "url": "https://www.marketwatch.com" },
  { "name": "24/7 Wall St.", "url": "https://247wallst.com", "keyify_name": "247wallst" },
  { "name": "WebAssembly", "url": "https://webassembly.org" },
  { "name": "GeeksForGeeks", "url": "https://www.geeksforgeeks.org" },
  { "name": "Aurora Store", "url": "https://store.auroraoss.com", "keyify_name":"aurorastore" },
  { "name": "WeChat Devs", "url": "https://developers.weixin.qq.com", "keyify_name": "wechatdevelopers"},
  { "name": "DontKillMyApp", "url": "https://dontkillmyapp.com" },
  { "name": "Microsoft Clarity" , "url": "https://clarity.microsoft.com" },
  { "name": "WPS", "url": "https://www.wps.com/wpsdocs" },
  { "name": "WPS (CN)", "url": "https://www.kdocs.cn", "keyify_name":"wpscn", "icon":"wps.webp" },
  { "name": "DingTalk", "url": "https://workspace.dingtalk.com" },
  { "name": "QQ Mail", "url": "https://mail.qq.com", "keyify_name":"qqmail" },
  { "name": "163 Mail", "url": "https://mail.163.com", "keyify_name":"netease163" },
  { "name": "126 Mail", "url": "https://mail.126.com", "keyify_name":"netease126" },
  { "name": "yeah.net Mail", "url": "https://mail.yeah.net", "keyify_name":"yeahnet" },
  { "name": "Auction.com", "url": "https://www.auction.com", "keyify_name": "auctioncom" },
  { "name": "Airbnb", "url": "https://www.airbnb.com" },
  { "name": "Booking", "url": "https://www.booking.com" },
  { "name": "驾考宝典", "url": "https://www.jiakaobaodian.com", "keyify_name": "jiakaobaodian" },
  { "name": "Ticketmaster", "url": "https://www.ticketmaster.com" },
  { "name": "Ctrip", "url": "https://www.ctrip.com" },
  { "name": "Tao Piao Piao", "url": "https://www.taopiaopiao.com", "keyify_name":"taopiaopiao" },
  { "name": "CodeSignal", "url": "https://codesignal.com" },
  { "name": "Remote OK", "url": "https://remoteok.com", "keyify_name": "remoteok" },
  { "name": "Layoffs.fyi", "url": "https://layoffs.fyi", "keyify_name": "layoffsfyi"},
  { "name": "Eudic", "url": "https://dict.eudic.net" },
  { "name": "劝学", "url": "https://www.quanxue.cn", "keyify_name": "quanxue" },
  { "name": "Marxists Internet Archive", "url": "https://www.marxists.org", "keyify_name": "marxistsorg" },
  { "name": "OSDev.org" , "url": "https://wiki.osdev.org", "keyify_name": "osdevorg" },
  { "name": "Consumer Rights Wiki", "url": "https://consumerrights.wiki" },
  { "name": "Anime Wiki", "url": "https://anibase.net" },
  { "name": "Wikisource", "url": "https://en.wikisource.org" },
  { "name": "Wikiwand", "url": "https://www.wikiwand.com" },
  { "name": "REVCOM.US", "url": "https://revcom.us/en", "keyify_name": "revcomus" },
  { "name": "YouVersion Bible", "url": "https://bible.com", "keyify_name": "biblecom" },
  { "name": "Reuters", "url": "https://www.reuters.com" },
  { "name": "Washington Post", "url": "https://www.washingtonpost.com" },
  { "name": "CNN", "url": "https://www.cnn.com" },
  { "name": "Fox News", "url": "https://www.foxnews.com" },
  { "name": "USA Today", "url": "https://www.usatoday.com" },
  { "name": "Al Jazeera", "url": "https://www.aljazeera.com" },
  { "name": "Foreign Policy", "url": "https://foreignpolicy.com" },
  { "name": "The Telegraph", "url": "https://www.telegraph.co.uk" },
  { "name": "CGTN", "url": "https://www.cgtn.com" },
  { "name": "Fortune", "url": "https://fortune.com" },
  { "name": "Scientific American", "url": "https://www.scientificamerican.com" },
  { "name": "Popular Mechanics" , "url": "https://www.popularmechanics.com" },
  { "name": "Canva", "url": "https://www.canva.com"},
  { "name": "Sacramento Bee", "url": "https://www.sacbee.com"},
  { "name": "POLITICO", "url": "https://www.politico.com"},
  { "name": "The Daily Signal", "url": "https://www.dailysignal.com", "keyify_name": "dailysignal" },
  { "name": "FreightWaves", "url": "https://www.freightwaves.com" },
  { "name": "ADWEEK", "url": "https://www.adweek.com" },
  { "name": "HuffPost", "url": "https://www.huffpost.com" },
  { "name": "Miami Herald", "url": "https://www.miamiherald.com" },
  { "name": "Financial Times", "url": "https://www.ft.com" },
  { "name": "Delaware Online", "url": "https://www.delawareonline.com" },
  { "name": "Radio Television of Afghanistan", "url": "https://rta.af", "keyify_name": "rtaaf"},

  { "name" : "HotCRP", "url": "https://hotcrp.com" },
  { "name": "ACM", "url": "https://www.acm.org" },

  { "name" : "Binghamton Univeristy", "url": "https://www.binghamton.edu", "keyify_name": "binghamton_edu"},
  { "name" : "Fudan University", "url": "https://www.fudan.edu.cn", "keyify_name": "fudan" },

  { "name" : "Yande", "url": "https://yande.re" },
  { "name" : "MissAV TV", "url": "https://missavtv.com/en" },
  { "name" : "JavHDPorn", "url": "https://www4.javhdporn.net" },
  { "name" : "Supjav", "url": "https://supjav.com" },
  { "name" : "avdanyuwiki", "url": "https://avdanyuwiki.com" },
]


# 🔠 Normalize name: lowercase and remove periods
def keyify(name):
    return name.lower().replace(".", "").replace(" ", "")

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
