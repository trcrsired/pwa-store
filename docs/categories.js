export const categories = [
  {
    name: "Fundamental",
    apps: [
      { name: "SnaePlayer", icon: "icons/snaeplayer.webp", url: "https://snaeplayer.com", description: "Lightweight on device music player PWA." },
      { name: "Flow", icon: "icons/flow.webp", url: "https://www.flowoss.com", description: "Browser Based EPUB reader" },
      { name: "TReader", icon: "icons/treader.webp", url: "https://tiansh.github.io/reader", description: "Lightweight text file reader." },
      { name: "WebVideoPlayer", icon: "icons/webvideoplayer.webp", url: "https://webvideoplayer.org", description: "An easy-to-use and very lightweight(<100KB) video player for local video/audio files on desktop platforms, powered by Web technology." },
      { name: "PWA Player (My own toy)", icon: "icons/pwaplayer.webp", url: "https://pwa-player.pages.dev", description: "A demo PWA for me to learn." },
      { name: "Calculator", icon: "icons/calculator.webp", url: "https://chrisdiana.github.io/pwa-calculator", description: "Simple, installable calculator PWA—works offline and optimized for mobile." },
      { name: "Weawow", icon: "icons/weawow.webp", url: "https://weawow.com", description: "Ad-free weather PWA with stunning photo forecasts, detailed hourly & 14-day data, and customizable widgets." },
      { name: "Screen Flashlight", icon: "icons/screenflashlightweb.webp", url: "http://trcrsired.github.io/ScreenFlashlightWeb", description: "A web-based PWA flashlight app" },
    ]
  },
  {
    name: "Chatbots",
    apps : 
    [
      { name: "Microsoft Copilot", icon: "icons/copilot.webp", url: "https://copilot.microsoft.com", description: "Conversational AI by Microsoft—Copilot helps you think, write, and explore with real-time web access and voice support." },
      { name: "DeepSeek", icon: "icons/deepseek.webp", url: "https://deepseek.com", description: "Chinese-developed AI assistant with powerful reasoning and multilingual support—DeepSeek’s PWA offers free access to its flagship models." },
      { name: "ChatGPT", icon: "icons/chatgpt.webp", url: "https://chat.openai.com", description: "OpenAI’s conversational assistant—ChatGPT’s PWA delivers installable access to GPT models, memory, plugins, and voice features." },
      { name: "Google Gemini", icon: "icons/gemini.webp", url: "https://gemini.google.com", description: "Google Gemini is a powerful artificial intelligence (AI) model developed by Google that can understand and generate text, images, videos, and audio. It serves as both a chatbot and the underlying large language model (LLM) that powers it, making it versatile for various applications. Gemini is designed to integrate with Google services, allowing users to interact with their data in Gmail, Google Calendar, and more, enhancing productivity and user experience." },
      { name: "Qwen", icon: "icons/qwen.webp", url: "https://chat.qwen.ai", description: "Multimodal AI by Alibaba—Qwen’s PWA supports chat, image generation, dialect-aware voice synthesis, and deep research tools." },
    ]
  },
	{
    name: "Microsoft Services",
    apps: [
      { name: "Outlook", icon: "icons/outlook.webp", url: "https://outlook.live.com", description: "Webmail and calendar by Microsoft." },
      { name: "OneDrive", icon: "icons/onedrive.webp", url: "https://onedrive.live.com", description: "Cloud storage with robust PWA features." },
      {
        name: "Bing",
        icon: "icons/wrappers/bing.webp",
        url: "./wrappers/bing",
        description: "Microsoft's search engine delivering web, image, video, and map results with integrated AI features and daily visual highlights.",
        wrapper: true
      },
    ]
  },
	{
    name: "Google Services",
    apps: [
      { name: "Google", icon: "icons/google.webp", url: "https://www.google.com", description: "Global search and service hub offering instant access to Search, Gmail, Drive, Translate, and other tools via a fast, unified web interface optimized across devices." },
      { name: "Google Voice", icon: "icons/googlevoice.webp", url: "https://voice.google.com", description: "Get a free U.S. phone number for calls, texts, and voicemail—syncs across devices and works on web or mobile." },
      { name: "Google Maps", icon: "icons/googlemaps.webp", url: "https://maps.google.com", description: "Navigate the world with Google Maps—its PWA lets you find places, get directions, explore nearby businesses, and view real-time traffic, transit, and satellite layers." },
      { name: "Gmail", icon: "icons/wrappers/gmail.webp", url: "./wrappers/gmail", description: "Google's Mail Services", wrapper: true },
    ]
  },
  {
    name: "Office",
    apps: [
      {
        name: "WPS",
        icon: "icons/wrappers/wps.webp",
        url: "./wrappers/wps",
        description: "WPS is an office suite developed by the Chinese company Kingsoft Office Software",
        wrapper: true
      },
      {
        name: "WPS (CN)",
        icon: "icons/wrappers/wps.webp",
        url: "./wrappers/wpscn",
        description: "Chinese localized version of WPS. WPS is an office suite developed by the Chinese company Kingsoft Office Software",
        wrapper: true
      }
    ]
  },
  {
    name: "Programming",
    apps: [
      { name: "Open Web Advocacy", icon: "icons/open-web-advocacy.webp", url: "https://open-web-advocacy.org", description: "We are a group of software engineers from all over the world who have come together to advocate for the future of the open web by providing regulators, legislators and policy makers the intricate technical details that they need to understand the major anti-competitive issues in our industry and how to solve them." },
      { name: "GitHub", icon: "icons/github.webp", url: "https://github.com", description: "Code hosting with PWA support." },
      { name: "Visual Studio Code", icon: "icons/vscode.webp", url: "https://vscode.dev", description: "Online code editor with GitHub integration." },
      { name: "VS Code Insider", icon: "icons/vscode-insiders.webp", url: "https://insiders.vscode.dev", description: "Preview build of Visual Studio Code Web." },
      { name: "v2ray", icon: "icons/v2ray.webp", url: "https://www.v2ray.com", description: "Project V is a set of tools to help you build your own privacy network over internet. The core of Project V, named V2Ray, is responsible for network protocols and communications. It can work alone, as well as combine with other tools." },
      {
        name: "GitLab",
        icon: "icons/gitlab.webp",
        url: "https://gitlab.com",
        description: "DevOps powerhouse with full-stack Git repository management and robust PWA support. Enables seamless code hosting, issue tracking, CI/CD workflows, and real-time collaboration across teams."
      },
      {
        name: "Gitee",
        icon: "icons/gitee.webp",
        url: "https://gitee.com",
        description: "China’s leading code hosting platform with native PWA support. Offers Git-based project management, team collaboration tools, and integrated CI/CD pipelines tailored to local developers and enterprises."
      },
      {
        name: "Stack Overflow",
        icon: "icons/stackoverflow.webp",
        url: "https://stackoverflow.com",
        description: "Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers."
      },
      {
        name: "MDN Web Docs",
        icon: "icons/mdnwebdocs.webp",
        url: "https://developer.mozilla.org",
        description: "MDN Web Docs, previously Mozilla Developer Network and formerly Mozilla Developer Center, is a documentation repository and learning resource for web developers."
      },
      {
        name: "Chrome for developers",
        icon: "icons/chrome.webp",
        url: "https://developer.chrome.com",
        description: "Chrome for Developers is Google's official resource hub for web developers building on the Chrome platform. It offers documentation, tools, and guidance for modern web development, including performance optimization, debugging, and the latest web platform features like WebAssembly, WebGPU, and Progressive Web Apps.",
      },
      {
        name: "Bing Webmaster Tools",
        icon: "icons/wrappers/bing.webp",
        url: "https://www.bing.com/webmasters",
        description: "Bing Webmaster Tools provides website owners with insights into search performance, indexing status, and SEO diagnostics. Monitor traffic, submit sitemaps, and optimize your site for visibility on Bing Search.",
      },
      {
        name: "Python",
        icon: "icons/python.webp",
        url: "https://www.python.org",
        description: "Python is a programming language that lets you work quickly and integrate systems more effectively."
      },
      {
        name: "Rust",
        icon: "icons/rustlang.webp",
        url: "https://www.rust-lang.org",
        description: "A language empowering everyone to build reliable and efficient software."
      },
      {
        name: "ISO C++",
        icon: "icons/wrappers/isocpp.webp",
        url: "./wrappers/isocpp",
        description: "isocpp.org is the official website for the Standard C++ Foundation, which supports the C++ software developer community and promotes the understanding and use of modern Standard C++.",
        wrapper: true
      },
      {
        name: "Linux.die",
        icon: "icons/wrappers/linuxdie.webp",
        url: "./wrappers/linuxdie",
        description: "Extensive archive of Linux documentation, man pages, and HOWTO guides—ideal for developers, sysadmins, and command-line enthusiasts seeking quick reference and deep technical insight.",
        wrapper: true
      },
      {
        name: "Godbolt",
        icon: "icons/wrappers/godbolt.webp",
        url: "./wrappers/godbolt",
        description: "Interactive compiler explorer for C, C++, Rust, and more—visualizing assembly output and comparing optimization across toolchains.",
        wrapper: true
      },
      {
        name: "v86",
        icon: "icons/wrappers/v86.webp",
        url: "./wrappers/v86",
        description: "Virtual x86 emulator running legacy operating systems like Windows 95 and Linux directly in the browser using WebAssembly.",
        wrapper: true
      },
      {
        name: "Free Software Foundations",
        icon: "icons/wrappers/fsf.webp",
        url: "./wrappers/fsf",
        description: "he Free Software Foundation (FSF) is a nonprofit with a worldwide mission to promote computer user freedom.",
        wrapper: true
      },
      {
        name: "GCC MCF",
        icon: "icons/wrappers/lhmouse.webp",
        url: "./wrappers/gccmcf",
        description: "A customized GCC fork for Windows that replaces the standard POSIX thread model with its own minimal C library-based fiber-compatible threading system (MCF).",
        wrapper: true
      },
      {
        name: "GeeksForGeeks",
        icon: "icons/wrappers/geeksforgeeks.webp",
        url: "./wrappers/geeksforgeeks",
        description: "GeeksforGeeks is a comprehensive educational portal that empowers learners across domains.",
        wrapper: true
      },
    ]
  },
  {
    name: "Internet Services",
    apps: [
      {
        name: "Cloudflare",
        icon: "icons/cloudflare.webp",
        url: "https://dash.cloudflare.com",
        description: "Cloudflare is a widely adopted platform that provides networking, security, and performance services to enhance the functionality of websites, applications, and online services. It is used by a diverse range of users, from individual developers to large enterprises, due to its robust features and global infrastructure.",
      }
    ]
  },
  {
    name: "Mail",
    apps: [
      {
        name: "QQ Mail",
        icon: "icons/wrappers/qqmail.webp",
        url: "./wrappers/qqmail",
        wrapper: true,
        description: "QQ Mail is a popular email service from Tencent, offering fast, secure, and mobile-friendly access to personal and enterprise email accounts. It integrates with the broader QQ ecosystem and supports both web and app-based usage."
      },
      {
        name: "163 Mail",
        icon: "icons/wrappers/netease163.webp",
        url: "./wrappers/netease163",
        wrapper: true,
        description: "Netease 163 Mail is one of China's most widely used email platforms, known for its reliability, large storage capacity, and clean interface. It supports both personal and business accounts with mobile and desktop access."
      },
      {
        name: "126 Mail",
        icon: "icons/wrappers/netease126.webp",
        url: "./wrappers/netease126",
        wrapper: true,
        description: "Netease 126 Mail is a sister service to 163 Mail, offering similar features with a distinct domain. It provides stable email access, spam filtering, and seamless integration with Netease’s broader suite of services."
      },
      {
        name: "yeah.net Mail",
        icon: "icons/wrappers/yeahnet.webp",
        url: "./wrappers/yeahnet",
        wrapper: true,
        description: "Netease yeah.net Mail is a sister service to 163 Mail, offering similar features with a distinct domain. It provides stable email access, spam filtering, and seamless integration with Netease’s broader suite of services."
      },
    ]
  },
  {
    name: "Social Media",
    apps: [
      { name: "YouTube", icon: "icons/youtube.webp", url: "https://youtube.com", description: "Video streaming platform by Google." },
      { name: "Reddit", icon: "icons/reddit.webp", url: "https://reddit.com", description: "Community-driven discussion forums." },
      { name: "X (Twitter)", icon: "icons/x.webp", url: "https://x.com", description: "Text-based social updates and chatter." },
      { name: "Instagram", icon: "icons/instagram.webp", url: "https://instagram.com", description: "Image-centric social network." },
      { name: "Facebook", icon: "icons/facebook.webp", url: "https://facebook.com", description: "Meta’s primary social platform." },
      { name: "Tinder", icon: "icons/tinder.webp", url: "https://tinder.com", description: "Swipe-based dating experience." },
      { name: "Bluesky", icon: "icons/bluesky.webp", url: "https://bsky.app", description: "Federated social media alternative." },
      { name: "Twitch", icon: "icons/twitch.webp", url: "https://www.twitch.tv", description: "Live streaming platform for gamers, creators, and communities to interact in real time." },
      { name: "Patreon", icon: "icons/patreon.webp", url: "https://www.patreon.com",  description: "Support creators directly and access exclusive content." },
      {
        name: "Discord",
        icon: "icons/discord.webp",
        url: "https://discord.com/app",
        description: "Voice, video, and text platform for communities, creators, and friends — organized around invite-only servers and topic-based channels."
      },
      {
        name: "Telegram",
        icon: "icons/telegram.webp",
        url: "https://web.telegram.org",
        description: "Cloud-based messaging app offering fast, secure communication with support for large groups, media sharing, and cross-device sync."
      },
      {
        name: "Zoom",
        icon: "icons/zoom.webp",
        url: "https://zoom.us/join",
        description: "Video conferencing platform offering reliable virtual meetings, webinars, screen sharing, and collaboration tools across devices."
      },
      { name: "Hacker News", icon: "icons/hackernews.webp", url: "https://hackernews.com", description: "Tech-savvy and community-driven—Hacker News offers a minimalist PWA experience for discovering and discussing cutting-edge ideas in programming, startups, and science." },
      { name: "Lobsters", icon: "icons/lobsters.webp", url: "https://lobste.rs", description: "Lobsters is a computing-focused community centered around link aggregation and discussion, launched on July 3rd, 2012." },
      {
        name: "Tieba (贴吧)",
        icon: "icons/wrappers/tieba.webp",
        url: "./wrappers/tieba",
        description: "Baidu’s interest-based forum network where users gather in topic-specific bars to share posts, media, and discussions. On mobile, You need to Microsoft Edge with Android by modifying agent string with adding ArkWeb to bypass the check of tieba mini app.",
        wrapper: true
      },
    ]
  },
  {
    name: "Finance",
    apps: [
      { name: "Chase", icon: "icons/chase.webp", url: "https://chase.com", description: "Largest bank in the US." },
      { name: "Bitcoin Well", icon: "icons/bitcoinwell.webp", url: "https://bitcoinwell.com", description: "Enable your independence with the fastest and safest way to buy bitcoin on-chain or via the Lightning Network in Canada and the USA." },
      { name: "East Money (东方财经)", icon: "icons/eastmoney.webp", url: "https://eastmoney.com", description: "Chinese financial media and data portal." },
      { name: "TradingView", icon: "icons/tradingview.webp", url: "https://www.tradingview.com", description: "Advanced market analysis and charts." },
      { name: "Yahoo Finance", icon: "icons/yahoofinance.webp", url: "https://finance.yahoo.com", description: "Global financial news and quotes." },
      { name: "LongForecast", icon: "icons/longforecast.webp", url: "https://longforecast.com", description: "Stock, cryptocurrency and economic forecasts with multi-year trend charts." },
      {
        name: "Paypal",
        icon: "icons/wrappers/paypal.webp",
        url: "./wrappers/paypal",
        description: "PayPal is a global digital payment platform that enables secure online transactions, money transfers, and merchant services for individuals and businesses. It supports personal payments, subscriptions, and e-commerce checkout across millions of sites.",
        wrapper: true
      },
      { name: "Bank of America", icon: "icons/wrappers/bankofamerica.webp", url: "./wrappers/bankofamerica", description: "Major US bank.", wrapper: true },
    ]
  },
  {
    name: "Tech",
    apps: [
      { name: "Windows Central", icon: "icons/windowscentral.webp", url: "https://www.windowscentral.com", description: "Microsoft ecosystem coverage and guides." },
      { name: "Mac Rumors", icon: "icons/macrumors.webp", url: "https://www.macrumors.com", description: "Apple-focused tech reporting and insights." },
      { name: "Android Authority", icon: "icons/androidauthority.webp", url: "https://www.androidauthority.com", description: "News, reviews, and deep dives into Android and Google-related tech." },
      { name: "Tom's Hardware", icon: "icons/tomshardware.webp", url: "https://www.tomshardware.com", description: "In-depth reviews, tech news, and DIY guides for PC enthusiasts and hardware pros." },
      { name: "Ars OpenForum", icon: "icons/ars-open-forum.webp" , url: "https://arstechnica.com/civis", description: "Longstanding tech community hosted by Ars Technica—features flat, chronological discussions across hardware, software, politics, and geek culture. Powered by XenForo, it supports BBCode, Markdown, syntax highlighting, and power-user features like multi-quote, image resizing, and post tracking. A haven for respectful debate and deep dives since 1999."},
      { name: "XDA Forums", icon: "icons/xdaforums.webp" , url: "https://xdaforums.com", description: "XDA Forums is a community for discussion, guides, accessories and development of mobile devices, especially Android."},
      { name: "LINUX DO", icon: "icons/linuxdo.webp", url: "https://linux.do", description: "LINUX DO is a Chinese-language portal focused on Linux news, tutorials, distributions, and open-source development, serving enthusiasts and professionals across the Chinese-speaking tech community." },
    ]
  },
  {
    name: "Software Distributions",
    apps : [
      {
        name: "APKPure",
        icon: "icons/apkpure.webp",
        url: "https://apkpure.com",
        description: "Discover Android apk files",
      },
      {
        name: "Arch Linux AUR",
        icon: "icons/aur.webp",
        url: "https://aur.archlinux.org",
        description: "Explore community-maintained Arch packages.",
      },
      {
        name: "Internet Archive",
        icon: "icons/wrappers/archive.webp",
        url: "./wrappers/archive",
        description: "Internet Archive is a non-profit library of millions of free texts, movies, software, music, websites, and more.",
        wrapper: true
      }
    ]
  },
  {
    name: "News",
    apps: [
      { name: "RT", icon: "icons/rt.webp", url: "https://www.rt.com", description: "Russian international news outlet." },
      { name: "PressTV", icon: "icons/presstv.webp", url: "https://www.presstv.ir", description: "Iranian English-language broadcaster."},
      {
        name: "Firstpost",
        icon: "icons/firstpost.webp",
        url: "https://www.firstpost.com",
        description: "Indian news portal offering coverage across politics, business, sports, and entertainment, with editorial and opinion content."
      },
      {
        name: "PBS",
        icon: "icons/pbs.webp",
        url: "https://www.pbs.org",
        description: "U.S. public broadcaster providing educational, cultural, and documentary programming through a network of member stations."
      },
      { name: "BBC", icon: "icons/bbc.webp", url: "https://www.bbc.com", description: "Global news and media hub—BBC delivers breaking stories, live coverage, and in-depth reporting across politics, culture, and science." },
      {
        name: "Associated Press",
        icon: "icons/associatedpress.webp",
        url: "https://apnews.com",
        description: "The Associated Press is an American not-for-profit news agency headquartered in New York City."
      },
      {
        name: "In Defence of Marxism",
        icon: "icons/indefenseofmarxism.webp",
        url: "https://marxist.com",
        description: "Online platform offering Marxist analysis of global events, political theory, and revolutionary history from a socialist perspective."
      },
      {
        name: "New York Times",
        icon: "icons/wrappers/nytimes.webp",
        url: "./wrappers/nytimes",
        description: "The New York Times (NYT) is an American daily newspaper based in New York City. The New York Times covers domestic, national, and international news, and publishes opinion pieces, investigative reports, and reviews.",
        wrapper: true
      },
      {
        name: "REVCOM.US",
        icon: "icons/wrappers/revcomus.webp",
        url: "./wrappers/revcomus",
        description: "revcom.us is the official website of the Revolutionary Communist Party, USA. It features news, analysis, commentary, and theoretical writings focused on revolutionary change, social justice, and critiques of capitalism and imperialism.",
        wrapper: true
      },
      {
        name: "Al Jazeera",
        icon: "icons/wrappers/aljazeera.webp",
        url: "./wrappers/aljazeera",
        description: "Stream global news and in-depth reporting from Al Jazeera, a leading international broadcaster known for its coverage of Middle Eastern affairs, investigative journalism, and live events.",
        wrapper: true
      },
      {
        name: "CGTN",
        icon: "icons/wrappers/cgtn.webp",
        url: "./wrappers/cgtn",
        description: "Watch international news and cultural programming from CGTN, China’s state-run global broadcaster offering multilingual coverage of world events, business, and geopolitics from a Chinese perspective.",
        wrapper: true
      },
      {
        name: "CCTV",
        icon: "icons/wrappers/cctv.webp",
        url: "./wrappers/cctv",
        description: "China's state-run broadcaster offering news, documentaries, and entertainment across multiple channels and digital platforms.",
        wrapper: true
      },
      {
        name: "Tencent News (腾讯新闻)",
        icon: "icons/tencent_news.webp",
        url: "https://news.qq.com",
        description: "Comprehensive news portal by Tencent featuring top stories, lifestyle articles, and trending reports across China."
      },
      {
        name: "Baidu (百度)",
        icon: "icons/baidu.webp",
        url: "https://www.baidu.com",
        description: "China's leading search engine with integrated news, search results, and app-like browsing experience."
      },
      {
        name: "Sohu (搜狐)",
        icon: "icons/sohu.webp",
        url: "https://www.sohu.com",
        description: "Versatile media and news platform offering editorial coverage, breaking headlines, and multimedia stories."
      },
      {
        name: "Weibo Lite (微博Lite)",
        icon: "icons/weibo.webp",
        url: "https://m.weibo.cn",
        description: "A lightweight, mobile-optimized gateway to China's popular microblogging service, offering quick access to trending posts, hashtags, and celebrity updates."
      },
    ]
  },
  {
    name: "Entertainment Platform",
    apps : [
      { name: "AGE Animation (AGE动漫)", icon: "icons/ageanimation.webp" ,url: "https://www.agedm.vip", description:"Stream and explore a wide range of anime series and movies, updated regularly with Chinese subtitles." },
      { name: "Disney+", icon: "icons/disneyplus.webp" ,url: "https://www.disneyplus.com", description:"Disney+ is an American subscription video on-demand over-the-top streaming media service owned and operated by Disney Streaming, the streaming division of Disney Entertainment, a major business segment of the Walt Disney Company." },
      {
        name: "ViX (vix.com)",
        icon: "icons/vix.webp",
        url: "https://www.vix.com",
        description: "Official PWA-enabled hub for Spanish-language entertainment, ViX features live television, on-demand films, sports, and original shows curated for Hispanic audiences in the U.S. and Latin America."
      },
      {
        name: "ViX (vix.watch)",
        icon: "icons/vix.webp",
        url: "https://vix.watch",
        description: "Alternate entry point to ViX's streaming catalog—providing access to novelas, movies, and series across regions. Ideal for redirect scenarios or geo-targeted user flows."
      },
      {
        name: "ESPN",
        icon: "icons/espn.webp",
        url: "https://www.espn.com",
        description: "Comprehensive sports network—ESPN covers live games, athlete insights, rankings, and analysis across leagues and disciplines."
      },
      {
        name: "Dubok (独播库)",
        icon: "icons/dubok.webp",
        url: "https://www.dubok.tv",
        description: "Dubok is a Chinese streaming site specializing in exclusive and hard-to-find TV dramas, anime, and variety shows. It aggregates content from multiple sources, offering fast updates and a wide selection of subtitled episodes for niche audiences.",
      },
      {
        name: "Youku (优酷)",
        icon: "icons/youku.webp",
        url: "https://www.youku.com",
        description: "Youku Tudou Inc., doing business as Youku, is a video streaming service and former video sharing website based in Beijing, China. It operates as a subsidiary of Alibaba Group Holding Limited."
      },
      {
        name: "Lightnovel Kingdom (轻之国度)",
        icon: "icons/wrappers/lightnovelkingdom.webp",
        url: "./wrappers/lightnovelkingdom",
        description: "One of China’s longest-running light novel communities, offering serialized fan translations, author archives, and anime-inspired literature in a minimalist interface optimized for mobile browsing.",
        wrapper: true
      },
      {
        name: "WeChat Read (微信读书)",
        icon: "icons/wrappers/wechatread.webp",
        url: "./wrappers/wechatread",
        description: "A sleek wrapper for WeChat Read (微信读书), Tencent's official reading platform offering ebooks, social reading insights, and seamless integration with the WeChat ecosystem.",
        wrapper: true
      },
      { name: "TED",
        icon: "icons/wrappers/ted.webp",
        url: "./wrappers/ted",
        description: "TED is a global platform where thinkers, creators, and doers share powerful, concise talks on topics ranging from science and tech to art, education, and social change. Whether it's a mind-blowing discovery or a fresh way to look at the world, TED showcases ideas that inspire and spark conversation.",
        wrapper: true
      },
      { name: "Netflix",
        icon: "icons/wrappers/netflix.webp",
        url: "./wrappers/netflix",
        description: "Netflix is an American subscription video on-demand over-the-top streaming service. The service primarily distributes original and acquired films and television shows from various genres, and it is available internationally in multiple languages.",
        wrapper: true
      },
    ]
  },
  {
    name: "Games",
    apps: [
    	{ name: "GamesLOL", icon: "icons/gameslol.webp", url: "https://en.gameslol.net", description: "GamesLOL is a website that offers a wide range of games in various genres, such as action, adventure, puzzle, sports, and more." },
      { name: "CrazyGames", icon: "icons/crazygames.webp", url: "https://www.crazygames.com", description: "Browser-based games spanning action, puzzle, multiplayer, and more—play instantly without downloads." },
      { name: "Web Gamer", icon: "icons/webgamer.webp", url: "https://webgamer.io", description: "Portal for next-gen web games—play instantly in your browser with no installs required." },
	{
        name: "MuMu Emulator (MuMu模拟器)",
        icon: "icons/wrappers/mumu.webp",
        url: "https://mumu.163.com",
        description: "Chinese-localized version of NetEase’s MuMu Android emulator, designed for domestic users with deep integration into mainland gaming ecosystems and simplified PC-side control.",
        wrapper: true
      },
      {
        name: "MuMuPlayer",
        icon: "icons/wrappers/mumu.webp",
        url: "https://www.mumuplayer.com",
        description: "Global-facing version of MuMu with international download mirrors, multilingual support, and optimized cross-platform emulation for Windows and macOS.",
        wrapper: true
      },
    ]
  },
  {
    name: "Gaming Community",
    apps: [
      { name: "Murlok.io", icon: "icons/murlok.webp", url: "https://murlok.io", description: "WoW talent and build guides." },
      { name: "World of Warcraft Forums (US)", icon: "icons/wow.webp", url: "https://us.forums.blizzard.com/en/wow", description: "Official game portal for WoW." },
      { name: "WoWAnalyzer", icon: "icons/wowanalyzer.webp", url: "https://wowanalyzer.com", description: "Improve your performance with personal feedback and stats. Just enter the link of a Warcraft Logs report." },
      {
        name: "MMO Champion",
        icon: "icons/wrappers/mmo-champion.webp",
        url: "./wrappers/mmo-champion",
        description: "World of Warcraft-focused news and forum hub featuring patch notes, raid strategies, and community discussions.",
        wrapper: true
      },
      {
        name: "Warcraft Logs",
        icon: "icons/wrappers/warcraftlogs.webp",
        url: "./wrappers/warcraftlogs",
        description: "Combat analysis platform for World of Warcraft, offering detailed raid metrics, rankings, and performance breakdowns.",
        wrapper: true
      },
      {
        name: "Raider.IO",
        icon: "icons/wrappers/raiderio.webp",
        url: "./wrappers/raiderio",
        description: "Raider.IO is a World of Warcraft (WoW) Mythic+ and Raid Progression rankings site!",
        wrapper: true
      },
      {
        name: "MapleStory",
        icon: "icons/wrappers/maplestory.webp",
        url: "./wrappers/maplestory",
        description: "Maplestory is one of the oldest MMORPGs out there.",
        wrapper: true
      },
      {
        name: "CurseForge",
        icon: "icons/wrappers/curseforge.webp",
        url: "./wrappers/curseforge",
        description: "CurseForge is a leading platform for discovering, managing, and publishing mods and addons for games like Minecraft, World of Warcraft, and The Sims 4. It supports creators and simplifies modding with a dedicated desktop app.",
        wrapper: true
      },
      {
        name: "Minecraft Forum",
        icon: "icons/wrappers/minecraftforum.webp",
        url: "./wrappers/minecraftforum",
        description: "Minecraft Forum is a long-standing community hub for Minecraft players and modders, offering discussions, tutorials, modpacks, and updates across both Java and Bedrock editions.",
        wrapper: true
      },
    ]
  },
  {
    name: "Learning",
    apps: [
      { name: "Duolingo", icon: "icons/duolingo.webp", url: "https://duolingo.com", description: "Gamified language learning." },
      { name: "Duolingo (多邻国)", icon: "icons/duolingo.webp", url: "https://cn.duolingo.com", description: "Localized Chinese version of Duolingo." }
    ]
  },
  {
    name: "Knowledge & Pedias",
    apps: [
      { name: "Wikipedia", icon: "icons/wikipedia.webp", url: "https://wikipedia.org", description: "Free online encyclopedia." },
      { name: "Baidu Baike (百度百科)", icon: "icons/baike.webp", url: "https://baike.baidu.com", description: "Chinese collaborative knowledge base." },
      { name: "Liquipedia", icon: "icons/liquipedia.webp", url: "https://liquipedia.net", description: "Liquipedia is an online encyclopedia focused on esports."},
      { name: "Marxists Internet Archive", icon: "icons/wrappers/marxistsorg.webp", url: "./wrappers/marxistsorg", description: "Marxists Internet Archive is a non-profit online encyclopedia that hosts a multilingual library (created in 1990) of the works of communist, anarchist, and socialist writers, such as Karl Marx, Friedrich Engels, Vladimir Lenin, Leon Trotsky, Joseph Stalin, Mao Zedong, Rosa Luxemburg, Mikhail Bakunin, Peter Kropotkin, and Pierre-Joseph Proudhon, as well as that of writers of related ideologies, and even unrelated ones (for instance, Sun Tzu). ", wrapper: true},
    ]
  },
  {
    name: "Religion",
    apps: [
      { name: "Quran.com", icon: "icons/qurancom.webp", url: "https://quran.com", description: "Clean, mobile-optimized site for reading and listening to the Quran. Includes translations and tafsir." },
      { name: "YouVersion Bible", icon: "icons/wrappers/biblecom.webp", url: "./wrappers/biblecom", wrapper: true, description: "Offers full text of the Bible in many translations. Includes reading plans, audio, and mobile apps." },
    ]
  },
  {
    name: "Analytics",
    apps: [
      { name: "StatCounter GS", icon: "icons/statcounter.webp", url: "https://gs.statcounter.com", description: "Tracks the Usage Share of Search Engines, Browsers and Operating Systems." },
      { name: "Basemark Web", icon: "icons/basemarkweb.webp", url: "https://web.basemark.com", description: "Basemark Web is a cross-platform benchmark that measures real-world client-side performance of web browsers." },
      { name: "BrowserBench", icon: "icons/wrappers/browserbench.webp", url: "./wrappers/browserbench", description: "MotionMark is a benchmark designed to put browser graphics systems to the test." },
    ]
  },
  {
    name: "Music Streaming",
    apps: [
      { name: "Spotify", icon: "icons/spotify.webp", url: "https://open.spotify.com", description: "Global music streaming platform." },
      { name: "Apple Music", icon: "icons/applemusic.webp", url: "https://music.apple.com", description: "Apple’s premium music service." },
      { name: "YouTube Music", icon: "icons/youtubemusic.webp", url: "https://music.youtube.com", description: "Stream over 100 million songs, albums, remixes, and live performances—YouTube Music’s PWA offers personalized playlists, podcast support, and seamless playback across devices." },
    ]
  },
  {
    name: "Food & Shopping",
    apps: [
      { name: "Starbucks", icon: "icons/starbucks.webp", url: "https://www.starbucks.com", description: "Coffee ordering and loyalty tracking." },
      { name: "Amazon", icon: "icons/amazon.webp", url: "https://www.amazon.com", description: "Shop millions of products, track orders, and manage your account." },
      { name: "Best Buy", icon: "icons/bestbuy.webp", url: "https://www.bestbuy.com", description: "Electronics and appliances retail hub" },
      {
        name: "eBay",
        icon: "icons/ebay.webp",
        url: "https://www.ebay.com",
        description: "Global e-commerce platform—eBay connects buyers and sellers through auctions, fixed-price listings, and curated collections."
      },
      {
        name: "Taobao (淘宝)",
        icon: "icons/taobao.webp",
        url: "https://www.taobao.com",
        description: "A major consumer-to-consumer e-commerce platform in China, Taobao offers a diverse marketplace featuring everything from fashion and electronics to handmade local products. Backed by Alibaba, it’s known for powerful search tools, mobile-first features, and deep integration with logistics and social commerce."
      },
      {
        name: "Walmart",
        icon: "icons/wrappers/walmart.webp",
        url: "./wrappers/walmart",
        description: "Multinational retail giant offering groceries, electronics, apparel, and more through supercenters and online shopping.",
        wrapper: true
      },
      {
        name: "Target",
        icon: "icons/wrappers/target.webp",
        url: "./wrappers/target",
        description: "U.S.-based retail chain offering groceries, electronics, clothing, and home goods—available via superstores and online shopping.",
        wrapper: true
      },
      {
        name: "CVS",
        icon: "icons/wrappers/cvs.webp",
        url: "./wrappers/cvs",
        description: "U.S. pharmacy and retail chain offering prescriptions, health and wellness products, beauty essentials, and everyday groceries—available in-store and online.",
        wrapper: true
      },
      {
        name: "Doordash",
        icon: "icons/wrappers/doordash.webp",
        url: "./wrappers/doordash",
        description: "Food delivery and logistics platform connecting users with restaurants, convenience stores, and groceries—order online or via app for on-demand service.",
        wrapper: true
      },
      {
        name: "KFC",
        icon: "icons/wrappers/kfc.webp",
        url: "./wrappers/kfc",
        description: "Global fast food chain known for its fried chicken—order meals, explore deals, and find locations through its app or website.",
        wrapper: true
      },
      {
        name: "Subway",
        icon: "icons/wrappers/subway.webp",
        url: "./wrappers/subway",
        description: "International sandwich shop offering customizable subs, wraps, and salads—order online, join rewards, and locate stores easily.",
        wrapper: true
      },
      {
        name: "McDonald's",
        icon: "icons/wrappers/mcdonalds.webp",
        url: "./wrappers/mcdonalds",
        description: "World's largest fast food chain serving burgers, fries, breakfast, and beverages—mobile ordering, rewards, and location finder available via app or site.",
        wrapper: true
      },
    ]
  },
  {
    name: "Posting & Transportation",
    apps: [
      { name: "Uber", icon: "icons/uber.webp", url: "https://uber.com", description: "Ride-hailing and delivery platform—book trips, order food, and manage your account via installable PWA." },
      { name: "Amtrak", icon: "icons/amtrak.webp", url: "https://amtrak.com", description: "Book train tickets, check schedules, and track your ride—Amtrak’s PWA offers smooth travel planning across 500+ U.S. destinations." },
      { name: "Delta", icon: "icons/delta.webp", url: "https://delta.com", description: "Manage flights, check in, and track status—Delta’s installable PWA streamlines your journey with mobile-friendly tools and SkyMiles integration." },
      { name: "United Airlines",icon: "icons/united.webp", url: "https://united.com", description: "Book flights, manage reservations, and track travel status—United’s installable PWA connects you to over 300 destinations worldwide with MileagePlus rewards, mobile check-in, and real-time updates." },
      { name: "FlixBus", icon: "icons/flixbus.webp", url: "https://flixbus.com", description: "Explore 1,800+ destinations across the US and beyond—FlixBus’s PWA lets you book tickets, track your ride in real time, and travel comfortably with Wi-Fi, outlets, and extra legroom." },
      { name: "SF Express (顺丰速运)", icon: "icons/shunfeng.webp", url: "https://www.sf-express.com", description: "SF Express—track domestic and international shipments, schedule pickups, and manage delivery services." },
      {
        name: "Jiakaobaodian (驾考宝典)",
        icon: "icons/jiakaobaodian.webp",
        url: "https://www.jiakaobaodian.com",
        description: "China’s leading driving test platform—offers up-to-date question banks, multilingual exam prep, and full-process guidance for learners. On Microsoft Edge for Android, please log in first via the browser. The option to install as a Progressive Web App (PWA) becomes available after authentication."
      },
      {
        name: "USPS",
        icon: "icons/wrappers/usps.webp",
        url: "./wrappers/usps",
        description: "United States Postal Service—track shipments, buy postage, schedule pickups, and access national mailing services and address tools through its official portal.",
        wrapper: true
      },
    ]
  },
  {
    name: "Tickets",
    apps: [
      {
        name: "Tao Piao Piao (淘票票)",
        icon: "icons/wrappers/taopiaopiao.webp",
        url: "./wrappers/taopiaopiao",
        description: "Tao Piao Piao is a leading Chinese movie ticketing platform owned by Alibaba. It offers showtimes, seat selection, and online booking for cinemas across China, along with trailers, reviews, and promotional content for current and upcoming films.",
        wrapper: true
      }
    ]
  },
  {
    name: "Cloud (is someone else's computer)",
    apps: [
      { name: "Linode", icon: "icons/linode.webp", url: "https://www.linode.com", description: "Akamai-powered cloud hosting, VMs, and dev tools." },
      { name: "Azure", icon: "icons/azure.webp", url: "https://portal.azure.com", description: "Azure is the cloud computing platform developed by Microsoft. It offers management, access and development of applications and services to individuals, companies, and governments through its global infrastructure." },
    ]
  },
  {
    name: "Websites & Blogs",
    apps: [
      { name: "WordPress", icon: "icons/wordpress.webp", url: "https://wordpress.org", description: "Open-source content management system—build blogs, websites, and online stores with thousands of themes, plugins, and full customization." },
      {
        name: "Herb Sutter",
        icon: "icons/wrappers/herbsutter.webp",
        url: "./wrappers/herbsutter",
        description: "Herb Sutter (chairman of ISO C++ standard committee WG21)’s personal blog—explore thought-provoking essays, deep dives into modern C++, and insights on programming language evolution. A trusted resource for developers seeking clarity, rigor, and vision in software design.",
        wrapper: true
      },
      {
        name: "nvidia",
        icon: "icons/wrappers/nvidia.webp",
        url: "./wrappers/nvidia",
	description: "NVIDIA is a global leader in artificial intelligence computing and supplies chips for data centers, gaming, and more.",
        wrapper: true
      },
 
    ]
  },
  {
    name: "United States Government🇺🇸",
    apps : [
      {
        name: "IRS",
        icon: "icons/wrappers/irs.webp",
        url: "./wrappers/irs",
        description: "Official site of the U.S. Internal Revenue Service—access tax forms, file returns, track refunds, manage payments, and stay updated on federal tax regulations and news.",
        wrapper: true
      },
      {
        name: "USCIS",
        icon: "icons/wrappers/uscis.webp",
        url: "./wrappers/uscis",
        description: "U.S. Citizenship and Immigration Services—manage immigration applications, check case status, access forms, and explore resources for citizenship, green cards, and asylum.",
        wrapper: true
      },
      {
        name: "SSA",
        icon: "icons/wrappers/ssa.webp",
        url: "./wrappers/ssa",
        description: "Social Security Administration—access retirement, disability, and Medicare benefits, manage your account, and find resources for planning and applying.",
        wrapper: true
      },
      {
        name: "TSA",
        icon: "icons/wrappers/tsa.webp",
        url: "./wrappers/tsa",
        description: "Transportation Security Administration—get travel tips, apply for TSA PreCheck, check airport security wait times, and review prohibited items.",
        wrapper: true
      },
      {
        name: "DOS",
        icon: "icons/wrappers/dos.webp",
        url: "./wrappers/dos",
        description: "U.S. Department of State—apply for passports, review travel advisories, access consular services, and explore foreign policy resources.",
        wrapper: true
      },
      {
        name: "USA.gov",
        icon: "icons/wrappers/usagov.webp",
        url: "./wrappers/usagov",
        description: "USA.gov—official guide to U.S. government services and information. Find benefits, contact agencies, explore topics like taxes, immigration, health, and more—all in one centralized portal.",
        wrapper: true
      },
      {
        name: "IdentityTheft",
        icon: "icons/wrappers/identitytheft.webp",
        url: "./wrappers/identitytheft",
        description: "Federal Trade Commission’s one-stop resource for identity theft victims—report fraud, create a recovery plan, access sample letters, and track progress through personalized steps.",
        wrapper: true
      },
      {
        name: "FTC",
        icon: "icons/wrappers/ftc.webp",
        url: "./wrappers/ftc",
        description: "Federal Trade Commission—protecting consumers and promoting competition through enforcement, education, and advocacy. Access fraud reporting tools, business guidance, and resources on scams, privacy, and identity theft.",
        wrapper: true
      },
      {
        name: "FDA",
        icon: "icons/wrappers/fda.webp",
        url: "./wrappers/fda",
        description: "U.S. Food and Drug Administration—protects public health by ensuring the safety, efficacy, and security of food, drugs, medical devices, cosmetics, and radiation-emitting products. Access recalls, approvals, research, and consumer guidance.",
        wrapper: true
      },
      {
        name: "FED",
        icon: "icons/wrappers/fed.webp",
        url: "./wrappers/fed",
        description: "Central bank of the United States—formulates monetary policy, supervises financial institutions, promotes financial stability, and provides services to the banking system. Access economic data, policy updates, and regulatory resources.",
        wrapper: true
      },
      {
        name: "DOL",
        icon: "icons/wrappers/dol.webp",
        url: "./wrappers/dol",
        description: "U.S. Department of Labor—administers federal labor laws to ensure fair, safe, and healthy working conditions. Access wage standards, unemployment resources, workplace safety guidance, and employment training programs.",
        wrapper: true
      },
      {
        name: "DOD",
        icon: "icons/wrappers/dod.webp",
        url: "./wrappers/dod",
        description: "U.S. Department of Defense—coordinates and supervises the nation's military forces, including the Army, Navy, Air Force, Marines, Space Force, and Coast Guard. Access defense news, policy updates, service member resources, and official publications.",
        wrapper: true
      },
      {
        name: "GSA",
        icon: "icons/wrappers/gsa.webp",
        url: "./wrappers/gsa",
        description: "General Services Administration—manages federal property, procurement, and technology services. Access auctions, contracts, and governmentwide initiatives.",
        wrapper: true
      },
      {
        name: "DHS",
        icon: "icons/wrappers/dhs.webp",
        url: "./wrappers/dhs",
        description: "Department of Homeland Security—protects the U.S. from threats through border security, immigration enforcement, cybersecurity, and emergency response.",
        wrapper: true
      },
      {
        name: "DEA",
        icon: "icons/wrappers/dea.webp",
        url: "./wrappers/dea",
        description: "Drug Enforcement Administration—enforces controlled substance laws, combats drug trafficking, and supports prevention and education efforts.",
        wrapper: true
      },
      {
        name: "EEOC",
        icon: "icons/wrappers/eeoc.webp",
        url: "./wrappers/eeoc",
        description: "Equal Employment Opportunity Commission—enforces laws against workplace discrimination and provides resources for employees and employers.",
        wrapper: true
      },
      {
        name: "NSA",
        icon: "icons/wrappers/nsa.webp",
        url: "./wrappers/nsa",
        description: "National Security Agency—provides signals intelligence and cybersecurity services to protect national security and support military operations.",
        wrapper: true
      },
      {
        name: "CIA",
        icon: "icons/cia.webp",
        url: "https://www.cia.gov",
        description: "Central Intelligence Agency—collects and analyzes foreign intelligence, conducts covert operations, and informs U.S. national security policy.",
      },
      {
        name: "DOJ",
        icon: "icons/wrappers/doj.webp",
        url: "./wrappers/doj",
        description: "Department of Justice—enforces federal law, defends the interests of the U.S., and ensures fair and impartial administration of justice.",
        wrapper: true
      },
      {
        name: "OMB",
        icon: "icons/wrappers/omb.webp",
        url: "./wrappers/omb",
        description: "Office of Management and Budget—oversees federal budget development, agency performance, and regulatory policy across the executive branch.",
        wrapper: true
      },
      {
        name: "NASA",
        icon: "icons/wrappers/nasa.webp",
        url: "./wrappers/nasa",
        description: "National Aeronautics and Space Administration—explores space and aeronautics, conducts scientific research, and leads missions to study Earth, the solar system, and the universe. Access news, images, videos, and live coverage of launches and discoveries.",
        wrapper: true
      },
      {
        name: "White House",
        icon: "icons/wrappers/whitehouse.webp",
        url: "./wrappers/whitehouse",
        description: "Official residence and workplace of the President of the United States—explore executive branch initiatives, press releases, policy updates, and historical archives. Access resources from the Office of the President and stay informed on national priorities.",
        wrapper: true
      },
    ]
  },
  {
    name: "Organizations",
    apps : [
     {
      name: "ISO",
      icon: "icons/iso.webp",
      url: "https://www.iso.org",
      description: "The International Organization for Standardization (ISO) is an independent, non-governmental international organization that develops and publishes global standards across a wide range of industries and sectors to ensure quality, safety, efficiency, and interoperability.",
     },
     {
      name: "Olympics",
      icon: "icons/olympics.webp",
      url: "https://www.iso.org",
      description: "The modern Olympic Games are the world's preeminent international sporting events.",
     },
     {
      name: "UN",
      icon: "icons/wrappers/un.webp",
      url: "./wrappers/un",
      description: "The United Nations (UN) is the only place on Earth where all the world's nations come together to discuss common problems and find shared solutions that benefit all of humanity.",
      wrapper: true
     },
    ]
  },
  {
    name: "Health & Insurance",
    apps : [
      {
        name: "UHS",
        icon: "icons/wrappers/uhs.webp",
        url: "./wrappers/uhs",
        description: "Universal Health Services—hospital management and healthcare provider offering behavioral health, acute care, and medical services across the U.S.",
        wrapper: true
      },
      {
        name: "Delta Dental",
        icon: "icons/wrappers/deltadental.webp",
        url: "./wrappers/deltadental",
        description: "Dental insurance provider serving individuals and employers—manage benefits, find dentists, view claims, and explore oral health resources online.",
        wrapper: true
      },
    ]
  },
  {
    name: "Education",
    apps: [
      {
        name: "Princeton University",
        icon: "icons/princeton.webp",
        url: "https://www.princeton.edu",
        description: "Princeton University is a private Ivy League research university in Princeton, New Jersey. It was founded in 1746 as the College of New Jersey, making it the fourth-oldest institution of higher education in the United States and one of the nine colonial colleges chartered before the American Revolution. Princeton University advances learning through scholarship, research, and teaching of unsurpassed quality, with an emphasis on undergraduate and doctoral education that is distinctive among the world’s great universities. Its educational mission is to prepare students to pursue meaningful lives and to help address the challenges of the future.",
      },
      {
        name: "Binghamton University",
        icon: "icons/wrappers/binghamton_edu.webp",
        url: "./wrappers/binghamton_edu",
        description: "Binghamton University is a world-class institution that offers students a broad, interdisciplinary education with an international perspective and one of the most vibrant research programs in the nation.",
        wrapper: true,
      },
      {
        name: "Fudan University",
        icon: "icons/wrappers/fudan.webp",
        url: "./wrappers/fudan",
        description: "Fudan University is a comprehensive research-oriented university in Shanghai, China, founded in 1905 as the first institution of higher education by a Chinese person.",
        wrapper: true,
      },
    ]
  },
  {
    name: "Adult",
    apps: [
      { name: "Pornhub", icon: "icons/pornhub.webp", url: "https://www.pornhub.com", description: "Adult entertainment portal." },
      { name: "SpankBang", icon: "icons/spankbang.webp", url: "https://spankbang.com", description: "Free adult video streaming site." },
      { name: "Hentai Haven", icon: "icons/hentaihaven.webp", url: "https://hentaihaven.xxx", description: "Hentai-focused adult media platform." },
      { name: "MissAV TV", icon: "icons/missavtv.webp", url: "https://missavtv.com/en", description: "Japanese adult video index." },
      { name: "XNXX.COM", icon: "icons/xnxx.webp", url: "https://www.xnxx.com", description: "XNXX is a Czech-French pornographic video sharing and viewing website. It was founded in 1997 in Paris, with servers and offices in Montreal, Tokyo and Newark." },
      { name: "OnlyFans", icon: "icons/onlyfans.webp", url: "https://onlyfans.com", description: "Subscription-based platform known for exclusive adult and creator content." },
    ]
  }
];
