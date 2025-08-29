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
      { name: "Wavacity", nameKey: "wavacity_name", icon: "icons/wavacity.webp", url: "https://wavacity.com", descriptionKey: "wavacity_desc" },
      {
        name: "Web Screen Recorder",
        nameKey: "webscreenrecorder_name",
        descriptionKey: "webscreenrecorder_desc",
        icon: "icons/webscreenrecorder.webp",
        url: "https://menglinmaker-pwa-screen-recorder.netlify.app"
      },
    ]
  },
  {
    nameKey: "chabots_name",
    name: "Chatbots",
    apps: [
      { name: "Microsoft Copilot", icon: "icons/copilot.webp", url: "https://copilot.microsoft.com", descriptionKey: "copilot_desc" },
      { name: "ChatGPT", icon: "icons/chatgpt.webp", url: "https://chat.openai.com", descriptionKey: "chatgpt_desc" },
      { name: "Grok", icon: "icons/grok.webp", url: "https://grok.com", descriptionKey: "grok_desc"},
      { name: "Meta AI", icon: "icons/metaai.webp", url: "https://www.meta.ai", descriptionKey: "metaai_desc" }, 
      { name: "Cursor", icon: "icons/cursor.webp", url: "https://cursor.com/agents", descriptionKey: "cursor_desc" },
      { name: "Google Gemini", icon: "icons/gemini.webp", url: "https://gemini.google.com", descriptionKey: "gemini_desc" },
      { name: "Claude", icon: "icons/claude.webp", url: "https://claude.ai", descriptionKey: "claude_desc" },
      { name: "Manus", icon: "icons/manus.webp", url: "https://manus.im", descriptionKey: "manus_desc" },
      { name: "Qwen", icon: "icons/qwen.webp", url: "https://chat.qwen.ai", descriptionKey: "qwen_desc" },
      { name: "DeepSeek", icon: "icons/deepseek.webp", url: "https://deepseek.com", descriptionKey: "deepseek_desc" },
      { name: "Kimi", icon: "icons/kimi.webp", url: "https://www.kimi.com", descriptionKey: "kimi_desc" },
      { name: "Kimi+", icon: "icons/kimi.webp", url: "https://www.kimi.com/kimiplus-square", descriptionKey: "kimiplus_desc" },
      { name: "Perplexity", icon: "icons/wrappers/perplexity.webp", url: "/wrappers/perplexity", descriptionKey: "perplexity_desc", apptype: "wrapper" },
    ]
  },
  {
    nameKey: "cybersecurity_name",
    name: "Cybersecurity",
    apps: [
      { name: "ScamAdviser", icon: "icons/scamadviser.webp", url: "https://www.scamadviser.com", descriptionKey: "scamadviser_desc" },
      { name: "stack.watch", icon: "icons/wrappers/stackwatch.webp", url: "/wrappers/stackwatch", descriptionKey: "stackwatch_desc", apptype: "wrapper" },    ]
  },
  {
    nameKey: "time_name",
    name: "Time",
    apps: [
      { name: "Time.is", icon: "icons/timeis.webp", url: "https://time.is", descriptionKey: "timeis_desc" },
      { name: "Every Time Zone", icon: "icons/everytimezone.webp", url: "https://everytimezone.com", descriptionKey: "everytimezone_desc" },
      { name: "NIST Time", icon: "icons/wrappers/timegov.webp", url: "/wrappers/timegov", descriptionKey: "timegov_desc", apptype: "wrapper" },
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
      { name: "Bing", nameKey: "bing_name", icon: "icons/wrappers/bing.webp", url: "/wrappers/bing", descriptionKey: "bing_desc", apptype: "wrapper" },
      { name: "MSN", nameKey: "msn_name", icon: "icons/wrappers/msn.webp", url: "/wrappers/msn", descriptionKey: "msn_desc", apptype: "wrapper" },
    ]
  },
  {
    nameKey: "google_services_name",
    apps: [
      { name: "Google", icon: "icons/google.webp", url: "https://www.google.com", descriptionKey: "google_desc" },
      { nameKey: "googlevoice_name", name: "Google Voice", icon: "icons/googlevoice.webp", url: "https://voice.google.com", descriptionKey: "googlevoice_desc" },
      { nameKey: "googlemaps_name", name: "Google Maps", icon: "icons/googlemaps.webp", url: "https://maps.google.com", descriptionKey: "googlemaps_desc" },
      { nameKey: "googlenews_name", name: "Google News", icon: "icons/googlenews.webp", url: "https://news.google.com", descriptionKey: "googlenews_desc" },
      { name: "Gmail", icon: "icons/wrappers/gmail.webp", url: "/wrappers/gmail", descriptionKey: "gmail_desc", apptype: "wrapper" },
    ]
  },
  {
    nameKey: "officesuites_name",
    name: "Office Suites",
    apps: [
      {
        name: "WPS",
        icon: "icons/wrappers/wps.webp",
        url: "/wrappers/wps",
        descriptionKey: "wps_desc",
        apptype: "wrapper"
      },
      {
        name: "WPS (CN)",
        nameKey: "wpscn_name",
        descriptionKey: "wpscn_desc",
        icon: "icons/wrappers/wps.webp",
        url: "/wrappers/wpscn",
        apptype: "wrapper"
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
        name: "Google for Developers",
        nameKey: "googledevelopers_name",
        icon: "icons/google.webp",
        url: "https://developers.google.com",
        descriptionKey: "googledevelopers_desc"
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
        name: "LeetCode",
        nameKey: "leetcode_name",
        icon: "icons/wrappers/leetcode.webp",
        url: "https://leetcode.com",
        descriptionKey: "leetcode_desc"
      },
      {
        name: "LeetCode (CN)",
        nameKey: "leetcodecn_name",
        icon: "icons/wrappers/leetcode.webp",
        url: "/wrappers/leetcodecn",
        descriptionKey: "leetcodecn_desc",
        apptype: "wrapper"
      },
      {
        name: "USACO Training Gateway",
        nameKey: "usacotraining_name",
        icon: "icons/usacotraining.webp",
        url: "https://usaco.training",
        descriptionKey: "usacotraining_desc"
      },
      {
        name: "F-Droid",
        nameKey: "fdroid_name",
        icon: "icons/fdroid.webp",
        url: "https://f-droid.org",
        descriptionKey: "fdroid_desc"
      },
      {
        name: "Resilient Web Design",
        nameKey: "resilientwebdesign_name",
        icon: "icons/resilientwebdesign.webp",
        url: "https://resilientwebdesign.com",
        descriptionKey: "resilientwebdesign_desc"
      },
      {
        name: "PWA Dev China",
        nameKey: "pwadevcn_name",
        icon: "icons/pwadevcn.webp",
        url: "https://pwadev.cn",
        descriptionKey: "pwadevcn_desc"
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
        apptype: "wrapper"
      },
      {
        name: "Linux.die",
        nameKey: "linuxdie_name",
        icon: "icons/wrappers/linuxdie.webp",
        url: "/wrappers/linuxdie",
        descriptionKey: "linuxdie_desc",
        apptype: "wrapper"
      },
      {
        name: "Godbolt",
        icon: "icons/wrappers/godbolt.webp",
        url: "/wrappers/godbolt",
        descriptionKey: "godbolt_desc",
        apptype: "wrapper"
      },
      {
        name: "v86",
        icon: "icons/wrappers/v86.webp",
        url: "/wrappers/v86",
        descriptionKey: "v86_desc",
        apptype: "wrapper"
      },
      {
        name: "Termux",
        icon: "icons/wrappers/termux.webp",
        url: "/wrappers/termux",
        descriptionKey: "termux_desc",
        apptype: "wrapper",
      },
      {
        name: "Free Software Foundations",
        nameKey: "fsf_name",
        icon: "icons/wrappers/fsf.webp",
        url: "/wrappers/fsf",
        descriptionKey: "fsf_desc",
        apptype: "wrapper"
      },
      {
        name: "GCC MCF",
        nameKey: "gccmcf_name",
        icon: "icons/wrappers/lhmouse.webp",
        url: "/wrappers/gccmcf",
        descriptionKey: "gccmcf_desc",
        apptype: "wrapper"
      },
      {
        name: "GeeksForGeeks",
        icon: "icons/wrappers/geeksforgeeks.webp",
        url: "/wrappers/geeksforgeeks",
        descriptionKey: "geeksforgeeks_desc",
        apptype: "wrapper"
      },
      {
        name: "Aurora Store",
        icon: "icons/wrappers/aurorastore.webp",
        url: "/wrappers/aurorastore",
        descriptionKey: "aurorastore_desc",
        apptype: "wrapper"
      },
      {
        name: "WeChat Developers",
        nameKey: "wechatdevelopers_name",
        descriptionKey: "wechatdevelopers_desc",
        icon: "icons/wrappers/wechatdevelopers.webp",
        url: "/wrappers/wechatdevelopers",
        apptype: "wrapper"
      },
      {
        name: "Mini Program Demo",
        nameKey: "miniprogramdemo_name",
        descriptionKey: "miniprogramdemo_desc",
        icon: "icons/wechatmini/miniprogramdemo.webp",
        url: "#小程序://小程序示例/H5Xs704fylC1Ktc",
        apptype: "wechatmini"
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
      },
      {
        name: "Yandex",
        nameKey: "yandex_name",
        icon: "icons/yandex.webp",
        url: "https://yandex.com",
        descriptionKey: "yandex_desc",
      },
      {
        name: "DuckDuckGo",
        url: "https://duckduckgo.com",
        nameKey: "duckduckgo_name",
        descriptionKey: "duckduckgo_desc",
        icon: "icons/duckduckgo.webp"
      },
      {
        name: "China Telecom",
        nameKey: "chinatelecom_name",
        descriptionKey: "chinatelecom_desc",
        icon: "icons/wechatmini/chinatelecom.webp",
        url: "#小程序://中国电信App/euxKgI21HGTS3KJ",
        apptype: "wechatmini"
      },
      {
        name: "China Mobile",
        nameKey: "chinamobile_name",
        descriptionKey: "chinamobile_desc",
        icon: "icons/wechatmini/chinamobile.webp",
        url: "#小程序://中国移动10086+/mtcmuETQct3HdmA",
        apptype: "wechatmini"
      },
      {
        name: "China Unicom",
        nameKey: "chinaunicom_name",
        descriptionKey: "chinaunicom_desc",
        icon: "icons/wechatmini/chinaunicom.webp",
        url: "#小程序://中国联通营业厅/nMjhTIVG5fmrslA",
        apptype: "wechatmini"
      },
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
        apptype: "wrapper",
        descriptionKey: "qqmail_desc"
      },
      {
        name: "163 Mail",
        nameKey: "netease163_name",
        icon: "icons/wrappers/netease163.webp",
        url: "/wrappers/netease163",
        apptype: "wrapper",
        descriptionKey: "netease163_desc"
      },
      {
        name: "126 Mail",
        nameKey: "netease126_name",
        icon: "icons/wrappers/netease126.webp",
        url: "/wrappers/netease126",
        apptype: "wrapper",
        descriptionKey: "netease126_desc"
      },
      {
        name: "yeah.net Mail",
        nameKey: "yeahnet_name",
        icon: "icons/wrappers/yeahnet.webp",
        url: "/wrappers/yeahnet",
        apptype: "wrapper",
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
        name: "Mastodon",
        icon: "icons/mastodon.webp",
        url: "https://mastodon.social",
        descriptionKey: "mastodon_desc"
      },
      {
        name: "Threads",
        icon: "icons/threads.webp",
        url: "https://www.threads.com",
        descriptionKey: "threads_desc"
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
        name: "Tumblr",
        icon: "icons/tumblr.webp",
        url: "https://www.tumblr.com",
        descriptionKey: "tumblr_desc"
      },
      {
        name: "Elk",
        icon: "icons/elk.webp",
        url: "https://elk.zone",
        descriptionKey: "elk_desc",
      },
      {
        name: "GroupMe",
        icon: "icons/groupme.webp",
        url: "https://web.groupme.com",
        descriptionKey: "groupme_desc"
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
        name: "Flipboard",
        nameKey: "flipboard_name",
        icon: "icons/flipboard.webp",
        url: "https://flipboard.com",
        descriptionKey: "flipboard_desc"
      },
      {
        name: "Pinterest",
        nameKey: "pinterest_name",
        icon: "icons/pinterest.webp",
        url: "https://www.pinterest.com",
        descriptionKey: "pinterest_desc",
      },
      {
        name: "Mixi",
        nameKey: "mixi_name",
        icon: "icons/mixi.webp",
        url: "https://mixi.jp",
        descriptionKey: "mixi_desc",
      },
      { name: "Weibo Lite (微博Lite)", nameKey: "weibo_name", descriptionKey: "weibo_desc", icon: "icons/weibo.webp", url: "https://m.weibo.cn" },
      {
        name: "Zoosk",
        nameKey: "zoosk_name",
        icon: "icons/wrappers/zoosk.webp",
        url: "/wrappers/zoosk",
        descriptionKey: "zoosk_desc",
        apptype: "wrapper"
      },
      {
        name: "Tieba (贴吧)",
        nameKey: "tieba_name",
        icon: "icons/wrappers/tieba.webp",
        url: "/wrappers/tieba",
        descriptionKey: "tieba_desc",
        apptype: "wrapper"
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
        name: "Stock Analysis",
        nameKey: "stockanalysis_name",
        descriptionKey: "stockanalysis_desc",
        icon: "icons/stockanalysis.webp",
        url: "https://stockanalysis.com"
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
        name: "Stripe Dashboard",
        nameKey: "stripe_name",
        descriptionKey: "stripe_desc",
        icon: "icons/stripe.webp",
        url: "https://dashboard.stripe.com"
      },
      {
        name: "Investor's Business Daily",
        nameKey: "investorsbusinessdaily_name",
        descriptionKey: "investorsbusinessdaily_desc",
        icon: "icons/investorsbusinessdaily.webp",
        url: "https://www.investors.com"
      },
      {
        name: "Seeking Alpha",
        nameKey: "seekingalpha_name",
        descriptionKey: "seekingalpha_desc",
        icon: "icons/seekingalpha.webp",
        url: "https://seekingalpha.com"
      },
      {
        name: "Motley Fool",
        nameKey: "motleyfool_name",
        descriptionKey: "motleyfool_desc",
        icon: "icons/motleyfool.webp",
        url: "https://www.fool.com"
      },
      {
        name: "Benzinga",
        nameKey: "benzinga_name",
        descriptionKey: "benzinga_desc",
        icon: "icons/benzinga.webp",
        url: "https://www.benzinga.com"
      },
      {
        name: "Investopedia",
        nameKey: "investopedia_name",
        descriptionKey: "investopedia_desc",
        icon: "icons/investopedia.webp",
        url: "https://www.investopedia.com"
      },
      {
        name: "Paypal",
        nameKey: "paypal_name",
        descriptionKey: "paypal_desc",
        icon: "icons/wrappers/paypal.webp",
        url: "/wrappers/paypal",
        apptype: "wrapper"
      },
      {
        name: "Moomoo",
        nameKey: "moomoo_name",
        descriptionKey: "moomoo_desc",
        icon: "icons/wrappers/moomoo.webp",
        url: "/wrappers/moomoo",
        apptype: "wrapper"
      },
      {
        name: "TheStreet",
        nameKey: "thestreet_name",
        descriptionKey: "thestreet_desc",
        icon: "icons/wrappers/thestreet.webp",
        url: "/wrappers/thestreet",
        apptype: "wrapper"
      },
      {
        name: "MarketWatch",
        nameKey: "marketwatch_name",
        descriptionKey: "marketwatch_desc",
        icon: "icons/wrappers/marketwatch.webp",
        url: "/wrappers/marketwatch",
        apptype: "wrapper"
      },
      {
        name: "Bank of America",
        nameKey: "bankofamerica_name",
        descriptionKey: "bankofamerica_desc",
        icon: "icons/wrappers/bankofamerica.webp",
        url: "/wrappers/bankofamerica",
        apptype: "wrapper"
      },
      {
        name: "ABC Microservices",
        nameKey: "abchinamicro_name",
        descriptionKey: "abchinamicro_desc",
        icon: "icons/wechatmini/abchina.webp",
        url: "#小程序://农行微服务/hjvTK1OXuyfOkCE",
        apptype: "wechatmini"
      },
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
        icon: "icons/wrappers/androidauthority.webp",
        url: "/wrappers/androidauthority",
        apptype: "wrapper"
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
        name: "F-Droid Forum",
        nameKey: "fdroidforum_name",
        descriptionKey: "fdroidforum_desc",
        icon: "icons/fdroid.webp",
        url: "https://forum.f-droid.org"
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
        name: "TechSpot",
        descriptionKey: "techspot_desc",
        icon: "icons/techspot.webp",
        url: "https://www.techspot.com"
      },
      {
        name: "The Verge",
        nameKey: "theverge_name",
        descriptionKey: "theverge_desc",
        icon: "icons/theverge.webp",
        url: "https://www.theverge.com",
      },
      {
        name: "Thurrott",
        nameKey: "thurrott_name",
        descriptionKey: "thurrott_desc",
        icon: "icons/thurrott.webp",
        url: "https://www.thurrott.com"
      },
      {
        name: "Cybernews",
        nameKey: "cybernews_name",
        descriptionKey: "cybernews_desc",
        icon: "icons/cybernews.webp",
        url: "https://cybernews.com"
      },
      {
        name: "TechRadar",
        nameKey: "techradar_name",
        descriptionKey: "techradar_desc",
        icon: "icons/techradar.webp",
        url: "https://www.techradar.com"
      },
      {
        name: "LINUX DO",
        nameKey: "linuxdo_name",
        descriptionKey: "linuxdo_desc",
        icon: "icons/linuxdo.webp",
        url: "https://linux.do"
      },
      {
        name: "Juejin",
        nameKey: "juejin_name",
        icon: "icons/juejin.webp",
        url: "https://juejin.cn",
        descriptionKey: "juejin_desc"
      },
    ]
  },
  {
    name: "Resource Distributions",
    nameKey: "resourcedistributions_name",
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
        apptype: "wrapper"
      },
      {
        name: "BTSOW",
        nameKey: "btsow_name",
        descriptionKey: "btsow_desc",
        icon: "icons/wrappers/btsow.webp",
        url: "/wrappers/btsow",
        apptype: "wrapper"
      },
    ]
  },
  {
    name: "Media Tools",
    nameKey: "mediatools_name",
    apps: [
      {
        name: "Spline",
        nameKey: "spline_name",
        descriptionKey: "spline_desc",
        icon: "icons/spline.webp",
        url: "https://spline.design"
      },
      {
        name: "Godot",
        nameKey: "godot_name",
        descriptionKey: "godot_desc",
        icon: "icons/godot.webp",
        url: "https://editor.godotengine.org"
      },
      {
        name: "Postimages",
        nameKey: "postimages_name",
        descriptionKey: "postimages_desc",
        icon: "icons/postimages.webp",
        url: "https://postimages.org",
      },
      {
        name: "Canva",
        nameKey: "canva_name",
        descriptionKey: "canva_desc",
        icon: "icons/wrappers/canva.webp",
        url: "/wrappers/canva",
        apptype: "wrapper"
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
      { name: "Newsweek", nameKey: "newsweek_name", descriptionKey: "newsweek_desc", icon: "icons/newsweek.webp", url: "https://www.newsweek.com" },
      { name: "The Hill", nameKey: "thehill_name", descriptionKey: "thehill_desc", icon: "icons/thehill.webp", url: "https://thehill.com" },
      { name: "The Independent", nameKey: "independent_name", descriptionKey: "independent_desc", icon: "icons/independent.webp", url: "https://www.independent.co.uk" },
      { name: "The Guardian", nameKey: "theguardian_name", descriptionKey: "theguardian_desc", icon: "icons/theguardian.webp", url: "https://www.theguardian.com" },
      { name: "Nippon TV NEWS (日テレNEWS)", nameKey: "nittele_name", descriptionKey: "nittele_desc", icon: "icons/nittele.webp", url: "https://news.ntv.co.jp" },
      { name: "Economic Times", nameKey: "economictimes_name", descriptionKey: "economictimes_desc", icon: "icons/economictimes.webp", url: "https://economictimes.indiatimes.com" },
      { name: "Hindustan Times", nameKey: "hindustantimes_name", descriptionKey: "hindustantimes_desc", icon: "icons/hindustantimes.webp", url: "https://www.hindustantimes.com" },
      { name: "DW", nameKey: "dw_name", descriptionKey: "dw_desc", icon: "icons/dw.webp", url: "https://www.dw.com"},
      { name: "Le Monde", nameKey: "lemonde_name", descriptionKey: "lemonde_desc", icon: "icons/lemonde.webp", url: "https://www.lemonde.fr" },
      { name: "New York Times", nameKey: "nyt_name", descriptionKey: "nyt_desc", icon: "icons/wrappers/nytimes.webp", url: "/wrappers/nytimes", apptype: "wrapper" },
      { name: "Washington Post", nameKey: "washingtonpost_name", descriptionKey: "washingtonpost_desc", icon: "icons/wrappers/washingtonpost.webp", url: "/wrappers/washingtonpost", apptype: "wrapper" },
      { name: "Reuters", nameKey: "reuters_name", descriptionKey: "reuters_desc", icon: "icons/wrappers/reuters.webp", url: "/wrappers/reuters", apptype: "wrapper" },
      { name: "CNN", nameKey: "cnn_name", descriptionKey: "cnn_desc", icon: "icons/wrappers/cnn.webp", url: "/wrappers/cnn", apptype: "wrapper" },
      { name: "Fox News", nameKey: "foxnews_name", descriptionKey: "foxnews_desc", icon: "icons/wrappers/foxnews.webp", url: "/wrappers/foxnews", apptype: "wrapper" },
      { name: "USA Today", nameKey: "usatoday_name", descriptionKey: "usatoday_desc", icon: "icons/wrappers/usatoday.webp", url: "/wrappers/usatoday", apptype: "wrapper" },
      { name: "REVCOM.US", nameKey: "revcom_name", descriptionKey: "revcom_desc", icon: "icons/wrappers/revcomus.webp", url: "/wrappers/revcomus", apptype: "wrapper" },
      { name: "Al Jazeera", nameKey: "aljazeera_name", descriptionKey: "aljazeera_desc", icon: "icons/wrappers/aljazeera.webp", url: "/wrappers/aljazeera", apptype: "wrapper" },
      { name: "CGTN", nameKey: "cgtn_name", descriptionKey: "cgtn_desc", icon: "icons/wrappers/cgtn.webp", url: "/wrappers/cgtn", apptype: "wrapper" },
      { name: "CCTV", nameKey: "cctv_name", descriptionKey: "cctv_desc", icon: "icons/wrappers/cctv.webp", url: "/wrappers/cctv", apptype: "wrapper" },
      { name: "Fortune", nameKey: "fortune_name", descriptionKey: "fortune_desc", icon: "icons/wrappers/fortune.webp", url: "/wrappers/fortune", apptype: "wrapper"},
      { name: "ifeng (凤凰网)", nameKey: "ifeng_name", descriptionKey: "ifeng_desc", icon: "icons/wrappers/ifeng.webp", url: "/wrappers/ifeng", apptype: "wrapper" },
      { name: "Tencent News (腾讯新闻)", nameKey: "tencent_name", descriptionKey: "tencent_desc", icon: "icons/tencent_news.webp", url: "https://news.qq.com" },
      { name: "Baidu (百度)", nameKey: "baidu_name", descriptionKey: "baidu_desc", icon: "icons/baidu.webp", url: "https://www.baidu.com" },
      { name: "Sohu (搜狐)", nameKey: "sohu_name", descriptionKey: "sohu_desc", icon: "icons/sohu.webp", url: "https://www.sohu.com" },
      {
        name: "Lianyungang Daily",
        nameKey: "lygdaily_name",
        descriptionKey: "lygdaily_desc",
        icon: "icons/wechatmini/lygdaily.webp",
        url: "#小程序://连云港日报/rxYe5qmyJlJ4Dio",
        apptype: "wechatmini"
      },
    ]
  },
  {
    name: "Fashion",
    nameKey: "fashion_name",
    apps: [
      { name: "InStyle", nameKey: "instyle_name", descriptionKey: "instyle_desc", icon: "icons/instyle.webp", url: "https://www.instyle.com" },
      { name: "ELLE", nameKey: "elle_name", descriptionKey: "elle_desc", icon: "icons/elle.webp", url: "https://www.elle.com" },
    ]
  },
  {
    name: "Entertainment Platform",
    nameKey: "entertainmentplatform_name",
    apps : [
      { name: "AGE Animation (AGE动漫)", nameKey: "age_name", descriptionKey: "age_desc", icon: "icons/ageanimation.webp", url: "https://www.agedm.vip" },
      { name: "Disney+", nameKey: "disneyplus_name", descriptionKey: "disneyplus_desc", icon: "icons/disneyplus.webp", url: "https://www.disneyplus.com" },
      { name: "Hulu", nameKey: "hulu_name", descriptionKey: "hulu_desc", icon: "icons/hulu.webp", url: "https://www.hulu.com" },
      { name: "ViX (vix.com)", nameKey: "vixcom_name", descriptionKey: "vixcom_desc", icon: "icons/vix.webp", url: "https://www.vix.com" },
      { name: "ViX (vix.watch)", nameKey: "vixwatch_name", descriptionKey: "vixwatch_desc", icon: "icons/vix.webp", url: "https://vix.watch" },
      { name: "ESPN", nameKey: "espn_name", descriptionKey: "espn_desc", icon: "icons/espn.webp", url: "https://www.espn.com" },
      { name: "MangaDex", nameKey: "mangadex_name", descriptionKey: "mangadex_desc", icon: "icons/mangadex.webp", url: "https://mangadex.org" },
      { name: "Dubok (独播库)", nameKey: "dubok_name", descriptionKey: "dubok_desc", icon: "icons/dubok.webp", url: "https://www.dubok.tv" },
      { name: "Youku (优酷)", nameKey: "youku_name", descriptionKey: "youku_desc", icon: "icons/youku.webp", url: "https://www.youku.com" },
      { name: "Lightnovel Kingdom (轻之国度)", nameKey: "lightnovel_name", descriptionKey: "lightnovel_desc", icon: "icons/wrappers/lightnovelkingdom.webp", url: "/wrappers/lightnovelkingdom", apptype: "wrapper" },
      { name: "WeChat Read (微信读书)", nameKey: "wechatread_name", descriptionKey: "wechatread_desc", icon: "icons/wrappers/wechatread.webp", url: "/wrappers/wechatread", apptype: "wrapper" },
      { name: "TED", nameKey: "ted_name", descriptionKey: "ted_desc", icon: "icons/wrappers/ted.webp", url: "/wrappers/ted", apptype: "wrapper" },
      { name: "Netflix", nameKey: "netflix_name", descriptionKey: "netflix_desc", icon: "icons/wrappers/netflix.webp", url: "/wrappers/netflix", apptype: "wrapper" }
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
        name: "ClassicGames.gg",
        nameKey: "classicgamesgg_name",
        descriptionKey: "classicgamesgg_desc",
        icon: "icons/classicgamesgg.webp",
        url: "https://classicgames.gg",
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
        name: "Red Alert 2: Chrono Divide",
        nameKey: "chronodivide_name",
        descriptionKey: "chronodivide_desc",
        icon: "icons/wrappers/chronodivide.webp",
        url: "/wrappers/chronodivide",
        apptype: "wrapper"
      },
      {
        name: "MuMu Emulator (MuMu模拟器)",
        nameKey: "mumu_cn_name",
        descriptionKey: "mumu_cn_desc",
        icon: "icons/wrappers/mumu.webp",
        url: "https://mumu.163.com",
        apptype: "wrapper"
      },
      {
        name: "MuMuPlayer",
        nameKey: "mumu_global_name",
        descriptionKey: "mumu_global_desc",
        icon: "icons/wrappers/mumu.webp",
        url: "https://www.mumuplayer.com",
        apptype: "wrapper"
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
        name: "Icy Veins",
        nameKey: "icyveins_name",
        descriptionKey: "icyveins_desc",
        icon: "icons/icyveins.webp",
        url: "https://www.icy-veins.com"
      },
      {
        name: "RaGEZONE",
        nameKey: "ragezone_name",
        descriptionKey: "ragezone_desc",
        icon: "icons/ragezone.webp",
        url: "https://forum.ragezone.com"
      },
      {
        name: "MMO Champion",
        nameKey: "mmochampion_name",
        descriptionKey: "mmochampion_desc",
        icon: "icons/wrappers/mmo-champion.webp",
        url: "/wrappers/mmo-champion",
        apptype: "wrapper"
      },
      {
        name: "Warcraft Logs",
        nameKey: "warcraftlogs_name",
        descriptionKey: "warcraftlogs_desc",
        icon: "icons/wrappers/warcraftlogs.webp",
        url: "/wrappers/warcraftlogs",
        apptype: "wrapper"
      },
      {
        name: "Raider.IO",
        nameKey: "raiderio_name",
        descriptionKey: "raiderio_desc",
        icon: "icons/wrappers/raiderio.webp",
        url: "/wrappers/raiderio",
        apptype: "wrapper"
      },
      {
        name: "MapleStory",
        nameKey: "maplestory_name",
        descriptionKey: "maplestory_desc",
        icon: "icons/wrappers/maplestory.webp",
        url: "/wrappers/maplestory",
        apptype: "wrapper"
      },
      {
        name: "CurseForge",
        nameKey: "curseforge_name",
        descriptionKey: "curseforge_desc",
        icon: "icons/wrappers/curseforge.webp",
        url: "/wrappers/curseforge",
        apptype: "wrapper"
      },
      {
        name: "Minecraft Forum",
        nameKey: "minecraftforum_name",
        descriptionKey: "minecraftforum_desc",
        icon: "icons/wrappers/minecraftforum.webp",
        url: "/wrappers/minecraftforum",
        apptype: "wrapper"
      },
      {
        name: "IGN",
        nameKey: "ign_name",
        descriptionKey: "ign_desc",
        icon: "icons/wrappers/ign.webp",
        url: "/wrappers/ign",
        apptype: "wrapper"
      },
      {
        name: "Wowhead",
        nameKey: "wowhead_name",
        descriptionKey: "wowhead_desc",
        icon: "icons/wrappers/wowhead.webp",
        url: "/wrappers/wowhead",
        apptype: "wrapper"
      },
      {
        name: "World of Warcraft (China)",
        nameKey: "wowchina_name",
        descriptionKey: "wowchina_desc",
        icon: "icons/wow.webp",
        url: "#小程序://魔兽世界/vyIwtNlzGN4iYEz",
        apptype: "wechatmini"
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
      {
        name: "Oxford English Dictionary",
        nameKey: "oed_name",
        descriptionKey: "oed_desc",
        icon: "icons/oed.webp",
        url: "https://www.oed.com"
      },
      {
        name: "Duoreader",
        nameKey: "duoreader_name",
        descriptionKey: "duoreader_desc",
        icon: "icons/duoreader.webp",
        url: "https://web.duoreader.cn"
      },
      {
        name: "Dudianji (读典籍)",
        nameKey: "dudianji_name",
        descriptionKey: "dudianji_desc",
        icon: "icons/dudianji.webp",
        url: "https://web.dudianji.com"
      },
      {
        name: "Xiangyin (乡音)",
        nameKey: "xiangyin_name",
        descriptionKey: "xiangyin_desc",
        icon: "icons/xiangyin.webp",
        url: "https://web.xiangyin.mobi"
      },
      {
        name: "Eudic Dictionary",
        nameKey: "eudic_name",
        descriptionKey: "eudic_desc",
        icon: "icons/wrappers/eudic.webp",
        url: "/wrappers/eudic",
        apptype: "wrapper"
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
        name: "WoWDev wiki",
        nameKey: "wowdevwiki_name",
        descriptionKey: "wowdevwiki_desc",
        icon: "icons/wowdevwiki.webp",
        url: "https://wowdev.wiki"
      },
      {
        name: "Baidu Baike (百度百科)",
        nameKey: "baidubaike_name",
        descriptionKey: "baidubaike_desc",
        icon: "icons/baike.webp",
        url: "https://baike.baidu.com"
      },
      {
        name: "Marxists Internet Archive",
        nameKey: "marxistsorg_name",
        descriptionKey: "marxistsorg_desc",
        icon: "icons/wrappers/marxistsorg.webp",
        url: "/wrappers/marxistsorg",
        apptype: "wrapper"
      },
      {
        name: "OSDev.org",
        nameKey: "osdevorg_name",
        descriptionKey: "osdevorg_desc",
        icon: "icons/wrappers/osdevorg.webp",
        url: "/wrappers/osdevorg",
        apptype: "wrapper"
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
        apptype: "wrapper"
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
        name: "Speedtest by Ookla",
        nameKey: "speedtest_name",
        descriptionKey: "speedtest_desc",
        icon: "icons/speedtest.webp",
        url: "https://www.speedtest.net"
      },
      {
        name: "Basemark Web",
        nameKey: "basemarkweb_name",
        descriptionKey: "basemarkweb_desc",
        icon: "icons/basemarkweb.webp",
        url: "https://web.basemark.com"
      },
      {
        name: "CZNull",
        nameKey: "cznull_name",
        descriptionKey: "cznull_desc",
        icon: "icons/cznull.webp",
        url: "https://cznull.com"
      },
      {
        name: "Redirection.io",
        nameKey: "redirectionio_name",
        descriptionKey: "redirectionio_desc",
        icon: "icons/redirectionio.webp",
        url: "https://redirection.io"
      },
      {
        name: "BrowserBench",
        nameKey: "browserbench_name",
        descriptionKey: "browserbench_desc",
        icon: "icons/wrappers/browserbench.webp",
        url: "/wrappers/browserbench",
        apptype: "wrapper"
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
      {
        name: "SoundCloud",
        nameKey: "soundcloud_name",
        descriptionKey: "soundcloud_desc",
        icon: "icons/soundcloud.webp",
        url: "https://soundcloud.com"
      }
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
        name: "Temu",
        descriptionKey: "temu_desc",
        icon: "icons/temu.webp",
        url: "https://www.temu.com/login.html"
      },
      {
        name: "Shopify",
        nameKey: "shopify_name",
        descriptionKey: "shopify_desc",
        icon: "icons/shopify.webp",
        url: "https://www.shopify.com"
      },
      {
        name: "Dunkin' Donuts",
        nameKey: "dunkindonuts_name",
        descriptionKey: "dunkindonuts_desc",
        icon: "icons/dunkindonuts.webp",
        url: "https://www.dunkindonuts.com"
      },
      {
        name: "Sam's Club",
        nameKey: "samsclub_name",
        descriptionKey: "samsclub_desc",
        icon: "icons/samsclub.webp",
        url: "https://www.samsclub.com"
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
        apptype: "wrapper"
      },
      {
        name: "Target",
        nameKey: "target_name",
        descriptionKey: "target_desc",
        icon: "icons/wrappers/target.webp",
        url: "/wrappers/target",
        apptype: "wrapper"
      },
      {
        name: "The Home Depot",
        nameKey: "homedepot_name",
        descriptionKey: "homedepot_desc",
        icon: "icons/wrappers/homedepot.webp",
        url: "/wrappers/homedepot",
        apptype: "wrapper"
      },
      {
        name: "CVS",
        nameKey: "cvs_name",
        descriptionKey: "cvs_desc",
        icon: "icons/wrappers/cvs.webp",
        url: "/wrappers/cvs",
        apptype: "wrapper"
      },
      {
        name: "Doordash",
        nameKey: "doordash_name",
        descriptionKey: "doordash_desc",
        icon: "icons/wrappers/doordash.webp",
        url: "/wrappers/doordash",
        apptype: "wrapper"
      },
      {
        name: "KFC",
        nameKey: "kfc_name",
        descriptionKey: "kfc_desc",
        icon: "icons/wrappers/kfc.webp",
        url: "/wrappers/kfc",
        apptype: "wrapper"
      },
      {
        name: "Subway",
        nameKey: "subway_name",
        descriptionKey: "subway_desc",
        icon: "icons/wrappers/subway.webp",
        url: "/wrappers/subway",
        apptype: "wrapper"
      },
      {
        name: "McDonald's",
        nameKey: "mcdonalds_name",
        descriptionKey: "mcdonalds_desc",
        icon: "icons/wrappers/mcdonalds.webp",
        url: "/wrappers/mcdonalds",
        apptype: "wrapper"
      },
      {
        name: "Apple Store",
        nameKey: "applestore_name",
        descriptionKey: "applestore_desc",
        icon: "icons/wrappers/apple.webp",
        url: "/wrappers/applestore",
        apptype: "wrapper",
      },
      {
        name: "Apple Retail Store",
        nameKey: "appleretail_name",
        descriptionKey: "appleretail_desc",
        icon: "icons/wrappers/apple.webp",
        url: "/wrappers/appleretail",
        apptype: "wrapper",
      },
      {
        name: "Meituan",
        nameKey: "meituan_name",
        descriptionKey: "meituan_desc",
        icon: "icons/wechatmini/meituan.webp",
        url: "#小程序://美团丨外卖团购特价美食酒店电影/eJ6ozGdCBaK8jrr",
        apptype: "wechatmini"
      },
      {
        name: "Meituan Group Meals",
        nameKey: "meituangroupmeals_name",
        descriptionKey: "meituangroupmeals_desc",
        icon: "icons/wechatmini/meituangroupmeals.webp",
        url: "#小程序://美团拼好饭/zhgDGctIuPeGOzJ",
        apptype: "wechatmini"
      },
      {
        name: "Meituan Waimai",
        nameKey: "meituanwaimai_name",
        descriptionKey: "meituanwaimai_desc",
        icon: "icons/wechatmini/meituanwaimai.webp",
        url: "#小程序://美团外卖丨外卖美食奶茶咖啡水果/CV1C1oMohyBOlhr",
        apptype: "wechatmini"
      },
      {
        name: "Ele.me",
        nameKey: "eleme_name",
        descriptionKey: "eleme_desc",
        icon: "icons/wechatmini/eleme.webp",
        url: "#小程序://饿了么l外卖美食超市买菜水果/P2QafBViNs4CxJv",
        apptype: "wechatmini"
      },
      {
        name: "Pinduoduo",
        nameKey: "pinduoduo_name",
        descriptionKey: "pinduoduo_desc",
        icon: "icons/wechatmini/pinduoduo.webp",
        url: "#小程序://拼多多/DCuif8uSadbMNvd",
        apptype: "wechatmini"
      },
      {
        name: "Xianyu",
        nameKey: "xianyu_name",
        descriptionKey: "xianyu_desc",
        icon: "icons/wechatmini/xianyu.webp",
        url: "#小程序://闲鱼/TUD1i2rz0N9kPiD",
        apptype: "wechatmini"
      },
      {
        name: "Walmart (CN)",
        nameKey: "walmartwechatmini_name",
        descriptionKey: "walmartwechatmini_desc",
        icon: "icons/wrappers/walmart.webp",
        url: "#小程序://沃尔玛/TD4MGupp4fHV50t",
        apptype: "wechatmini"
      },
      {
        name: "Sam's Club (CN)",
        nameKey: "samsclubwechatmini_name",
        descriptionKey: "samsclubwechatmini_desc",
        icon: "icons/samsclub.webp",
        url: "#小程序://山姆会员商店SamsClub/TeZ2pCNStN24TDy",
        apptype: "wechatmini"
      },
      {
        name: "RT-Mart",
        nameKey: "rtmart_name",
        descriptionKey: "rtmart_desc",
        icon: "icons/wechatmini/rtmart.webp",
        url: "#小程序://大润发优鲜/vMKuGAgtVyLvbKb",
        apptype: "wechatmini"
      },
      {
        name: "McDonald's (CN)",
        nameKey: "mcdonaldscn_name",
        descriptionKey: "mcdonaldscn_desc",
        icon: "icons/wrappers/mcdonalds.webp",
        url: "#小程序://麦当劳/EGpDh3ZM8GA27Ju",
        apptype: "wechatmini"
      },
      {
        name: "Luckin Coffee",
        nameKey: "luckin_name",
        descriptionKey: "luckin_desc",
        icon: "icons/wechatmini/luckin.webp",
        url: "#小程序://瑞幸咖啡/yI3YsmuVZEDSN9z",
        apptype: "wechatmini"
      },
      {
        name: "Shouqianba",
        nameKey: "shouqianba_name",
        descriptionKey: "shouqianba_desc",
        icon: "icons/wechatmini/shouqianba.webp",
        url: "#小程序://收钱吧/zCbRYSIBiQ9U4DH",
        apptype: "wechatmini"
      },
      {
        name: "Jingdong",
        nameKey: "jingdong_name",
        descriptionKey: "jingdong_desc",
        icon: "icons/wechatmini/jingdong.webp",
        url: "#小程序://京东购物丨点外卖领国补/pyc18EyQdbRmJkc",
        apptype: "wechatmini"
      },
      {
        name: "Duoduo Maicai",
        nameKey: "duoduomaicai_name",
        descriptionKey: "duoduomaicai_desc",
        icon: "icons/wechatmini/duoduomaicai.webp",
        url: "#小程序://多多买菜/IRSCtliU0KQ5jqw",
        apptype: "wechatmini"
      },
      {
        name: "Dingdong Maicai",
        nameKey: "dingdongmaicai_name",
        descriptionKey: "dingdongmaicai_desc",
        icon: "icons/wechatmini/dingdongmaicai.webp",
        url: "#小程序://叮咚买菜美食水果蔬菜海鲜早餐/dBCM11P15BLgTii",
        apptype: "wechatmini"
      },
      {
        name: "FamilyMart (全家)",
        nameKey: "familymart_name",
        descriptionKey: "familymart_desc",
        icon: "icons/wechatmini/familymart.webp",
        url: "#小程序://全家微会员/6BYag4ry0B2pGsf",
        apptype: "wechatmini"
      },
      {
        name: "Dianping (大众点评)",
        nameKey: "dianping_name",
        descriptionKey: "dianping_desc",
        icon: "icons/wechatmini/dianping.webp",
        url: "#小程序://大众点评美食电影运动旅游门票/vwExEgIYfeAkPBp",
        apptype: "wechatmini"
      },
      {
        name: "Youding (悠订)",
        nameKey: "youding_name",
        descriptionKey: "youding_desc",
        icon: "icons/wechatmini/youding.webp",
        url: "#小程序://悠订/scYn41jTenAGvGc",
        apptype: "wechatmini"
      }
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
        apptype: "wrapper"
      },
      {
        name: "Transit Code",
        nameKey: "transitcode_name",
        descriptionKey: "transitcode_desc",
        icon: "icons/wechatmini/transitcode.webp",
        url: "#小程序://乘车码/bSEajcXCPAVb1op",
        apptype: "wechatmini"
      },
      {
        name: "Railway 12306",
        nameKey: "railway12306_name",
        descriptionKey: "railway12306_desc",
        icon: "icons/wechatmini/railway12306.webp",
        url: "#小程序://铁路12306/9QjwOfcETHvGnKJ",
        apptype: "wechatmini"
      },
      {
        name: "DiDi",
        nameKey: "didi_name",
        descriptionKey: "didi_desc",
        icon: "icons/wechatmini/didi.webp",
        url: "#小程序://滴滴出行丨打车骑行公交租车代驾/vUZE0P6bqzPYwhB",
        apptype: "wechatmini"
      },
      {
        name: "Fengchao",
        nameKey: "fengchao_name",
        descriptionKey: "fengchao_desc",
        icon: "icons/wechatmini/fengchao.webp",
        url: "#小程序://丰巢/AN2aNIAnjejg3Uh",
        apptype: "wechatmini"
      },
      {
        name: "Yijie Refuel",
        nameKey: "yijie_name",
        descriptionKey: "yijie_desc",
        icon: "icons/wechatmini/yijie.webp",
        url: "#小程序://易捷加油/b6claRES3P03VxC",
        apptype: "wechatmini"
      },
      {
        name: "ETC Assistant",
        nameKey: "etc_name",
        descriptionKey: "etc_desc",
        icon: "icons/wechatmini/etc.webp",
        url: "#小程序://ETC助手/KJ7AP2LwPfDSI6z",
        apptype: "wechatmini"
      },
      {
        name: "Haluo Mobility",
        nameKey: "haluo_name",
        descriptionKey: "haluo_desc",
        icon: "icons/wechatmini/haluo.webp",
        url: "#小程序://哈啰/Lht1JKGFukQZhFG",
        apptype: "wechatmini"
      },
      {
        name: "Tencent Maps",
        nameKey: "tencentmaps_name",
        descriptionKey: "tencentmaps_desc",
        icon: "icons/wechatmini/tencentmaps.webp",
        url: "#小程序://腾讯地图丨查路线公交步行搜周边/f3SHk1NIrkaIvet",
        apptype: "wechatmini"
      },
      {
        name: "Didi Qingju",
        nameKey: "didiqingju_name",
        descriptionKey: "didiqingju_desc",
        icon: "icons/wechatmini/didiqingju.webp",
        url: "#小程序://青桔/0hig2G6lGATTQwb",
        apptype: "wechatmini"
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
        name: "Autosport",
        nameKey: "autosport_name",
        descriptionKey: "autosport_desc",
        icon: "icons/autosport.webp",
        url: "https://www.autosport.com"
      },
      {
        name: "Dongchedi",
        nameKey: "dongchedi_name",
        descriptionKey: "dongchedi_desc",
        icon: "icons/dongchedi.webp",
        url: "https://www.dongchedi.com"
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
        apptype: "wrapper"
      },
      {
        name: "Ctrip (携程)",
        nameKey: "ctrip_name",
        descriptionKey: "ctrip_desc",
        icon: "icons/wrappers/ctrip.webp",
        url: "/wrappers/ctrip",
        apptype: "wrapper"
      },
      {
        name: "Tao Piao Piao (淘票票)",
        nameKey: "taopiaopiao_name",
        descriptionKey: "taopiaopiao_desc",
        icon: "icons/wrappers/taopiaopiao.webp",
        url: "/wrappers/taopiaopiao",
        apptype: "wrapper"
      },
      {
        name: "Tao piao piao (淘票票)",
        nameKey: "taopiaopiao_name",
        descriptionKey: "taopiaopiaowechatmini_desc",
        icon: "icons/wrappers/taopiaopiao.webp",
        url: "#小程序://淘票票/fV6lH9S9tKcO2MI",
        apptype: "wechatmini"
      },
      {
        name: "Damai (大麦)",
        nameKey: "damai_name",
        descriptionKey: "damai_desc",
        icon: "icons/wechatmini/damai.webp",
        url: "#小程序://大麦/yI6LM73uPECoBcj",
        apptype: "wechatmini"
      },
      {
        name: "Maoyan (猫眼)",
        nameKey: "maoyan_name",
        descriptionKey: "maoyan_desc",
        icon: "icons/wechatmini/maoyan.webp",
        url: "#小程序://猫眼电影演出玩乐I电影票演唱会/hdPJ0AXmmtd9DJC",
        apptype: "wechatmini"
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
        apptype: "wrapper"
      },
      {
        name: "Auction.com",
        nameKey: "auctioncom_name",
        descriptionKey: "auctioncom_desc",
        icon: "icons/wrappers/auctioncom.webp",
        url: "/wrappers/auctioncom",
        apptype: "wrapper"
      },
      {
        name: "H World Club",
        nameKey: "hworldclub_name",
        descriptionKey: "hworldclub_desc",
        icon: "icons/wechatmini/hworldclub.webp",
        url: "#小程序://华住会酒店预订汉庭全季桔子/wgSElQcmKxKYYLl",
        apptype: "wechatmini"
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
      {
        name: "IGUOPIN",
        nameKey: "iguopin_name",
        descriptionKey: "iguopin_desc",
        icon: "icons/iguopin.webp",
        url: "https://www.iguopin.com",
      },
      {
        name: "CodeSignal",
        nameKey: "codesignal_name",
        descriptionKey: "codesignal_desc",
        icon: "icons/wrappers/codesignal.webp",
        url: "/wrappers/codesignal",
        apptype: "wrapper"
      },
      {
        name: "Remote OK",
        nameKey: "remoteok_name",
        descriptionKey: "remoteok_desc",
        icon: "icons/wrappers/remoteok.webp",
        url: "/wrappers/remoteok",
        apptype: "wrapper"
      },
      {
        name: "BOSS Zhipin",
        nameKey: "bosszhipin_name",
        descriptionKey: "bosszhipin_desc",
        icon: "icons/wechatmini/bosszhipin.webp",
        url: "#小程序://BOSS直聘/OZRCz4jyHJOfBQk",
        apptype: "wechatmini"
      },
      {
        name: "Yupao Zhipin",
        nameKey: "yupaozhipin_name",
        descriptionKey: "yupaozhipin_desc",
        icon: "icons/wechatmini/yupaozhipin.webp",
        url: "#小程序://鱼泡直聘/tu6JXowI0agEQ9I",
        apptype: "wechatmini"
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
    name: "LegalTech",
    nameKey: "legaltech_name",
    apps: [
      {
        name: "Tencent E-Signature",
        nameKey: "tencentesignature_name",
        descriptionKey: "tencentesignature_desc",
        icon: "icons/wechatmini/tencentesignature.webp",
        url: "#小程序://腾讯电子签/Eg1rsQigdCZqxkK",
        apptype: "wechatmini"
      }
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
        name: "Medium",
        nameKey: "medium_name",
        descriptionKey: "medium_desc",
        icon: "icons/medium.webp",
        url: "https://medium.com"
      },
      {
        name: "Qinlili",
        nameKey: "qinlili_name",
        descriptionKey: "qinlili_desc",
        icon: "icons/qinlili.webp",
        url: "https://qinlili.bid" 
      },
      {
        name: "Herb Sutter",
        nameKey: "herbsutter_name",
        descriptionKey: "herbsutter_desc",
        icon: "icons/wrappers/herbsutter.webp",
        url: "/wrappers/herbsutter",
        apptype: "wrapper"
      },
      {
        name: "Bjarne Stroustrup",
        nameKey: "bjarnestroustrup_name",
        descriptionKey: "bjarnestroustrup_desc",
        icon: "icons/wrappers/bjarnestroustrup.webp",
        url: "/wrappers/bjarnestroustrup",
        apptype: "wrapper"
      },
      {
        name: "NVIDIA",
        nameKey: "nvidia_name",
        descriptionKey: "nvidia_desc",
        icon: "icons/wrappers/nvidia.webp",
        url: "/wrappers/nvidia",
        apptype: "wrapper"
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
        apptype: "wrapper"
      },
      {
        name: "USCIS",
        nameKey: "uscis_name",
        icon: "icons/wrappers/uscis.webp",
        url: "/wrappers/uscis",
        descriptionKey: "uscis_desc",
        apptype: "wrapper"
      },
      {
        name: "SSA",
        nameKey: "ssa_name",
        icon: "icons/wrappers/ssa.webp",
        url: "/wrappers/ssa",
        descriptionKey: "ssa_desc",
        apptype: "wrapper"
      },
      {
        name: "TSA",
        nameKey: "tsa_name",
        icon: "icons/wrappers/tsa.webp",
        url: "/wrappers/tsa",
        descriptionKey: "tsa_desc",
        apptype: "wrapper"
      },
      {
        name: "DOS",
        nameKey: "dos_name",
        icon: "icons/wrappers/dos.webp",
        url: "/wrappers/dos",
        descriptionKey: "dos_desc",
        apptype: "wrapper"
      },
      {
        name: "USA.gov",
        nameKey: "usagov_name",
        icon: "icons/wrappers/usagov.webp",
        url: "/wrappers/usagov",
        descriptionKey: "usagov_desc",
        apptype: "wrapper"
      },
      {
        name: "IdentityTheft",
        nameKey: "identitytheft_name",
        icon: "icons/wrappers/identitytheft.webp",
        url: "/wrappers/identitytheft",
        descriptionKey: "identitytheft_desc",
        apptype: "wrapper"
      },
      {
        name: "FTC",
        nameKey: "ftc_name",
        icon: "icons/wrappers/ftc.webp",
        url: "/wrappers/ftc",
        descriptionKey: "ftc_desc",
        apptype: "wrapper"
      },
      {
        name: "FDA",
        nameKey: "fda_name",
        icon: "icons/wrappers/fda.webp",
        url: "/wrappers/fda",
        descriptionKey: "fda_desc",
        apptype: "wrapper"
      },
      {
        name: "FED",
        nameKey: "fed_name",
        icon: "icons/wrappers/fed.webp",
        url: "/wrappers/fed",
        descriptionKey: "fed_desc",
        apptype: "wrapper"
      },
      {
        name: "DOL",
        nameKey: "dol_name",
        icon: "icons/wrappers/dol.webp",
        url: "/wrappers/dol",
        descriptionKey: "dol_desc",
        apptype: "wrapper"
      },
      {
        name: "DOD",
        nameKey: "dod_name",
        icon: "icons/wrappers/dod.webp",
        url: "/wrappers/dod",
        descriptionKey: "dod_desc",
        apptype: "wrapper"
      },
      {
        name: "GSA",
        nameKey: "gsa_name",
        icon: "icons/wrappers/gsa.webp",
        url: "/wrappers/gsa",
        descriptionKey: "gsa_desc",
        apptype: "wrapper"
      },
      {
        name: "DHS",
        nameKey: "dhs_name",
        icon: "icons/wrappers/dhs.webp",
        url: "/wrappers/dhs",
        descriptionKey: "dhs_desc",
        apptype: "wrapper"
      },
      {
        name: "DEA",
        nameKey: "dea_name",
        icon: "icons/wrappers/dea.webp",
        url: "/wrappers/dea",
        descriptionKey: "dea_desc",
        apptype: "wrapper"
      },
      {
        name: "EEOC",
        nameKey: "eeoc_name",
        icon: "icons/wrappers/eeoc.webp",
        url: "/wrappers/eeoc",
        descriptionKey: "eeoc_desc",
        apptype: "wrapper"
      },
      {
        name: "NSA",
        nameKey: "nsa_name",
        icon: "icons/wrappers/nsa.webp",
        url: "/wrappers/nsa",
        descriptionKey: "nsa_desc",
        apptype: "wrapper"
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
        apptype: "wrapper"
      },
      {
        name: "OMB",
        nameKey: "omb_name",
        icon: "icons/wrappers/omb.webp",
        url: "/wrappers/omb",
        descriptionKey: "omb_desc",
        apptype: "wrapper"
      },
      {
        name: "NASA",
        nameKey: "nasa_name",
        icon: "icons/wrappers/nasa.webp",
        url: "/wrappers/nasa",
        descriptionKey: "nasa_desc",
        apptype: "wrapper"
      },
      {
        name: "White House",
        nameKey: "whitehouse_name",
        icon: "icons/wrappers/whitehouse.webp",
        url: "/wrappers/whitehouse",
        descriptionKey: "whitehouse_desc",
        apptype: "wrapper"
      },
      {
        name: "ID.me",
        nameKey: "idme_name",
        icon: "icons/wrappers/idme.webp",
        url: "/wrappers/idme",
        descriptionKey: "idme_desc",
        apptype: "wrapper"
      }
    ]
  },
  {
    name: "Chinese Government🇨🇳",
    nameKey: "cngov_name",
    apps : [
      {
        name: "National Government Service Platform",
        nameKey: "govservice_name",
        descriptionKey: "govservice_desc",
        icon: "icons/wechatmini/govservice.webp",
        url: "#小程序://国家政务服务平台/c2tiC9JVFGWrRbi",
        apptype: "wechatmini"
      },
      {
        name: "Traffic Management 12123",
        nameKey: "traffic12123_name",
        descriptionKey: "traffic12123_desc",
        icon: "icons/wechatmini/traffic12123.webp",
        url: "#小程序://交管12123/G6CGqlbSCKrxnlp",
        apptype: "wechatmini"
      },
      {
        name: "Suishenban",
        nameKey: "suishenban_name",
        descriptionKey: "suishenban_desc",
        icon: "icons/wechatmini/suishenban.webp",
        url: "#小程序://随申办/2bL7Tzu37kdlfRh",
        apptype: "wechatmini"
      },
      {
        name: "12315",
        nameKey: "china12315_name",
        descriptionKey: "china12315_desc",
        icon: "icons/wechatmini/china12315.webp",
        url: "#小程序://12315/bTgvVMQdjPhAHjr",
        apptype: "wechatmini"
      },
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
        apptype: "wrapper"
      }
    ]
  },
  {
    name: "Health & Insurance",
    nameKey: "healthinsurance_name",
    apps : [
      {
        name: "GE HealthCare Digital Expert",
        nameKey: "digitalexpertgehealthcare_name",
        descriptionKey: "digitalexpertgehealthcare_desc",
        icon: "icons/digitalexpertgehealthcare.webp",
        url: "https://digitalexpert.gehealthcare.com",
      },
      {
        name: "Calm",
        nameKey: "calm_name",
        descriptionKey: "calm_desc",
        icon: "icons/calm.webp",
        url: "https://www.calm.com"
      },
      {
        name: "UHS",
        nameKey: "uhs_name",
        descriptionKey: "uhs_desc",
        icon: "icons/wrappers/uhs.webp",
        url: "/wrappers/uhs",
        apptype: "wrapper"
      },
      {
        name: "Delta Dental",
        nameKey: "deltadental_name",
        descriptionKey: "deltadental_desc",
        icon: "icons/wrappers/deltadental.webp",
        url: "/wrappers/deltadental",
        apptype: "wrapper"
      },
      {
        name: "Keep Fitness Assistant",
        nameKey: "keep_name",
        descriptionKey: "keep_desc",
        icon: "icons/wechatmini/keep.webp",
        url: "#小程序://Keep运动助手/uGebbOX0XuWA0Li",
        apptype: "wechatmini"
      },
    ]
  },
  {
    name: "Research",
    nameKey: "research_name",
    apps: [
      {
        name: "Overleaf",
        nameKey: "overleaf_name",
        descriptionKey: "overleaf_desc",
        icon: "icons/overleaf.webp",
        url: "https://www.overleaf.com"
      },
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
        apptype: "wrapper",
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
        apptype: "wrapper"
      },
      {
        name: "Fudan University",
        nameKey: "fudan_name",
        descriptionKey: "fudan_desc",
        icon: "icons/wrappers/fudan.webp",
        url: "/wrappers/fudan",
        apptype: "wrapper"
      },
      {
        name: "Fudan eCard",
        nameKey: "fudanecard_name",
        descriptionKey: "fudanecard_desc",
        icon: "icons/wechatmini/fudanecard.webp",
        url: "#小程序://复旦eCard/HzsZa9axWxC1Zxt",
        apptype: "wechatmini"
      },
      {
        name: "Fudan Alumni Card",
        nameKey: "fudanalumnicard_name",
        descriptionKey: "fudanalumnicard_desc",
        icon: "icons/wechatmini/fudanalumnicard.webp",
        url: "#小程序://复旦校友卡/WkzRPCcrzcjCxTp",
        apptype: "wechatmini"
      },
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
      {
        name: "JavHDPorn",
        nameKey: "javhdporn_name",
        descriptionKey: "javhdporn_desc",
        icon: "icons/wrappers/javhdporn.webp",
        url: "/wrappers/javhdporn",
        apptype: "wrapper"
      },
      {
        name: "avdanyuwiki",
        nameKey: "avdanyuwiki_name",
        descriptionKey: "avdanyuwiki_desc",
        icon: "icons/wrappers/avdanyuwiki.webp",
        url: "/wrappers/avdanyuwiki",
        apptype: "wrapper"
      },
    ]
  }
];
