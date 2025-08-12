export const categories = [
  {
    nameKey: "fundamental_name",
    name: "Fundamental",
    apps: [
      { name: "SnaePlayer", icon: "icons/snaeplayer.webp", url: "https://snaeplayer.com", descriptionKey: "snaeplayer_desc" },
      { name: "Flow", icon: "icons/flow.webp", url: "https://www.flowoss.com", descriptionKey: "flow_desc" },
      { name: "TReader", icon: "icons/treader.webp", url: "https://tiansh.github.io/reader", descriptionKey: "treader_desc" },
      { name: "WebVideoPlayer", icon: "icons/webvideoplayer.webp", url: "https://webvideoplayer.org", descriptionKey: "webvideoplayer_desc" },
      { nameKey: "pwaplayer_name", name: "PWA Player (My own toy)", icon: "icons/pwaplayer.webp", url: "https://pwa-player.pages.dev", descriptionKey: "pwaplayer_desc" },
      { name: "Calculator", icon: "icons/calculator.webp", url: "https://chrisdiana.github.io/pwa-calculator", descriptionKey: "calculator_desc" },
      { name: "Weawow", icon: "icons/weawow.webp", url: "https://weawow.com", descriptionKey: "weawow_desc" },
      { name: "Screen Flashlight", icon: "icons/screenflashlightweb.webp", url: "https://trcrsired.github.io/ScreenFlashlightWeb", descriptionKey: "screenflashlight_desc" },
      { name: "PWA Store", nameKey: "pwastore_name", icon: "logo/logo.webp", url: ".", descriptionKey: "pwastore_desc" },
    ]
  },
  {
    nameKey: "chabots_name",
    name: "Chatbots",
    apps: [
      { name: "Microsoft Copilot", icon: "icons/copilot.webp", url: "https://copilot.microsoft.com", descriptionKey: "copilot_desc" },
      { name: "DeepSeek", icon: "icons/deepseek.webp", url: "https://deepseek.com", descriptionKey: "deepseek_desc" },
      { name: "ChatGPT", icon: "icons/chatgpt.webp", url: "https://chat.openai.com", descriptionKey: "chatgpt_desc" },
      { name: "Google Gemini", icon: "icons/gemini.webp", url: "https://gemini.google.com", descriptionKey: "gemini_desc" },
      { name: "Qwen", icon: "icons/qwen.webp", url: "https://chat.qwen.ai", descriptionKey: "qwen_desc" },
      { name: "Grok", icon: "icons/grok.webp", url: "https://grok.com", descriptionKey: "grok_desc"},
    ]
  },
  {
    nameKey: "microsoft_services_name",
    name: "Microsoft Services",
    apps: [
      { name: "Outlook", icon: "icons/outlook.webp", url: "https://outlook.live.com", descriptionKey: "outlook_desc" },
      { name: "OneDrive", icon: "icons/onedrive.webp", url: "https://onedrive.live.com", descriptionKey: "onedrive_desc" },
      { name: "Microsoft Store", nameKey: "msstore_name", icon: "icons/msstore.webp", url: "https://apps.microsoft.com", descriptionKey: "msstore_desc" },
      { name: "Microsoft Tech Community", nameKey: "mstechcommunity_name", icon: "icons/msft.webp", url: "https://techcommunity.microsoft.com", descriptionKey: "mstechcommunity_desc" },
      { name: "Bing", nameKey: "bing_name", icon: "icons/wrappers/bing.webp", url: "/wrappers/bing", descriptionKey: "bing_desc", wrapper: true },
      { name: "MSN", nameKey: "msn_name", icon: "icons/wrappers/msn.webp", url: "/wrappers/msn", descriptionKey: "msn_desc", wrapper: true },
    ]
  },
  {
    nameKey: "google_services_name",
    apps: [
      { name: "Google", icon: "icons/google.webp", url: "https://www.google.com", descriptionKey: "google_desc" },
      { nameKey: "googlevoice_name", name: "Google Voice", icon: "icons/googlevoice.webp", url: "https://voice.google.com", descriptionKey: "googlevoice_desc" },
      { nameKey: "googlemaps_name", name: "Google Maps", icon: "icons/googlemaps.webp", url: "https://maps.google.com", descriptionKey: "googlemaps_desc" },
      { nameKey: "googlenews_name", name: "Google News", icon: "icons/googlenews.webp", url: "https://news.google.com", descriptionKey: "googlenews_desc" },
      { name: "Gmail", icon: "icons/wrappers/gmail.webp", url: "/wrappers/gmail", descriptionKey: "gmail_desc", wrapper: true },
    ]
  },
  {
    nameKey: "officesuites_name",
    name: "Office Suites",
    apps: [
      {
        name: "WPS",
        descriptionKey: "wps_desc",
        icon: "icons/wrappers/wps.webp",
        url: "/wrappers/wps",
        descriptionKey: "wps_desc",
        wrapper: true
      },
      {
        name: "WPS (CN)",
        nameKey: "wpscn_name",
        descriptionKey: "wpscn_desc",
        icon: "icons/wrappers/wps.webp",
        url: "/wrappers/wpscn",
        wrapper: true
      }
    ]
  },
  {
    nameKey: "programming_name",
    name: "Programming",
    apps: [
      {
        name: "Open Web Advocacy",
        nameKey: "open_web_advocacy_name",
        icon: "icons/open-web-advocacy.webp",
        url: "https://open-web-advocacy.org",
        descriptionKey: "open_web_advocacy_desc"
      },
      {
        name: "GitHub",
        icon: "icons/github.webp",
        url: "https://github.com",
        descriptionKey: "github_desc"
      },
      {
        name: "Visual Studio Code",
        nameKey: "vscode_name",
        icon: "icons/vscode.webp",
        url: "https://vscode.dev",
        descriptionKey: "vscode_desc"
      },
      {
        name: "VS Code Insider",
        nameKey: "vscode_insider_name",
        icon: "icons/vscode-insiders.webp",
        url: "https://insiders.vscode.dev",
        descriptionKey: "vscode_insider_desc"
      },
      {
        name: "v2ray",
        icon: "icons/v2ray.webp",
        url: "https://www.v2ray.com",
        descriptionKey: "v2ray_desc"
      },
      {
        name: "GitLab",
        icon: "icons/gitlab.webp",
        url: "https://gitlab.com",
        descriptionKey: "gitlab_desc"
      },
      {
        name: "Gitee",
        icon: "icons/gitee.webp",
        url: "https://gitee.com",
        descriptionKey: "gitee_desc"
      },
      {
        name: "Stack Overflow",
        nameKey: "stackoverflow_name",
        icon: "icons/stackoverflow.webp",
        url: "https://stackoverflow.com",
        descriptionKey: "stackoverflow_desc"
      },
      {
        name: "MDN Web Docs",
        nameKey: "mdn_name",
        icon: "icons/mdnwebdocs.webp",
        url: "https://developer.mozilla.org",
        descriptionKey: "mdn_desc"
      },
      {
        name: "Chrome for developers",
        nameKey: "chrome_dev_name",
        icon: "icons/chrome.webp",
        url: "https://developer.chrome.com",
        descriptionKey: "chrome_dev_desc"
      },
      {
        name: "web.dev",
        icon: "icons/webdev.webp",
        url: "https://web.dev",
        descriptionKey: "webdev_desc"
      },
      {
        name: "Bing Webmaster Tools",
        nameKey: "bing_webmaster_name",
        icon: "icons/wrappers/bing.webp",
        url: "https://www.bing.com/webmasters",
        descriptionKey: "bing_webmaster_desc"
      },
      {
        name: "PWA Builder",
        nameKey: "pwabuilder_name",
        icon: "icons/pwabuilder.webp",
        url: "https://www.pwabuilder.com",
        descriptionKey: "pwabuilder_desc"
      },
      {
        name: "Resilient Web Design",
        nameKey: "resilientwebdesign_name",
        icon: "icons/resilientwebdesign.webp",
        url: "https://resilientwebdesign.com",
        descriptionKey: "resilientwebdesign_desc"
      },
      {
        name: "Python",
        icon: "icons/python.webp",
        url: "https://www.python.org",
        descriptionKey: "python_desc"
      },
      {
        name: "Rust",
        icon: "icons/rustlang.webp",
        url: "https://www.rust-lang.org",
        descriptionKey: "rust_desc"
      },
      {
        name: "ISO C++",
        nameKey: "isocpp_name",
        icon: "icons/wrappers/isocpp.webp",
        url: "/wrappers/isocpp",
        descriptionKey: "isocpp_desc",
        wrapper: true
      },
      {
        name: "Linux.die",
        nameKey: "linuxdie_name",
        icon: "icons/wrappers/linuxdie.webp",
        url: "/wrappers/linuxdie",
        descriptionKey: "linuxdie_desc",
        wrapper: true
      },
      {
        name: "Godbolt",
        icon: "icons/wrappers/godbolt.webp",
        url: "/wrappers/godbolt",
        descriptionKey: "godbolt_desc",
        wrapper: true
      },
      {
        name: "v86",
        icon: "icons/wrappers/v86.webp",
        url: "/wrappers/v86",
        descriptionKey: "v86_desc",
        wrapper: true
      },
      {
        name: "Free Software Foundations",
        nameKey: "fsf_name",
        icon: "icons/wrappers/fsf.webp",
        url: "/wrappers/fsf",
        descriptionKey: "fsf_desc",
        wrapper: true
      },
      {
        name: "GCC MCF",
        nameKey: "gccmcf_name",
        icon: "icons/wrappers/lhmouse.webp",
        url: "/wrappers/gccmcf",
        descriptionKey: "gccmcf_desc",
        wrapper: true
      },
      {
        name: "GeeksForGeeks",
        icon: "icons/wrappers/geeksforgeeks.webp",
        url: "/wrappers/geeksforgeeks",
        descriptionKey: "geeksforgeeks_desc",
        wrapper: true
      }
    ]
  },
  {
    name: "Internet Services",
    nameKey: "internetservices_name",
    apps: [
      {
        name: "Cloudflare",
        icon: "icons/cloudflare.webp",
        url: "https://dash.cloudflare.com",
        descriptionKey: "cloudflare_desc",
      }
    ]
  },
  {
    name: "Mail",
    nameKey: "mail_name",
    apps: [
      {
        name: "QQ Mail",
        nameKey: "qqmail_name",
        icon: "icons/wrappers/qqmail.webp",
        url: "/wrappers/qqmail",
        wrapper: true,
        descriptionKey: "qqmail_desc"
      },
      {
        name: "163 Mail",
        nameKey: "netease163_name",
        icon: "icons/wrappers/netease163.webp",
        url: "/wrappers/netease163",
        wrapper: true,
        descriptionKey: "netease163_desc"
      },
      {
        name: "126 Mail",
        nameKey: "netease126_name",
        icon: "icons/wrappers/netease126.webp",
        url: "/wrappers/netease126",
        wrapper: true,
        descriptionKey: "netease126_desc"
      },
      {
        name: "yeah.net Mail",
        nameKey: "yeahnet_name",
        icon: "icons/wrappers/yeahnet.webp",
        url: "/wrappers/yeahnet",
        wrapper: true,
        descriptionKey: "yeahnet_desc"
      }
    ]
  },
  {
    name: "Social Media",
    nameKey: "socialmedia_name",
    apps: [
      {
        name: "YouTube",
        nameKey: "youtube_name",
        icon: "icons/youtube.webp",
        url: "https://youtube.com",
        descriptionKey: "youtube_desc"
      },
      {
        name: "Reddit",
        icon: "icons/reddit.webp",
        url: "https://reddit.com",
        descriptionKey: "reddit_desc"
      },
      {
        name: "X (Twitter)",
        nameKey: "x_name",
        icon: "icons/x.webp",
        url: "https://x.com",
        descriptionKey: "x_desc"
      },
      {
        name: "Instagram",
        icon: "icons/instagram.webp",
        url: "https://instagram.com",
        descriptionKey: "instagram_desc"
      },
      {
        name: "Facebook",
        nameKey: "facebook_name",
        icon: "icons/facebook.webp",
        url: "https://facebook.com",
        descriptionKey: "facebook_desc"
      },
      {
        name: "Tinder",
        icon: "icons/tinder.webp",
        url: "https://tinder.com",
        descriptionKey: "tinder_desc"
      },
      {
        name: "Truth Social",
        nameKey: "truthsocial_name",
        icon: "icons/truthsocial.webp",
        url: "https://truthsocial.com",
        descriptionKey: "truthsocial_desc",
      },
      {
        name: "Bluesky",
        nameKey: "bluesky_name",
        icon: "icons/bluesky.webp",
        url: "https://bsky.app",
        descriptionKey: "bluesky_desc"
      },
      {
        name: "Twitch",
        icon: "icons/twitch.webp",
        url: "https://www.twitch.tv",
        descriptionKey: "twitch_desc"
      },
      {
        name: "Patreon",
        icon: "icons/patreon.webp",
        url: "https://www.patreon.com",
        descriptionKey: "patreon_desc"
      },
      {
        name: "Discord",
        icon: "icons/discord.webp",
        url: "https://discord.com/app",
        descriptionKey: "discord_desc"
      },
      {
        name: "Telegram",
        nameKey: "telegram_name",
        icon: "icons/telegram.webp",
        url: "https://web.telegram.org",
        descriptionKey: "telegram_desc"
      },
      {
        name: "Zoom",
        icon: "icons/zoom.webp",
        url: "https://zoom.us/join",
        descriptionKey: "zoom_desc"
      },
      {
        name: "Hacker News",
        nameKey: "hackernews_name",
        icon: "icons/hackernews.webp",
        url: "https://hackernews.com",
        descriptionKey: "hackernews_desc"
      },
      {
        name: "Lobsters",
        icon: "icons/lobsters.webp",
        url: "https://lobste.rs",
        descriptionKey: "lobsters_desc"
      },
      {
        name: "Tieba (贴吧)",
        nameKey: "tieba_name",
        icon: "icons/wrappers/tieba.webp",
        url: "/wrappers/tieba",
        descriptionKey: "tieba_desc",
        wrapper: true
      }
    ]
  },
  {
    name: "Finance",
    nameKey: "finance_name",
    apps: [
      {
        name: "Chase",
        nameKey: "chase_name",
        descriptionKey: "chase_desc",
        icon: "icons/chase.webp",
        url: "https://chase.com"
      },
      {
        name: "Bitcoin Well",
        nameKey: "bitcoinwell_name",
        descriptionKey: "bitcoinwell_desc",
        icon: "icons/bitcoinwell.webp",
        url: "https://bitcoinwell.com"
      },
      {
        name: "East Money (东方财经)",
        nameKey: "eastmoney_name",
        descriptionKey: "eastmoney_desc",
        icon: "icons/eastmoney.webp",
        url: "https://eastmoney.com"
      },
      {
        name: "TradingView",
        nameKey: "tradingview_name",
        descriptionKey: "tradingview_desc",
        icon: "icons/tradingview.webp",
        url: "https://www.tradingview.com"
      },
      {
        name: "Yahoo Finance",
        nameKey: "yahoofinance_name",
        descriptionKey: "yahoofinance_desc",
        icon: "icons/yahoofinance.webp",
        url: "https://finance.yahoo.com"
      },
      {
        name: "LongForecast",
        nameKey: "longforecast_name",
        descriptionKey: "longforecast_desc",
        icon: "icons/longforecast.webp",
        url: "https://longforecast.com"
      },
      {
        name: "Investing",
        nameKey: "investing_name",
        descriptionKey: "investing_desc",
        icon: "icons/investing.webp",
        url: "https://www.investing.com"
      },
      {
        name: "Paypal",
        nameKey: "paypal_name",
        descriptionKey: "paypal_desc",
        icon: "icons/wrappers/paypal.webp",
        url: "/wrappers/paypal",
        wrapper: true
      },
      {
        name: "Moomoo",
        nameKey: "moomoo_name",
        descriptionKey: "moomoo_desc",
        icon: "icons/wrappers/moomoo.webp",
        url: "/wrappers/moomoo",
        wrapper: true
      },
      {
        name: "Bank of America",
        nameKey: "bankofamerica_name",
        descriptionKey: "bankofamerica_desc",
        icon: "icons/wrappers/bankofamerica.webp",
        url: "/wrappers/bankofamerica",
        wrapper: true
      }
    ]
  },
  {
    name: "Tech",
    nameKey: "tech_key",
    apps: [
      {
        name: "Windows Central",
        nameKey: "windowscentral_name",
        descriptionKey: "windowscentral_desc",
        icon: "icons/windowscentral.webp",
        url: "https://www.windowscentral.com"
      },
      {
        name: "Mac Rumors",
        nameKey: "macrumors_name",
        descriptionKey: "macrumors_desc",
        icon: "icons/macrumors.webp",
        url: "https://www.macrumors.com"
      },
      {
        name: "Android Authority",
        nameKey: "androidauthority_name",
        descriptionKey: "androidauthority_desc",
        icon: "icons/androidauthority.webp",
        url: "https://www.androidauthority.com"
      },
      {
        name: "Tom's Hardware",
        nameKey: "tomshardware_name",
        descriptionKey: "tomshardware_desc",
        icon: "icons/tomshardware.webp",
        url: "https://www.tomshardware.com"
      },
      {
        name: "Ars OpenForum",
        nameKey: "arsopenforum_name",
        descriptionKey: "arsopenforum_desc",
        icon: "icons/ars-open-forum.webp",
        url: "https://arstechnica.com/civis"
      },
      {
        name: "XDA Forums",
        nameKey: "xdaforums_name",
        descriptionKey: "xdaforums_desc",
        icon: "icons/xdaforums.webp",
        url: "https://xdaforums.com"
      },
      {
        name: "AppleInsider",
        nameKey: "appleinsider_name",
        descriptionKey: "appleinsider_desc",
        icon: "icons/appleinsider.webp",
        url: "https://appleinsider.com",
      },
      {
        name: "PCMag",
        nameKey: "pcmag_name",
        descriptionKey: "pcmag_desc",
        icon: "icons/pcmag.webp",
        url: "https://www.pcmag.com",
      },
      {
        name: "ZDNET",
        nameKey: "zdnet_name",
        descriptionKey: "zdnet_desc",
        icon: "icons/zdnet.webp",
        url: "https://www.zdnet.com",
      },
      {
        name: "LINUX DO",
        nameKey: "linuxdo_name",
        descriptionKey: "linuxdo_desc",
        icon: "icons/linuxdo.webp",
        url: "https://linux.do"
      },
    ]
  },
  {
    name: "Software Distributions",
    nameKey: "softwaredistributions_name",
    apps : [
      {
        name: "APKPure",
        nameKey: "apkpure_name",
        descriptionKey: "apkpure_desc",
        icon: "icons/apkpure.webp",
        url: "https://apkpure.com"
      },
      {
        name: "Arch Linux AUR",
        nameKey: "aur_name",
        descriptionKey: "aur_desc",
        icon: "icons/aur.webp",
        url: "https://aur.archlinux.org"
      },
      {
        name: "Internet Archive",
        nameKey: "archive_name",
        descriptionKey: "archive_desc",
        icon: "icons/wrappers/archive.webp",
        url: "/wrappers/archive",
        wrapper: true
      },
    ]
  },
  {
    name: "News",
    nameKey: "news_name",
    apps: [
      { name: "RT", nameKey: "rt_name", descriptionKey: "rt_desc", icon: "icons/rt.webp", url: "https://www.rt.com" },
      { name: "PressTV", nameKey: "presstv_name", descriptionKey: "presstv_desc", icon: "icons/presstv.webp", url: "https://www.presstv.ir" },
      { name: "Bloomberg", nameKey: "bloomberg_name", descriptionKey: "bloomberg_desc", icon: "icons/bloomberg.webp", url: "https://www.bloomberg.com" },
      { name: "Firstpost", nameKey: "firstpost_name", descriptionKey: "firstpost_desc", icon: "icons/firstpost.webp", url: "https://www.firstpost.com" },
      { name: "Forbes", nameKey: "forbes_name", descriptionKey: "forbes_desc", icon: "icons/forbes.webp", url: "https://www.forbes.com" },
      { name: "PBS", nameKey: "pbs_name", descriptionKey: "pbs_desc", icon: "icons/pbs.webp", url: "https://www.pbs.org" },
      { name: "BBC", nameKey: "bbc_name", descriptionKey: "bbc_desc", icon: "icons/bbc.webp", url: "https://www.bbc.com" },
      { name: "Associated Press", nameKey: "ap_name", descriptionKey: "ap_desc", icon: "icons/associatedpress.webp", url: "https://apnews.com" },
      { name: "In Defence of Marxism", nameKey: "marxism_name", descriptionKey: "marxism_desc", icon: "icons/indefenseofmarxism.webp", url: "https://marxist.com" },
      { name: "ABC News", nameKey: "abcnews_name", descriptionKey: "abcnews_desc", icon: "icons/abcnews.webp", url: "https://abcnews.go.com" },
      { name: "US News", nameKey: "usnews_name", descriptionKey: "usnews_desc", icon: "icons/usnews.webp", url: "https://www.usnews.com" },
      { name: "CBS News", nameKey: "cbsnews_name", descriptionKey: "cbsnews_desc", icon: "icons/cbs.webp", url: "https://www.cbsnews.com" },
      { name: "NBC", nameKey: "nbc_name", descriptionKey: "nbc_desc", icon: "icons/nbc.webp", url: "https://www.nbc.com" },
      { name: "CNBC", nameKey: "cnbc_name", descriptionKey: "cnbc_desc", icon: "icons/nbc.webp", url: "https://www.cnbc.com" },
      { name: "MSNBC", nameKey: "msnbc_name", descriptionKey: "msnbc_desc", icon: "icons/nbc.webp", url: "https://www.msnbc.com" },
      { name: "The Independent", nameKey: "independent_name", descriptionKey: "independent_desc", icon: "icons/independent.webp", url: "https://www.independent.co.uk" },
      { name: "The Guardian", nameKey: "theguardian_name", descriptionKey: "theguardian_desc", icon: "icons/theguardian.webp", url: "https://www.theguardian.com" },
      { name: "Nippon TV NEWS (日テレNEWS)", nameKey: "nittele_name", descriptionKey: "nittele_desc", icon: "icons/nittele.webp", url: "https://news.ntv.co.jp" },
      { name: "New York Times", nameKey: "nyt_name", descriptionKey: "nyt_desc", icon: "icons/wrappers/nytimes.webp", url: "/wrappers/nytimes", wrapper: true },
      { name: "Reuters", nameKey: "reuters_name", descriptionKey: "reuters_desc", icon: "icons/wrappers/reuters.webp", url: "/wrappers/reuters", wrapper: true },
      { name: "CNN", nameKey: "cnn_name", descriptionKey: "cnn_desc", icon: "icons/wrappers/cnn.webp", url: "/wrappers/cnn", wrapper: true },
      { name: "Fox News", nameKey: "foxnews_name", descriptionKey: "foxnews_desc", icon: "icons/wrappers/foxnews.webp", url: "/wrappers/foxnews", wrapper: true },
      { name: "USA Today", nameKey: "usatoday_name", descriptionKey: "usatoday_desc", icon: "icons/wrappers/usatoday.webp", url: "/wrappers/usatoday", wrapper: true },
      { name: "REVCOM.US", nameKey: "revcom_name", descriptionKey: "revcom_desc", icon: "icons/wrappers/revcomus.webp", url: "/wrappers/revcomus", wrapper: true },
      { name: "Al Jazeera", nameKey: "aljazeera_name", descriptionKey: "aljazeera_desc", icon: "icons/wrappers/aljazeera.webp", url: "/wrappers/aljazeera", wrapper: true },
      { name: "CGTN", nameKey: "cgtn_name", descriptionKey: "cgtn_desc", icon: "icons/wrappers/cgtn.webp", url: "/wrappers/cgtn", wrapper: true },
      { name: "CCTV", nameKey: "cctv_name", descriptionKey: "cctv_desc", icon: "icons/wrappers/cctv.webp", url: "/wrappers/cctv", wrapper: true },
      { name: "Fortune", nameKey: "fortune_name", descriptionKey: "fortune_desc", icon: "icons/wrappers/fortune.webp", url: "/wrappers/fortune", wrapper: true},
      { name: "ifeng (凤凰网)", nameKey: "ifeng_name", descriptionKey: "ifeng_desc", icon: "icons/wrappers/ifeng.webp", url: "/wrappers/ifeng", wrapper: true },
      { name: "Tencent News (腾讯新闻)", nameKey: "tencent_name", descriptionKey: "tencent_desc", icon: "icons/tencent_news.webp", url: "https://news.qq.com" },
      { name: "Baidu (百度)", nameKey: "baidu_name", descriptionKey: "baidu_desc", icon: "icons/baidu.webp", url: "https://www.baidu.com" },
      { name: "Sohu (搜狐)", nameKey: "sohu_name", descriptionKey: "sohu_desc", icon: "icons/sohu.webp", url: "https://www.sohu.com" },
      { name: "Weibo Lite (微博Lite)", nameKey: "weibo_name", descriptionKey: "weibo_desc", icon: "icons/weibo.webp", url: "https://m.weibo.cn" },
    ]
  },
  {
    name: "Entertainment Platform",
    nameKey: "entertainmentplatform_name",
    apps : [
      { name: "AGE Animation (AGE动漫)", nameKey: "age_name", descriptionKey: "age_desc", icon: "icons/ageanimation.webp", url: "https://www.agedm.vip" },
      { name: "Disney+", nameKey: "disneyplus_name", descriptionKey: "disneyplus_desc", icon: "icons/disneyplus.webp", url: "https://www.disneyplus.com" },
      { name: "ViX (vix.com)", nameKey: "vixcom_name", descriptionKey: "vixcom_desc", icon: "icons/vix.webp", url: "https://www.vix.com" },
      { name: "ViX (vix.watch)", nameKey: "vixwatch_name", descriptionKey: "vixwatch_desc", icon: "icons/vix.webp", url: "https://vix.watch" },
      { name: "ESPN", nameKey: "espn_name", descriptionKey: "espn_desc", icon: "icons/espn.webp", url: "https://www.espn.com" },
      { name: "Dubok (独播库)", nameKey: "dubok_name", descriptionKey: "dubok_desc", icon: "icons/dubok.webp", url: "https://www.dubok.tv" },
      { name: "Youku (优酷)", nameKey: "youku_name", descriptionKey: "youku_desc", icon: "icons/youku.webp", url: "https://www.youku.com" },
      { name: "Lightnovel Kingdom (轻之国度)", nameKey: "lightnovel_name", descriptionKey: "lightnovel_desc", icon: "icons/wrappers/lightnovelkingdom.webp", url: "/wrappers/lightnovelkingdom", wrapper: true },
      { name: "WeChat Read (微信读书)", nameKey: "wechatread_name", descriptionKey: "wechatread_desc", icon: "icons/wrappers/wechatread.webp", url: "/wrappers/wechatread", wrapper: true },
      { name: "TED", nameKey: "ted_name", descriptionKey: "ted_desc", icon: "icons/wrappers/ted.webp", url: "/wrappers/ted", wrapper: true },
      { name: "Netflix", nameKey: "netflix_name", descriptionKey: "netflix_desc", icon: "icons/wrappers/netflix.webp", url: "/wrappers/netflix", wrapper: true }
    ]
  },
  {
    name: "Games",
    nameKey: "games_name",
    apps: [
      {
        name: "GamesLOL",
        nameKey: "gameslol_name",
        descriptionKey: "gameslol_desc",
        icon: "icons/gameslol.webp",
        url: "https://en.gameslol.net"
      },
      {
        name: "CrazyGames",
        nameKey: "crazygames_name",
        descriptionKey: "crazygames_desc",
        icon: "icons/crazygames.webp",
        url: "https://www.crazygames.com"
      },
      {
        name: "Web Gamer",
        nameKey: "webgamer_name",
        descriptionKey: "webgamer_desc",
        icon: "icons/webgamer.webp",
        url: "https://webgamer.io"
      },
      {
        name: "MuMu Emulator (MuMu模拟器)",
        nameKey: "mumu_cn_name",
        descriptionKey: "mumu_cn_desc",
        icon: "icons/wrappers/mumu.webp",
        url: "https://mumu.163.com",
        wrapper: true
      },
      {
        name: "MuMuPlayer",
        nameKey: "mumu_global_name",
        descriptionKey: "mumu_global_desc",
        icon: "icons/wrappers/mumu.webp",
        url: "https://www.mumuplayer.com",
        wrapper: true
      }
    ]
  },
  {
    name: "Gaming Community",
    nameKey: "gamingcommunity_name",
    apps: [
      {
        name: "Murlok.io",
        nameKey: "murlok_name",
        descriptionKey: "murlok_desc",
        icon: "icons/murlok.webp",
        url: "https://murlok.io"
      },
      {
        name: "World of Warcraft Forums (US)",
        nameKey: "wowforums_name",
        descriptionKey: "wowforums_desc",
        icon: "icons/wow.webp",
        url: "https://us.forums.blizzard.com/en/wow"
      },
      {
        name: "WoWAnalyzer",
        nameKey: "wowanalyzer_name",
        descriptionKey: "wowanalyzer_desc",
        icon: "icons/wowanalyzer.webp",
        url: "https://wowanalyzer.com"
      },
      {
        name: "MMO Champion",
        nameKey: "mmochampion_name",
        descriptionKey: "mmochampion_desc",
        icon: "icons/wrappers/mmo-champion.webp",
        url: "/wrappers/mmo-champion",
        wrapper: true
      },
      {
        name: "Warcraft Logs",
        nameKey: "warcraftlogs_name",
        descriptionKey: "warcraftlogs_desc",
        icon: "icons/wrappers/warcraftlogs.webp",
        url: "/wrappers/warcraftlogs",
        wrapper: true
      },
      {
        name: "Raider.IO",
        nameKey: "raiderio_name",
        descriptionKey: "raiderio_desc",
        icon: "icons/wrappers/raiderio.webp",
        url: "/wrappers/raiderio",
        wrapper: true
      },
      {
        name: "MapleStory",
        nameKey: "maplestory_name",
        descriptionKey: "maplestory_desc",
        icon: "icons/wrappers/maplestory.webp",
        url: "/wrappers/maplestory",
        wrapper: true
      },
      {
        name: "CurseForge",
        nameKey: "curseforge_name",
        descriptionKey: "curseforge_desc",
        icon: "icons/wrappers/curseforge.webp",
        url: "/wrappers/curseforge",
        wrapper: true
      },
      {
        name: "Minecraft Forum",
        nameKey: "minecraftforum_name",
        descriptionKey: "minecraftforum_desc",
        icon: "icons/wrappers/minecraftforum.webp",
        url: "/wrappers/minecraftforum",
        wrapper: true
      },
      {
        name: "IGN",
        nameKey: "ign_name",
        descriptionKey: "ign_desc",
        icon: "icons/wrappers/ign.webp",
        url: "/wrappers/ign",
        wrapper: true
      },
    ]
  },
  {
    name: "Learning",
    nameKey: "learning_name",
    apps: [
      {
        name: "Duolingo",
        nameKey: "duolingo_global_name",
        descriptionKey: "duolingo_global_desc",
        icon: "icons/duolingo.webp",
        url: "https://duolingo.com"
      },
      {
        name: "Duolingo (多邻国)",
        nameKey: "duolingo_cn_name",
        descriptionKey: "duolingo_cn_desc",
        icon: "icons/duolingo.webp",
        url: "https://cn.duolingo.com"
      },
    ]
  },
  {
    name: "Forums",
    nameKey: "forums_name",
    apps: [
      {
        name: "Incels.is",
        nameKey: "incelsis_name",
        descriptionKey: "incelsis_desc",
        icon: "icons/incel.webp",
        url: "https://incels.is"
      },
      {
        name: "4chan",
        nameKey: "fourchan_name",
        descriptionKey: "fourchan_desc",
        icon: "icons/4chan.webp",
        url: "https://4chan.org"
      },
    ]
  },
  {
    name: "Knowledge & Pedias",
    nameKey: "knowledgespedia_name",
    apps: [
      {
        name: "Wikipedia",
        nameKey: "wikipedia_name",
        descriptionKey: "wikipedia_desc",
        icon: "icons/wikipedia.webp",
        url: "https://wikipedia.org"
      },
      {
        name: "Baidu Baike (百度百科)",
        nameKey: "baidubaike_name",
        descriptionKey: "baidubaike_desc",
        icon: "icons/baike.webp",
        url: "https://baike.baidu.com"
      },
      {
        name: "Liquipedia",
        nameKey: "liquipedia_name",
        descriptionKey: "liquipedia_desc",
        icon: "icons/liquipedia.webp",
        url: "https://liquipedia.net"
      },
      {
        name: "Incel Wiki",
        nameKey: "incelwiki_name",
        descriptionKey: "incelwiki_desc",
        icon: "icons/incelwiki.webp",
        url: "https://incels.wiki"
      },
      {
        name: "Marxists Internet Archive",
        nameKey: "marxistsorg_name",
        descriptionKey: "marxistsorg_desc",
        icon: "icons/wrappers/marxistsorg.webp",
        url: "/wrappers/marxistsorg",
        wrapper: true
      },
    ]
  },
  {
    name: "Religion",
    nameKey: "religion_name",
    apps: [
      {
      name: "Quran.com",
      nameKey: "qurancom_name",
      descriptionKey: "qurancom_desc",
      icon: "icons/qurancom.webp",
      url: "https://quran.com"
      },
      {
        name: "YouVersion Bible",
        nameKey: "biblecom_name",
        descriptionKey: "biblecom_desc",
        icon: "icons/wrappers/biblecom.webp",
        url: "/wrappers/biblecom",
        wrapper: true
      },
    ]
  },
  {
    name: "Analytics",
    nameKey: "analytics_name",
    apps: [
      {
        name: "PWA Stats",
        nameKey: "pwastats_name",
        descriptionKey: "pwastats_desc",
        icon: "icons/pwastats.webp",
        url: "https://www.pwastats.com"
      },
      {
        name: "StatCounter GS",
        nameKey: "statcounter_name",
        descriptionKey: "statcounter_desc",
        icon: "icons/statcounter.webp",
        url: "https://gs.statcounter.com"
      },
      {
        name: "Basemark Web",
        nameKey: "basemarkweb_name",
        descriptionKey: "basemarkweb_desc",
        icon: "icons/basemarkweb.webp",
        url: "https://web.basemark.com"
      },
      {
        name: "BrowserBench",
        nameKey: "browserbench_name",
        descriptionKey: "browserbench_desc",
        icon: "icons/wrappers/browserbench.webp",
        url: "/wrappers/browserbench",
        wrapper: true
      }
    ]
  },
  {
    name: "Music Streaming",
    nameKey: "musicstreaming_name",
    apps: [
      {
        name: "Spotify",
        nameKey: "spotify_name",
        descriptionKey: "spotify_desc",
        icon: "icons/spotify.webp",
        url: "https://open.spotify.com"
      },
      {
        name: "Apple Music",
        nameKey: "applemusic_name",
        descriptionKey: "applemusic_desc",
        icon: "icons/applemusic.webp",
        url: "https://music.apple.com"
      },
      {
        name: "YouTube Music",
        nameKey: "youtubemusic_name",
        descriptionKey: "youtubemusic_desc",
        icon: "icons/youtubemusic.webp",
        url: "https://music.youtube.com"
      },
    ]
  },
  {
    name: "E-commerce",
    nameKey: "ecommerece_name",
    apps: [
      {
        name: "Starbucks",
        nameKey: "starbucks_name",
        descriptionKey: "starbucks_desc",
        icon: "icons/starbucks.webp",
        url: "https://www.starbucks.com"
      },
      {
        name: "Amazon",
        nameKey: "amazon_name",
        descriptionKey: "amazon_desc",
        icon: "icons/amazon.webp",
        url: "https://www.amazon.com"
      },
      {
        name: "Best Buy",
        nameKey: "bestbuy_name",
        descriptionKey: "bestbuy_desc",
        icon: "icons/bestbuy.webp",
        url: "https://www.bestbuy.com"
      },
      {
        name: "eBay",
        nameKey: "ebay_name",
        descriptionKey: "ebay_desc",
        icon: "icons/ebay.webp",
        url: "https://www.ebay.com"
      },
      {
        name: "Taobao (淘宝)",
        nameKey: "taobao_name",
        descriptionKey: "taobao_desc",
        icon: "icons/taobao.webp",
        url: "https://www.taobao.com"
      },
      {
        name: "Walmart",
        nameKey: "walmart_name",
        descriptionKey: "walmart_desc",
        icon: "icons/wrappers/walmart.webp",
        url: "/wrappers/walmart",
        wrapper: true
      },
      {
        name: "Target",
        nameKey: "target_name",
        descriptionKey: "target_desc",
        icon: "icons/wrappers/target.webp",
        url: "/wrappers/target",
        wrapper: true
      },
      {
        name: "CVS",
        nameKey: "cvs_name",
        descriptionKey: "cvs_desc",
        icon: "icons/wrappers/cvs.webp",
        url: "/wrappers/cvs",
        wrapper: true
      },
      {
        name: "Doordash",
        nameKey: "doordash_name",
        descriptionKey: "doordash_desc",
        icon: "icons/wrappers/doordash.webp",
        url: "/wrappers/doordash",
        wrapper: true
      },
      {
        name: "KFC",
        nameKey: "kfc_name",
        descriptionKey: "kfc_desc",
        icon: "icons/wrappers/kfc.webp",
        url: "/wrappers/kfc",
        wrapper: true
      },
      {
        name: "Subway",
        nameKey: "subway_name",
        descriptionKey: "subway_desc",
        icon: "icons/wrappers/subway.webp",
        url: "/wrappers/subway",
        wrapper: true
      },
      {
        name: "McDonald's",
        nameKey: "mcdonalds_name",
        descriptionKey: "mcdonalds_desc",
        icon: "icons/wrappers/mcdonalds.webp",
        url: "/wrappers/mcdonalds",
        wrapper: true
      },
      {
        name: "Apple Store",
        nameKey: "applestore_name",
        descriptionKey: "applestore_desc",
        icon: "icons/wrappers/apple.webp",
        url: "/wrappers/applestore",
        wrapper: true,
      },
      {
        name: "Apple Retail Store",
        nameKey: "appleretail_name",
        descriptionKey: "appleretail_desc",
        icon: "icons/wrappers/apple.webp",
        url: "/wrappers/appleretail",
        wrapper: true,
      },
    ]
  },
  {
    name: "Mobility & Logistics",
    nameKey: "mobilitylogistics_name",
    apps: [
      {
        name: "Uber",
        nameKey: "uber_name",
        descriptionKey: "uber_desc",
        icon: "icons/uber.webp",
        url: "https://uber.com"
      },
      {
        name: "Amtrak",
        nameKey: "amtrak_name",
        descriptionKey: "amtrak_desc",
        icon: "icons/amtrak.webp",
        url: "https://amtrak.com"
      },
      {
        name: "Delta",
        nameKey: "delta_name",
        descriptionKey: "delta_desc",
        icon: "icons/delta.webp",
        url: "https://delta.com"
      },
      {
        name: "United Airlines",
        nameKey: "united_name",
        descriptionKey: "united_desc",
        icon: "icons/united.webp",
        url: "https://united.com"
      },
      {
        name: "FlixBus",
        nameKey: "flixbus_name",
        descriptionKey: "flixbus_desc",
        icon: "icons/flixbus.webp",
        url: "https://flixbus.com"
      },
      {
        name: "Booking",
        nameKey: "booking_name",
        descriptionKey: "booking_desc",
        icon: "icons/booking_name.webp",
        url: "https://www.booking.com"
      },
      {
        name: "SF Express (顺丰速运)",
        nameKey: "sfexpress_name",
        descriptionKey: "sfexpress_desc",
        icon: "icons/shunfeng.webp",
        url: "https://www.sf-express.com"
      },
      {
        name: "USPS",
        nameKey: "usps_name",
        descriptionKey: "usps_desc",
        icon: "icons/wrappers/usps.webp",
        url: "/wrappers/usps",
        wrapper: true
      },
    ]
  },
  {
    name: "Cars",
    nameKey: "cars_name",
    apps: [
      {
        name: "Tesla",
        nameKey: "tesla_name",
        descriptionKey: "tesla_desc",
        icon: "icons/tesla.webp",
        url: "https://www.tesla.com"
      },
      {
        name: "Jiakaobaodian (驾考宝典)",
        nameKey: "jiakaobaodian_name",
        descriptionKey: "jiakaobaodian_desc",
        icon: "icons/jiakaobaodian.webp",
        url: "https://www.jiakaobaodian.com"
      },
    ]
  },
  {
    name: "Tickets",
    nameKey: "tickets_name",
    apps: [
      {
        name: "Booking",
        nameKey: "booking_name",
        descriptionKey: "booking_desc",
        icon: "icons/wrappers/booking.webp",
        url: "/wrappers/booking",
        wrapper: true
      },
      {
        name: "Ctrip (携程)",
        nameKey: "ctrip_name",
        descriptionKey: "ctrip_desc",
        icon: "icons/wrappers/ctrip.webp",
        url: "/wrappers/ctrip",
        wrapper: true
      },
      {
        name: "Tao Piao Piao (淘票票)",
        nameKey: "taopiaopiao_name",
        descriptionKey: "taopiaopiao_desc",
        icon: "icons/wrappers/taopiaopiao.webp",
        url: "/wrappers/taopiaopiao",
        wrapper: true
      },
    ]
  },
  {
    name: "Housing",
    nameKey: "housing_name",
    apps: [
      {
        name: "Zillow",
        nameKey: "zillow_name",
        descriptionKey: "zillow_desc",
        icon: "icons/zillow.webp",
        url: "https://www.zillow.com",
      },
      {
        name: "Redfin",
        nameKey: "redfin_name",
        descriptionKey: "redfin_desc",
        icon: "icons/redfin.webp",
        url: "https://www.redfin.com",
      },
      {
        name: "Airbnb",
        nameKey: "airbnb_name",
        descriptionKey: "airbnb_desc",
        icon: "icons/wrappers/airbnb.webp",
        url: "/wrappers/airbnb",
        wrapper: true
      },
      {
        name: "Auction.com",
        nameKey: "auctioncom_name",
        descriptionKey: "auctioncom_desc",
        icon: "icons/wrappers/auctioncom.webp",
        url: "/wrappers/auctioncom",
        wrapper: true
      },
    ]
  },
  {
    name: "Jobs",
    nameKey: "jobs_name",
    apps: [
      {
        name: "LinkedIn",
        nameKey: "linkedin_name",
        descriptionKey: "linkedin_desc",
        icon: "icons/linkedin.webp",
        url: "https://www.linkedin.com",
      },
      {
        name: "Handshake",
        nameKey: "handshake_name",
        descriptionKey: "handshake_desc",
        icon: "icons/handshake.webp",
        url: "https://app.joinhandshake.com",
      },
    ]
  },
  {
    name: "Cloud (is someone else's computer)",
    nameKey: "cloud_name",
    apps: [
      {
        name: "Linode",
        nameKey: "linode_name",
        descriptionKey: "linode_desc",
        icon: "icons/linode.webp",
        url: "https://www.linode.com"
      },
      {
        name: "Azure",
        nameKey: "azure_name",
        descriptionKey: "azure_desc",
        icon: "icons/azure.webp",
        url: "https://portal.azure.com"
      },
    ]
  },
  {
    name: "Websites & Blogs",
    nameKey: "websitesblogs_name",
    apps: [
      {
        name: "WordPress",
        nameKey: "wordpress_name",
        descriptionKey: "wordpress_desc",
        icon: "icons/wordpress.webp",
        url: "https://wordpress.org"
      },
      {
        name: "Adactio",
        nameKey: "adactio_name",
        descriptionKey: "adactio_desc",
        icon: "icons/adactio.webp",
        url: "https://adactio.com"
      },
      {
        name: "Herb Sutter",
        nameKey: "herbsutter_name",
        descriptionKey: "herbsutter_desc",
        icon: "icons/wrappers/herbsutter.webp",
        url: "/wrappers/herbsutter",
        wrapper: true
      },
      {
        name: "Bjarne Stroustrup",
        nameKey: "bjarnestroustrup_name",
        descriptionKey: "bjarnestroustrup_desc",
        icon: "icons/wrappers/bjarnestroustrup.webp",
        url: "/wrappers/bjarnestroustrup",
        wrapper: true
      },
      {
        name: "NVIDIA",
        nameKey: "nvidia_name",
        descriptionKey: "nvidia_desc",
        icon: "icons/wrappers/nvidia.webp",
        url: "/wrappers/nvidia",
        wrapper: true
      }
    ]
  },
  {
    name: "United States Government🇺🇸",
    nameKey: "usgov_name",
    apps : [
      {
        name: "IRS",
        nameKey: "irs_name",
        icon: "icons/wrappers/irs.webp",
        url: "/wrappers/irs",
        descriptionKey: "irs_desc",
        wrapper: true
      },
      {
        name: "USCIS",
        nameKey: "uscis_name",
        icon: "icons/wrappers/uscis.webp",
        url: "/wrappers/uscis",
        descriptionKey: "uscis_desc",
        wrapper: true
      },
      {
        name: "SSA",
        nameKey: "ssa_name",
        icon: "icons/wrappers/ssa.webp",
        url: "/wrappers/ssa",
        descriptionKey: "ssa_desc",
        wrapper: true
      },
      {
        name: "TSA",
        nameKey: "tsa_name",
        icon: "icons/wrappers/tsa.webp",
        url: "/wrappers/tsa",
        descriptionKey: "tsa_desc",
        wrapper: true
      },
      {
        name: "DOS",
        nameKey: "dos_name",
        icon: "icons/wrappers/dos.webp",
        url: "/wrappers/dos",
        descriptionKey: "dos_desc",
        wrapper: true
      },
      {
        name: "USA.gov",
        nameKey: "usagov_name",
        icon: "icons/wrappers/usagov.webp",
        url: "/wrappers/usagov",
        descriptionKey: "usagov_desc",
        wrapper: true
      },
      {
        name: "IdentityTheft",
        nameKey: "identitytheft_name",
        icon: "icons/wrappers/identitytheft.webp",
        url: "/wrappers/identitytheft",
        descriptionKey: "identitytheft_desc",
        wrapper: true
      },
      {
        name: "FTC",
        nameKey: "ftc_name",
        icon: "icons/wrappers/ftc.webp",
        url: "/wrappers/ftc",
        descriptionKey: "ftc_desc",
        wrapper: true
      },
      {
        name: "FDA",
        nameKey: "fda_name",
        icon: "icons/wrappers/fda.webp",
        url: "/wrappers/fda",
        descriptionKey: "fda_desc",
        wrapper: true
      },
      {
        name: "FED",
        nameKey: "fed_name",
        icon: "icons/wrappers/fed.webp",
        url: "/wrappers/fed",
        descriptionKey: "fed_desc",
        wrapper: true
      },
      {
        name: "DOL",
        nameKey: "dol_name",
        icon: "icons/wrappers/dol.webp",
        url: "/wrappers/dol",
        descriptionKey: "dol_desc",
        wrapper: true
      },
      {
        name: "DOD",
        nameKey: "dod_name",
        icon: "icons/wrappers/dod.webp",
        url: "/wrappers/dod",
        descriptionKey: "dod_desc",
        wrapper: true
      },
      {
        name: "GSA",
        nameKey: "gsa_name",
        icon: "icons/wrappers/gsa.webp",
        url: "/wrappers/gsa",
        descriptionKey: "gsa_desc",
        wrapper: true
      },
      {
        name: "DHS",
        nameKey: "dhs_name",
        icon: "icons/wrappers/dhs.webp",
        url: "/wrappers/dhs",
        descriptionKey: "dhs_desc",
        wrapper: true
      },
      {
        name: "DEA",
        nameKey: "dea_name",
        icon: "icons/wrappers/dea.webp",
        url: "/wrappers/dea",
        descriptionKey: "dea_desc",
        wrapper: true
      },
      {
        name: "EEOC",
        nameKey: "eeoc_name",
        icon: "icons/wrappers/eeoc.webp",
        url: "/wrappers/eeoc",
        descriptionKey: "eeoc_desc",
        wrapper: true
      },
      {
        name: "NSA",
        nameKey: "nsa_name",
        icon: "icons/wrappers/nsa.webp",
        url: "/wrappers/nsa",
        descriptionKey: "nsa_desc",
        wrapper: true
      },
      {
        name: "CIA",
        nameKey: "cia_name",
        icon: "icons/cia.webp",
        url: "https://www.cia.gov",
        descriptionKey: "cia_desc"
      },
      {
        name: "DOJ",
        nameKey: "doj_name",
        icon: "icons/wrappers/doj.webp",
        url: "/wrappers/doj",
        descriptionKey: "doj_desc",
        wrapper: true
      },
      {
        name: "OMB",
        nameKey: "omb_name",
        icon: "icons/wrappers/omb.webp",
        url: "/wrappers/omb",
        descriptionKey: "omb_desc",
        wrapper: true
      },
      {
        name: "NASA",
        nameKey: "nasa_name",
        icon: "icons/wrappers/nasa.webp",
        url: "/wrappers/nasa",
        descriptionKey: "nasa_desc",
        wrapper: true
      },
      {
        name: "White House",
        nameKey: "whitehouse_name",
        icon: "icons/wrappers/whitehouse.webp",
        url: "/wrappers/whitehouse",
        descriptionKey: "whitehouse_desc",
        wrapper: true
      }
    ]
  },
  {
    name: "Organizations",
    nameKey: "organizations_name",
    apps : [
      {
        name: "ISO",
        nameKey: "iso_name",
        descriptionKey: "iso_desc",
        icon: "icons/iso.webp",
        url: "https://www.iso.org"
      },
      {
        name: "Olympics",
        nameKey: "olympics_name",
        descriptionKey: "olympics_desc",
        icon: "icons/olympics.webp",
        url: "https://www.iso.org"
      },
      {
        name: "UN",
        nameKey: "un_name",
        descriptionKey: "un_desc",
        icon: "icons/wrappers/un.webp",
        url: "/wrappers/un",
        wrapper: true
      }
    ]
  },
  {
    name: "Health & Insurance",
    nameKey: "healthinsurance_name",
    apps : [
      {
        name: "UHS",
        nameKey: "uhs_name",
        descriptionKey: "uhs_desc",
        icon: "icons/wrappers/uhs.webp",
        url: "/wrappers/uhs",
        wrapper: true
      },
      {
        name: "Delta Dental",
        nameKey: "deltadental_name",
        descriptionKey: "deltadental_desc",
        icon: "icons/wrappers/deltadental.webp",
        url: "/wrappers/deltadental",
        wrapper: true
      }
    ]
  },
  {
    name: "Research",
    nameKey: "research_name",
    apps: [
      {
        name: "Security and Privacy Conference Deadlines",
        nameKey: "secdeadlines_name",
        descriptionKey: "secdeadlines_desc",
        icon: "icons/secdeadlines.webp",
        url: "https://sec-deadlines.github.io",
      },
      {
        name: "HotCRP",
        nameKey: "hotcrp_name",
        descriptionKey: "hotcrp_desc",
        icon: "icons/wrappers/hotcrp.webp",
        url: "/wrappers/hotcrp",
        wrapper: true,
      },
    ]
  },
  {
    name: "Education",
    nameKey: "education_name",
    apps: [
      {
        name: "Princeton University",
        nameKey: "princeton_name",
        descriptionKey: "princeton_desc",
        icon: "icons/princeton.webp",
        url: "https://www.princeton.edu"
      },
      {
        name: "Binghamton University",
        nameKey: "binghamton_name",
        descriptionKey: "binghamton_desc",
        icon: "icons/wrappers/binghamton_edu.webp",
        url: "/wrappers/binghamton_edu",
        wrapper: true
      },
      {
        name: "Fudan University",
        nameKey: "fudan_name",
        descriptionKey: "fudan_desc",
        icon: "icons/wrappers/fudan.webp",
        url: "/wrappers/fudan",
        wrapper: true
      }
    ]
  },
  {
    name: "Adult",
    nameKey: "adult_name",
    apps: [
      {
        name: "Pornhub",
        nameKey: "pornhub_name",
        descriptionKey: "pornhub_desc",
        icon: "icons/pornhub.webp",
        url: "https://www.pornhub.com"
      },
      {
        name: "SpankBang",
        nameKey: "spankbang_name",
        descriptionKey: "spankbang_desc",
        icon: "icons/spankbang.webp",
        url: "https://spankbang.com"
      },
      {
        name: "Hentai Haven",
        nameKey: "hentaihaven_name",
        descriptionKey: "hentaihaven_desc",
        icon: "icons/hentaihaven.webp",
        url: "https://hentaihaven.xxx"
      },
      {
        name: "MissAV TV",
        nameKey: "missavtv_name",
        descriptionKey: "missavtv_desc",
        icon: "icons/missavtv.webp",
        url: "https://missavtv.com/en"
      },
      {
        name: "XNXX.COM",
        nameKey: "xnxx_name",
        descriptionKey: "xnxx_desc",
        icon: "icons/xnxx.webp",
        url: "https://www.xnxx.com"
      },
      {
        name: "OnlyFans",
        nameKey: "onlyfans_name",
        descriptionKey: "onlyfans_desc",
        icon: "icons/onlyfans.webp",
        url: "https://onlyfans.com"
      },
    ]
  }
];
