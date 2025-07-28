export const categories = [
  {
    name: "Fundamental",
    apps: [
      { name: "SnaePlayer", icon: "icons/snaeplayer.png", url: "https://snaeplayer.com", description: "Lightweight on device music player PWA." },
      { name: "Flow", icon: "icons/flow.png", url: "https://www.flowoss.com", description: "Browser Based EPUB reader" },
      { name: "TReader", icon: "icons/treader.png", url: "https://tiansh.github.io/reader", description: "Lightweight text file reader." },
      { name: "WebVideoPlayer", icon: "icons/webvideoplayer.png", url: "https://webvideoplayer.org", description: "An easy-to-use and very lightweight(<100KB) video player for local video/audio files on desktop platforms, powered by Web technology." },
      { name: "PWA Player (My own toy)", icon: "icons/pwaplayer.png", url: "https://trcrsired.github.io/pwa-player", description: "A demo PWA for me to learn." }
    ]
  },
	{
    name: "Microsoft Services",
    apps: [
      { name: "Microsoft Copilot", icon: "icons/copilot.png", url: "https://copilot.microsoft.com", description: "AI companion by Microsoft." },
      { name: "Outlook", icon: "icons/outlook.png", url: "https://outlook.live.com", description: "Webmail and calendar by Microsoft." },
      { name: "OneDrive", icon: "icons/onedrive.png", url: "https://onedrive.live.com", description: "Cloud storage with robust PWA features." },
      {
        name: "Bing",
        icon: "bing/icons/icon.png",
        url: "./bing",
        description: "Microsoft's search engine delivering web, image, video, and map results with integrated AI features and daily visual highlights.",
        wrapper: true
      },
    ]
  },
  {
    name: "Programming",
    apps: [
      { name: "GitHub", icon: "icons/github.png", url: "https://github.com", description: "Code hosting with PWA support." },
      { name: "Visual Studio Code", icon: "icons/vscode.png", url: "https://vscode.dev", description: "Online code editor with GitHub integration." },
      { name: "VS Code Insider", icon: "icons/vscode-insiders.png", url: "https://insiders.vscode.dev", description: "Preview build of Visual Studio Code Web." },
      {
        name: "cppreference",
        icon: "cppreference/icons/icon.png",
        url: "./cppreference",
        description: "Comprehensive online reference for C and C++ programming languages, covering syntax, standard libraries, and compiler support.",
        wrapper: true
      },
      {
        name: "Godbolt",
        icon: "godbolt/icons/icon.png",
        url: "./godbolt",
        description: "Interactive compiler explorer for C, C++, Rust, and more—visualizing assembly output and comparing optimization across toolchains.",
        wrapper: true
      },
      {
        name: "V86",
        icon: "v86/icons/icon.png",
        url: "./v86",
        description: "Virtual x86 emulator running legacy operating systems like Windows 95 and Linux directly in the browser using WebAssembly.",
        wrapper: true
      },

    ]
  },
  {
    name: "Social Media",
    apps: [
      { name: "YouTube", icon: "icons/youtube.png", url: "https://youtube.com", description: "Video streaming platform by Google." },
      { name: "Reddit", icon: "icons/reddit.png", url: "https://reddit.com", description: "Community-driven discussion forums." },
      { name: "X (Twitter)", icon: "icons/x.png", url: "https://x.com", description: "Text-based social updates and chatter." },
      { name: "Instagram", icon: "icons/instagram.png", url: "https://instagram.com", description: "Image-centric social network." },
      { name: "Facebook", icon: "icons/facebook.png", url: "https://facebook.com", description: "Meta’s primary social platform." },
      { name: "Tinder", icon: "icons/tinder.png", url: "https://tinder.com", description: "Swipe-based dating experience." },
      { name: "Bluesky", icon: "icons/bluesky.png", url: "https://bsky.app", description: "Federated social media alternative." },
      { name: "Patreon", icon: "icons/patreon.png", url: "https://www.patreon.com",  description: "Support creators directly and access exclusive content." },
      {
        name: "Discord",
        icon: "icons/discord.png",
        url: "https://discord.com",
        description: "Voice, video, and text platform for communities, creators, and friends — organized around invite-only servers and topic-based channels."
      },
      {
        name: "Telegram",
        icon: "icons/telegram.png",
        url: "https://web.telegram.org",
        description: "Cloud-based messaging app offering fast, secure communication with support for large groups, media sharing, and cross-device sync."
      },
      {
        name: "Tieba (贴吧)",
        icon: "tieba/icons/icon.png",
        url: "./tieba",
        description: "Baidu’s interest-based forum network where users gather in topic-specific bars to share posts, media, and discussions. On mobile, You need to Microsoft Edge with Android by modifying agent string with adding ArkWeb to bypass the check of tieba mini app.",
        wrapper: true
      },
    ]
  },
  {
    name: "Finance",
    apps: [
      { name: "Chase", icon: "icons/chase.png", url: "https://chase.com", description: "Major US bank with PWA support." },
      { name: "Bitcoin Well", icon: "icons/bitcoinwell.png", url: "https://bitcoinwell.com", description: "Crypto tools and payments dashboard." },
      { name: "East Money (东方财经)", icon: "icons/eastmoney.png", url: "https://eastmoney.com", description: "Chinese financial media and data portal." },
      { name: "TradingView", icon: "icons/tradingview.png", url: "https://www.tradingview.com", description: "Advanced market analysis and charts." },
      { name: "Yahoo Finance", icon: "icons/yahoofinance.png", url: "https://finance.yahoo.com", description: "Global financial news and quotes." }
    ]
  },
  {
    name: "Tech",
    apps: [
      { name: "Windows Central", icon: "icons/windowscentral.png", url: "https://windowscentral.com", description: "Microsoft ecosystem coverage and guides." },
      { name: "Mac Rumors", icon: "icons/macrumors.png", url: "https://macrumors.com", description: "Apple-focused tech reporting and insights." }
    ]
  },
  {
    name: "Software Distributions",
    apps : [
      {
        name: "APKPure",
        icon: "icons/apkpure.png",
        url: "https://apkpure.com",
        description: "Discover Android apk files",
      },
      {
        name: "Arch Linux AUR",
        icon: "icons/aur.png",
        url: "https://aur.archlinux.org",
        description: "Explore community-maintained Arch packages.",
      }      
    ]
  },
  {
    name: "News",
    apps: [
      { name: "RT", icon: "icons/rt.png", url: "https://www.rt.com", description: "Russian international news outlet.", wrapper: true },
      { name: "PressTV", icon: "icons/presstv.png", url: "https://www.presstv.ir", description: "Iranian English-language broadcaster.", wrapper: true },
      {
        name: "Firstpost",
        icon: "icons/firstpost.png",
        url: "https://www.firstpost.com",
        description: "Indian news portal offering coverage across politics, business, sports, and entertainment, with editorial and opinion content."
      },
      {
        name: "PBS",
        icon: "icons/pbs.png",
        url: "https://www.pbs.org",
        description: "U.S. public broadcaster providing educational, cultural, and documentary programming through a network of member stations."
      },
      {
        name: "CCTV",
        icon: "cctv/icons/icon.png",
        url: "./cctv",
        description: "China's state-run broadcaster offering news, documentaries, and entertainment across multiple channels and digital platforms.",
        wrapper: true
      },
      {
        name: "In Defence of Marxism",
        icon: "icons/marxist.png",
        url: "https://marxist.com",
        description: "Online platform offering Marxist analysis of global events, political theory, and revolutionary history from a socialist perspective."
      },
    ]
  },
  {
    name: "Gaming Community",
    apps: [
      { name: "Murlok.io", icon: "icons/murlok.png", url: "https://murlok.io", description: "WoW talent and build guides." },
      { name: "World of Warcraft", icon: "icons/wow.png", url: "https://worldofwarcraft.blizzard.com", description: "Official game portal for WoW." },
      {
        name: "MMO-Champion",
        icon: "mmo-champion/icons/icon.png",
        url: "./mmo-champion",
        description: "World of Warcraft-focused news and forum hub featuring patch notes, raid strategies, and community discussions.",
        wrapper: true
      },
    ]
  },
  {
    name: "Learning",
    apps: [
      { name: "Duolingo", icon: "icons/duolingo.png", url: "https://duolingo.com", description: "Gamified language learning." },
      { name: "Duolingo (多邻国)", icon: "icons/duolingocn.png", url: "https://cn.duolingo.com", description: "Localized Chinese version of Duolingo." }
    ]
  },
  {
    name: "Knowledge & Pedias",
    apps: [
      { name: "Wikipedia", icon: "icons/wikipedia.png", url: "https://wikipedia.org", description: "Free online encyclopedia." },
      { name: "Baidu Baike (百度百科)", icon: "icons/baike.png", url: "https://baike.baidu.com", description: "Chinese collaborative knowledge base." }
    ]
  },
  {
    name: "Music Streaming",
    apps: [
      { name: "Spotify", icon: "icons/spotify.png", url: "https://open.spotify.com", description: "Global music streaming platform." },
      { name: "Apple Music", icon: "icons/applemusic.png", url: "https://music.apple.com", description: "Apple’s premium music service." }
    ]
  },
  {
    name: "Food & Groceries",
    apps: [
      { name: "Starbucks", icon: "icons/starbucks.png", url: "https://starbucks.com", description: "Coffee ordering and loyalty tracking." },
      {
        name: "Walmart",
        icon: "walmart/icons/icon.png",
        url: "./walmart",
        description: "Multinational retail giant offering groceries, electronics, apparel, and more through supercenters and online shopping.",
        wrapper: true
      },
    ]
  },
  {
    name: "Adult",
    apps: [
      { name: "Pornhub", icon: "icons/pornhub.png", url: "https://pornhub.com", description: "Adult entertainment portal." },
      { name: "SpankBang", icon: "icons/spankbang.png", url: "https://spankbang.com", description: "Free adult video streaming site." },
      { name: "Hentai Haven", icon: "icons/hentaihaven.png", url: "https://hentaihaven.xxx", description: "Hentai-focused adult media platform." },
      { name: "MissAV", icon: "icons/missav.png", url: "https://missav.com", description: "Japanese adult video index." },
      { name: "OnlyFans", icon: "icons/onlyfans.png", url: "https://onlyfans.com", description: "Subscription-based platform known for exclusive adult and creator content." },
    ]
  }
];
