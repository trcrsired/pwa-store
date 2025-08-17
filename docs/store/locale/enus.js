// locale/enus.js
import { registerLocale } from './localization.js';

const L = {
  "wrapper": "wrapper",
  "fundamental_name": "Fundamental",
  "chabots_name": "Chatbots",
  "cybersecurity_name": "Cybersecurity",
  "scamadviser_desc": "Analyze websites to check for trustworthiness and potential scams.",
  "time_name": "Time",
  "timeis_desc": "Check the current time anywhere in the world with precision.",
  "everytimezone_desc": "Visualize time zones across the globe in a simple layout.",
  "timegov_desc": "Access official U.S. time from the National Institute of Standards and Technology.",
  "stackwatch_desc": "Track vulnerabilities and security updates across software stacks.",
  "microsoft_services_name": "Microsoft Services",
  "msstore_name": "Microsoft Store",
  "msstore_desc": "Microsoft's App Store",
  "mstechcommunity_name": "Microsoft Tech Community",
  "mstechcommunity_desc": "A public platform where IT professionals, developers, and Microsoft experts connect to share insights, ask questions, and explore product news, best practices, and live events.",
  "google_services_name": "Google Services",
  "snaeplayer_desc": "Lightweight on device music player PWA.",
  "flow_desc": "Browser Based EPUB reader",
  "treader_desc": "Lightweight text file reader.",
  "webvideoplayer_desc": "An easy-to-use and very lightweight (<100KB) video player for local video/audio files on desktop platforms, powered by Web technology.",
  "pwaplayer_name": "PWA Player (My own toy)",
  "pwaplayer_desc": "A demo PWA Player for me to learn.",
  "calculator_desc": "Simple, installable calculator PWA—works offline and optimized for mobile.",
  "weawow_desc": "Ad-free weather PWA with stunning photo forecasts, detailed hourly & 14-day data, and customizable widgets.",
  "screenflashlight_desc": "A web-based PWA flashlight app",
  "pwastore_name": "PWA Store",
  "pwastore_desc": "Yeap, this PWA Store itself is also a PWA.", 
  "copilot_desc": "Conversational AI by Microsoft—Copilot helps you think, write, and explore with real-time web access and voice support.",
  "deepseek_desc": "Chinese-developed AI assistant with powerful reasoning and multilingual support—DeepSeek’s PWA offers free access to its flagship models.",
  "chatgpt_desc": "OpenAI’s conversational assistant—ChatGPT’s PWA delivers installable access to GPT models, memory, plugins, and voice features.",
  "gemini_desc": "Google Gemini is a powerful artificial intelligence (AI) model developed by Google that can understand and generate text, images, videos, and audio. It serves as both a chatbot and the underlying large language model (LLM) that powers it, making it versatile for various applications. Gemini is designed to integrate with Google services, allowing users to interact with their data in Gmail, Google Calendar, and more, enhancing productivity and user experience.",
  "qwen_desc": "Multimodal AI by Alibaba—Qwen’s PWA supports chat, image generation, dialect-aware voice synthesis, and deep research tools.",
  "grok_desc": "Grok is a generative artificial intelligence chatbot developed by xAI. It was launched in November 2023 by Elon Musk as an initiative based on the large language model (LLM) of the same name.",
  "outlook_desc": "Webmail and calendar by Microsoft.",
  "onedrive_desc": "Cloud storage with robust PWA features.",
  "bing_name": "Bing",
  "bing_desc": "Microsoft's search engine delivering web, image, video, and map results with integrated AI features and daily visual highlights.",
  "msn_name": "MSN",
  "msn_desc": "A web portal offering news, entertainment, lifestyle content, and access to Microsoft services.",
  "google_desc": "Global search and service hub offering instant access to Search, Gmail, Drive, Translate, and other tools via a fast, unified web interface optimized across devices.",
  "googlevoice_name": "Google Voice",
  "googlevoice_desc": "Get a free U.S. phone number for calls, texts, and voicemail—syncs across devices and works on web or mobile.",
  "googlemaps_name": "Google Maps",
  "googlemaps_desc": "Navigate the world with Google Maps—find places, get directions, explore nearby businesses, and view real-time traffic, transit, and satellite layers.",
  "googlenews_name": "Google News",
  "googlenews_desc": "A news aggregator that organizes headlines from thousands of sources and presents them in a personalized feed.",
  "gmail_desc": "Google's Mail Services",
  "officesuites_name": "Office Suites",
  "wps_desc": "WPS is an office suite developed by the Chinese company Kingsoft Office Software",
  "wpscn_name": "WPS (CN)",
  "wpscn_desc": "Chinese localized version of WPS. WPS is an office suite developed by the Chinese company Kingsoft Office Software",
  "programming_name": "Programming",
  open_web_advocacy_name: "Open Web Advocacy",
  open_web_advocacy_desc: "We are a group of software engineers from all over the world who have come together to advocate for the future of the open web by providing regulators, legislators and policy makers the intricate technical details that they need to understand the major anti-competitive issues in our industry and how to solve them.",

  github_desc: "Code hosting with PWA support.",

  vscode_name: "Visual Studio Code",
  vscode_desc: "Online code editor with GitHub integration.",

  vscode_insider_name: "VS Code Insider",
  vscode_insider_desc: "Preview build of Visual Studio Code Web.",

  v2ray_desc: "Project V is a set of tools to help you build your own privacy network over internet. The core of Project V, named V2Ray, is responsible for network protocols and communications. It can work alone, as well as combine with other tools.",

  gitlab_desc: "DevOps powerhouse with full-stack Git repository management and robust PWA support. Enables seamless code hosting, issue tracking, CI/CD workflows, and real-time collaboration across teams.",

  gitee_desc: "China’s leading code hosting platform with native PWA support. Offers Git-based project management, team collaboration tools, and integrated CI/CD pipelines tailored to local developers and enterprises.",

  stackoverflow_name: "Stack Overflow",
  stackoverflow_desc: "Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.",

  mdn_name: "MDN Web Docs",
  mdn_desc: "MDN Web Docs, previously Mozilla Developer Network and formerly Mozilla Developer Center, is a documentation repository and learning resource for web developers.",

  chrome_dev_name: "Chrome for developers",
  chrome_dev_desc: "Chrome for Developers is Google's official resource hub for web developers building on the Chrome platform. It offers documentation, tools, and guidance for modern web development, including performance optimization, debugging, and the latest web platform features like WebAssembly, WebGPU, and Progressive Web Apps.",

  webdev_desc: "web.dev is a resource hub created by Google to help developers build modern, fast, and accessible websites. It offers tutorials, tools, and best practices for improving site performance, SEO, security, and user experience. Whether you're a beginner or an expert, web.dev provides actionable guidance backed by real-world metrics and open standards.",

  bing_webmaster_name: "Bing Webmaster Tools",
  bing_webmaster_desc: "Bing Webmaster Tools provides website owners with insights into search performance, indexing status, and SEO diagnostics. Monitor traffic, submit sitemaps, and optimize your site for visibility on Bing Search.",

  pwabuilder_name: "PWA Builder",
  pwabuilder_desc: "PWA Builder is an open-source tool developed by Microsoft that simplifies the process of deploying Progressive Web Apps (PWAs).",
  leetcode_name: "LeetCode",
  leetcode_desc: "LeetCode is an online platform offering coding challenges focused on algorithms, data structures, and technical interview preparation.",
  leetcodecn_name: "LeetCode (CN)",
  leetcodecn_desc: "LeetCode (CN) is the localized Chinese version of LeetCode, offering a translated interface, community discussions, and problem solutions tailored for Chinese users.",
  usacotraining_name: "USACO Training Gateway",
  usacotraining_desc: "USACO Training Gateway is an online learning portal from the USA Computing Olympiad, providing progressive programming problems and tutorials.",
  fdroid_name: "F-Droid",
  fdroid_desc: "F-Droid is an installable catalogue of FOSS (Free and Open Source Software) applications for the Android platform. The client makes it easy to browse, install, and keep track of updates on your device.",
  resilientwebdesign_name: "Resilient Web Design",
  resilientwebdesign_desc: "Resilient Web Design is a free, beautifully written web book by Jeremy Keith that explores the foundational principles and philosophies of building robust, future-proof websites.",

  python_desc: "Python is a programming language that lets you work quickly and integrate systems more effectively.",

  rust_desc: "A language empowering everyone to build reliable and efficient software.",

  isocpp_name: "ISO C++",
  isocpp_desc: "isocpp.org is the official website for the Standard C++ Foundation, which supports the C++ software developer community and promotes the understanding and use of modern Standard C++.",

  linuxdie_name: "Linux.die",
  linuxdie_desc: "Extensive archive of Linux documentation, man pages, and HOWTO guides—ideal for developers, sysadmins, and command-line enthusiasts seeking quick reference and deep technical insight.",

  godbolt_desc: "Interactive compiler explorer for C, C++, Rust, and more—visualizing assembly output and comparing optimization across toolchains.",

  v86_desc: "Virtual x86 emulator running legacy operating systems like Windows 95 and Linux directly in the browser using WebAssembly.",
  termux_desc: "Termux is an Android terminal emulator and Linux environment app that works directly with no rooting or setup required. A minimal base system is installed automatically - additional packages are available using the APT package manager.",
  fsf_name: "Free Software Foundations",
  fsf_desc: "The Free Software Foundation (FSF) is a nonprofit with a worldwide mission to promote computer user freedom.",

  gccmcf_name: "GCC MCF",
  gccmcf_desc: "A customized GCC fork for Windows that replaces the standard POSIX thread model with its own minimal C library-based fiber-compatible threading system (MCF).",
  geeksforgeeks_desc: "GeeksforGeeks is a comprehensive educational portal that empowers learners across domains.",
  aurorastore_desc: "An open-source client for Google Play that supports anonymous downloads, app browsing, and update tracking without Google services.",
  cloudflare_desc: "Cloudflare is a widely adopted platform that provides networking, security, and performance services to enhance the functionality of websites, applications, and online services. It is used by a diverse range of users, from individual developers to large enterprises, due to its robust features and global infrastructure.",

  mail_name: "Mail",

  qqmail_name: "QQ Mail",
  qqmail_desc: "QQ Mail is a popular email service from Tencent, offering fast, secure, and mobile-friendly access to personal and enterprise email accounts. It integrates with the broader QQ ecosystem and supports both web and app-based usage.",

  netease163_name: "163 Mail",
  netease163_desc: "Netease 163 Mail is one of China's most widely used email platforms, known for its reliability, large storage capacity, and clean interface. It supports both personal and business accounts with mobile and desktop access.",

  netease126_name: "126 Mail",
  netease126_desc: "Netease 126 Mail is a sister service to 163 Mail, offering similar features with a distinct domain. It provides stable email access, spam filtering, and seamless integration with Netease’s broader suite of services.",

  yeahnet_name: "yeah.net Mail",
  yeahnet_desc: "Netease yeah.net Mail is a sister service to 163 Mail, offering similar features with a distinct domain. It provides stable email access, spam filtering, and seamless integration with Netease’s broader suite of services.",

  socialmedia_name: "Social Media",

  youtube_name: "YouTube",
  youtube_desc: "Video streaming platform by Google.",
  reddit_desc: "Community-driven discussion forums.",
  x_name: "X (Twitter)",
  x_desc: "Text-based social updates and chatter.",
  mastodon_desc: "Mastodon is a free and open-source software that lets you join or create your own server and communicate with anyone across the fediverse.",
  threads_desc: "Threads is a fast, text-first social app by Instagram, designed for sharing thoughts, links, and conversations in real time. Log in with your Instagram account to follow friends, post updates, and join trending discussions—all in a lightweight, installable web experience.",
  instagram_desc: "Image-centric social network.",
  facebook_name: "Facebook",
  facebook_desc: "Meta’s primary social platform.",
  tinder_desc: "Swipe-based dating experience.",
  truthsocial_name: "Truth Social",
  truthsocial_desc: "Truth Social is an alt-tech social media platform owned by Trump Media & Technology Group (TMTG), an American media and technology company majority-owned by U.S. president Donald Trump.",
  bluesky_name: "Bluesky",
  bluesky_desc: "Federated social media alternative.",
  twitch_desc: "Live streaming platform for gamers, creators, and communities to interact in real time.",
  patreon_desc: "Support creators directly and access exclusive content.",
  tumblr_desc: "Tumblr is a microblogging and social media platform founded by David Karp in 2007 and is owned by American company Automattic. The service allows users to post multimedia and other content to a short-form blog.",
  elk_desc: "Elk is a nimble Mastodon web client with a clean and modern interface, support for multiple accounts, posting in rich text, and more. Plus, it's free and open source!",
  groupme_desc: "GroupMe — the free and simple way to stay in touch with friends and family, quickly and easily",
  discord_desc: "Voice, video, and text platform for communities, creators, and friends — organized around invite-only servers and topic-based channels.",
  telegram_name: "Telegram",
  telegram_desc: "Cloud-based messaging app offering fast, secure communication with support for large groups, media sharing, and cross-device sync.",
  zoom_desc: "Video conferencing platform offering reliable virtual meetings, webinars, screen sharing, and collaboration tools across devices.",
  hackernews_name: "Hacker News",
  hackernews_desc: "Tech-savvy and community-driven—Hacker News offers a minimalist PWA experience for discovering and discussing cutting-edge ideas in programming, startups, and science.",
  lobsters_desc: "Lobsters is a computing-focused community centered around link aggregation and discussion, launched on July 3rd, 2012.",
  flipboard_name: "Flipboard",
  flipboard_desc: "Flipboard is a news aggregator and social network aggregation company based in Palo Alto, California, with offices in New York, Vancouver, and Beijing.",
  pinterest_name: "Pinterest",
  pinterest_desc: "Pinterest is your visual discovery engine for finding ideas like recipes, home and style inspiration, and more. Save what you love, organize your finds, and explore endless creativity from around the world.",
  zoosk_name: "Zoosk",
  zoosk_desc: "Zoosk is a popular online dating platform that uses behavioral matchmaking technology to connect singles worldwide. With a user-friendly interface and smart matching features, Zoosk helps people find meaningful relationships in a fun and secure environment.",
  tieba_name: "Tieba (贴吧)",
  tieba_desc: "Baidu’s interest-based forum network where users gather in topic-specific bars to share posts, media, and discussions. On mobile, you need to use Microsoft Edge with Android and modify the agent string by adding ArkWeb to bypass the Tieba mini app check.",

  finance_name: "Finance",

  chase_name: "Chase",
  chase_desc: "Largest bank in the US.",

  bitcoinwell_name: "Bitcoin Well",
  bitcoinwell_desc: "Enable your independence with the fastest and safest way to buy bitcoin on-chain or via the Lightning Network in Canada and the USA.",

  eastmoney_name: "East Money (东方财经)",
  eastmoney_desc: "Chinese financial media and data portal.",

  tradingview_name: "TradingView",
  tradingview_desc: "Advanced market analysis and charts.",

  yahoofinance_name: "Yahoo Finance",
  yahoofinance_desc: "Global financial news and quotes.",

  longforecast_name: "LongForecast",
  longforecast_desc: "Stock, cryptocurrency and economic forecasts with multi-year trend charts.",

  investing_name: "Investing",
  investing_desc: "Track global financial markets, view real-time quotes, and explore news, analysis, and tools for stocks, forex, crypto, and more.",

  paypal_name: "PayPal",
  paypal_desc: "PayPal is a global digital payment platform that enables secure online transactions, money transfers, and merchant services for individuals and businesses. It supports personal payments, subscriptions, and e-commerce checkout across millions of sites.",
  moomoo_name: "Moomoo",
  moomoo_desc: "Trade U.S., Hong Kong, and China stocks with real-time data and advanced tools. Analyze markets, manage portfolios, and access financial news.",
  bankofamerica_name: "Bank of America",
  bankofamerica_desc: "Major US bank.",

  tech_key: "Tech",

  windowscentral_name: "Windows Central",
  windowscentral_desc: "Microsoft ecosystem coverage and guides.",

  macrumors_name: "MacRumors",
  macrumors_desc: "Apple-focused tech reporting and insights.",

  androidauthority_name: "Android Authority",
  androidauthority_desc: "News, reviews, and deep dives into Android and Google-related tech.",

  tomshardware_name: "Tom's Hardware",
  tomshardware_desc: "In-depth reviews, tech news, and DIY guides for PC enthusiasts and hardware pros.",

  arsopenforum_name: "Ars OpenForum",
  arsopenforum_desc: "Longstanding tech community hosted by Ars Technica—features flat, chronological discussions across hardware, software, politics, and geek culture. Powered by XenForo, it supports BBCode, Markdown, syntax highlighting, and power-user features like multi-quote, image resizing, and post tracking. A haven for respectful debate and deep dives since 1999.",

  xdaforums_name: "XDA Forums",
  xdaforums_desc: "XDA Forums is a community for discussion, guides, accessories and development of mobile devices, especially Android.",
  fdroidforum_name: "F-Droid Forum",
  fdroidforum_desc: "The official community forum for F-Droid users and developers to discuss apps, issues, and ideas.",
  appleinsider_name: "AppleInsider",
  appleinsider_desc: "A news site focused on Apple products, rumors, reviews, and industry analysis.",

  pcmag_name: "PCMag",
  pcmag_desc: "A technology publication offering reviews, buying guides, and analysis of consumer electronics and software.",

  zdnet_name: "ZDNET",
  zdnet_desc: "ZDNET is a business technology news website owned by Ziff Davis. It provides expert insights on innovations, trends, and products for professionals in IT, business, and digital transformation.",
  techspot_desc: "TechSpot is a technology news and analysis site that covers computing, software, hardware, and the digital industry. It’s trusted by tech enthusiasts and professionals for its in-depth reviews and timely reporting.",
  linuxdo_name: "LINUX DO",
  linuxdo_desc: "LINUX DO is a Chinese-language portal focused on Linux news, tutorials, distributions, and open-source development, serving enthusiasts and professionals across the Chinese-speaking tech community.",

  internetservices_name: "Internet Services",
  softwaredistributions_name: "Software Distributions",

  apkpure_name: "APKPure",
  apkpure_desc: "Discover Android apk files.",

  aur_name: "Arch Linux AUR",
  aur_desc: "Explore community-maintained Arch packages.",

  archive_name: "Internet Archive",
  archive_desc: "Internet Archive is a non-profit library of millions of free texts, movies, software, music, websites, and more.",
  mediatools_name: "Media Tools",
  postimages_name: "Postimages",
  postimages_desc: "Postimages is a free image hosting service designed for fast, anonymous uploads. Users can drag and drop images, generate direct links, and embed them in forums, blogs, or websites—no registration required.",
  news_name: "News",
  rt_name: "RT",
  rt_desc: "Russian international news outlet.",

  presstv_name: "PressTV",
  presstv_desc: "Iranian English-language broadcaster.",

  bloomberg_name: "Bloomberg",
  bloomberg_desc: "Global financial media company delivering real-time market data, business news, and economic analysis.",

  firstpost_name: "Firstpost",
  firstpost_desc: "Indian news portal offering coverage across politics, business, sports, and entertainment, with editorial and opinion content.",

  forbes_name: "Forbes",
  forbes_desc: "Global media outlet known for business news, financial insights, and influential rankings like the Forbes Billionaires List.",

  pbs_name: "PBS",
  pbs_desc: "U.S. public broadcaster providing educational, cultural, and documentary programming through a network of member stations.",

  bbc_name: "BBC",
  bbc_desc: "Global news and media hub—BBC delivers breaking stories, live coverage, and in-depth reporting across politics, culture, and science.",

  ap_name: "Associated Press",
  ap_desc: "The Associated Press is an American not-for-profit news agency headquartered in New York City.",
  independent_name: "The Independent",
  independent_desc: "A UK-based news outlet offering global coverage on politics, culture, and current affairs.",
  theguardian_name: "The Guardian",
  theguardian_desc: "A British news organization known for progressive journalism and in-depth reporting on global issues, politics, and the environment.",
  cnn_name: "CNN",
  cnn_desc: "A major American news network delivering coverage of global events, politics, and breaking news.",
  foxnews_name: "Fox News",
  foxnews_desc: "A U.S. news channel known for its coverage of politics, current events, and opinion programming.",
  usatoday_name: "USA Today",
  usatoday_desc: "A national American newspaper offering news, lifestyle, and entertainment coverage across digital and print platforms.",

  marxism_name: "In Defence of Marxism",
  marxism_desc: "Online platform offering Marxist analysis of global events, political theory, and revolutionary history from a socialist perspective.",

  abcnews_name: "ABC News",
  abcnews_desc: "U.S. news organization providing national and international coverage across politics, health, business, and culture.",

  usnews_name: "US News",
  usnews_desc: "A leading American media outlet known for its rankings, analysis, and coverage of education, health, politics, and national affairs.",
  cbsnews_name: "CBS News",
  cbsnews_desc: "A U.S. news organization providing live coverage, investigative journalism, and in-depth reporting on national and global events.",
  nbc_name: "NBC",
  nbc_desc: "The National Broadcasting Company is the oldest major broadcast network in the U.S., known for its iconic peacock logo and a wide range of news, entertainment, and sports programming.",
  cnbc_name: "CNBC",
  cnbc_desc: "An American business news channel providing real-time coverage of financial markets, economic trends, and investment insights.",
  msnbc_name: "MSNBC",
  msnbc_desc: "A U.S. news network offering political analysis, breaking news, and commentary on current affairs.",
  thehill_name: "The Hill",
  thehill_desc: "The Hill, formed in 1994, is an American newspaper and digital media company based in Washington, D.C. Focusing on politics, policy, business and international relations, The Hill's coverage includes the U.S. Congress, the presidency and executive branch, and election campaigns.",
  nittele_name: "Nippon TV NEWS (日テレNEWS)",
  nittele_desc: "A Japanese-language news network operated by Nippon TV, offering 24-hour coverage of domestic news, weather, and emergency alerts.",

  nyt_name: "New York Times",
  nyt_desc: "The New York Times (NYT) is an American daily newspaper based in New York City. The New York Times covers domestic, national, and international news, and publishes opinion pieces, investigative reports, and reviews.",

  reuters_name: "Reuters",
  reuters_desc: "An international news organization known for timely, unbiased reporting across politics, business, and global affairs.",

  revcom_name: "REVCOM.US",
  revcom_desc: "revcom.us is the official website of the Revolutionary Communist Party, USA. It features news, analysis, commentary, and theoretical writings focused on revolutionary change, social justice, and critiques of capitalism and imperialism.",

  aljazeera_name: "Al Jazeera",
  aljazeera_desc: "Stream global news and in-depth reporting from Al Jazeera, a leading international broadcaster known for its coverage of Middle Eastern affairs, investigative journalism, and live events.",

  cgtn_name: "CGTN",
  cgtn_desc: "Watch international news and cultural programming from CGTN, China’s state-run global broadcaster offering multilingual coverage of world events, business, and geopolitics from a Chinese perspective.",

  cctv_name: "CCTV",
  cctv_desc: "China's state-run broadcaster offering news, documentaries, and entertainment across multiple channels and digital platforms.",

  fortune_name: "Fortune",
  fortune_desc: "A global business media brand known for its rankings like the Fortune 500 and Global 500, offering in-depth coverage of corporate leadership, finance, and economic trends.",

  ifeng_name: "ifeng (凤凰网)",
  ifeng_desc: "Comprehensive Chinese news portal offering coverage of current affairs, finance, culture, and global events.",

  tencent_name: "Tencent News (腾讯新闻)",
  tencent_desc: "Comprehensive news portal by Tencent featuring top stories, lifestyle articles, and trending reports across China.",

  baidu_name: "Baidu (百度)",
  baidu_desc: "China's leading search engine with integrated news, search results, and app-like browsing experience.",

  sohu_name: "Sohu (搜狐)",
  sohu_desc: "Versatile media and news platform offering editorial coverage, breaking headlines, and multimedia stories.",

  weibo_name: "Weibo Lite (微博Lite)",
  weibo_desc: "A lightweight, mobile-optimized gateway to China's popular microblogging service, offering quick access to trending posts, hashtags, and celebrity updates.",
  entertainmentplatform_name: "Entertainment Platform",
  
  age_name: "AGE Animation (AGE动漫)",
  age_desc: "Stream and explore a wide range of anime series and movies, updated regularly with Chinese subtitles.",

  disneyplus_name: "Disney+",
  disneyplus_desc: "Disney+ is an American subscription video on-demand over-the-top streaming media service owned and operated by Disney Streaming, the streaming division of Disney Entertainment, a major business segment of the Walt Disney Company.",

  vixcom_name: "ViX (vix.com)",
  vixcom_desc: "Official PWA-enabled hub for Spanish-language entertainment, ViX features live television, on-demand films, sports, and original shows curated for Hispanic audiences in the U.S. and Latin America.",

  vixwatch_name: "ViX (vix.watch)",
  vixwatch_desc: "Alternate entry point to ViX's streaming catalog—providing access to novelas, movies, and series across regions. Ideal for redirect scenarios or geo-targeted user flows.",

  espn_name: "ESPN",
  espn_desc: "Comprehensive sports network—ESPN covers live games, athlete insights, rankings, and analysis across leagues and disciplines.",

  dubok_name: "Dubok (独播库)",
  dubok_desc: "Dubok is a Chinese streaming site specializing in exclusive and hard-to-find TV dramas, anime, and variety shows. It aggregates content from multiple sources, offering fast updates and a wide selection of subtitled episodes for niche audiences.",

  youku_name: "Youku (优酷)",
  youku_desc: "Youku Tudou Inc., doing business as Youku, is a video streaming service and former video sharing website based in Beijing, China. It operates as a subsidiary of Alibaba Group Holding Limited.",

  lightnovel_name: "Lightnovel Kingdom (轻之国度)",
  lightnovel_desc: "One of China’s longest-running light novel communities, offering serialized fan translations, author archives, and anime-inspired literature in a minimalist interface optimized for mobile browsing.",

  wechatread_name: "WeChat Read (微信读书)",
  wechatread_desc: "A sleek wrapper for WeChat Read (微信读书), Tencent's official reading platform offering ebooks, social reading insights, and seamless integration with the WeChat ecosystem.",

  ted_name: "TED",
  ted_desc: "TED is a global platform where thinkers, creators, and doers share powerful, concise talks on topics ranging from science and tech to art, education, and social change. Whether it's a mind-blowing discovery or a fresh way to look at the world, TED showcases ideas that inspire and spark conversation.",

  netflix_name: "Netflix",
  netflix_desc: "Netflix is an American subscription video on-demand over-the-top streaming service. The service primarily distributes original and acquired films and television shows from various genres, and it is available internationally in multiple languages.",

  games_name: "Games",

  gameslol_name: "GamesLOL",
  gameslol_desc: "GamesLOL is a website that offers a wide range of games in various genres, such as action, adventure, puzzle, sports, and more.",
  classicgamesgg_name: "ClassicGames.gg",
  classicgamesgg_desc: "Play classic games online for free! Enjoy hundreds of retro arcade, console, and PC games right in your browser—no downloads needed. Relive the nostalgia now!",
  crazygames_name: "CrazyGames",
  crazygames_desc: "Browser-based games spanning action, puzzle, multiplayer, and more—play instantly without downloads.",

  webgamer_name: "Web Gamer",
  webgamer_desc: "Portal for next-gen web games—play instantly in your browser with no installs required.",
  chronodivide_name: "RA2: Chrono Divide",
  chronodivide_desc: "RA2: Chrono Divide is a fan-made, browser-based tribute to the classic Command & Conquer: Red Alert 2. It faithfully recreates the real-time strategy experience with smooth online multiplayer, iconic units, and nostalgic visuals—all without needing to install a thing. Whether you're commanding Soviet forces or leading Allied troops, Chrono Divide lets you relive the tactical thrill of chrono technology and battlefield domination, right from your browser.",
  mumu_cn_name: "MuMu Emulator (MuMu模拟器)",
  mumu_cn_desc: "Chinese-localized version of NetEase’s MuMu Android emulator, designed for domestic users with deep integration into mainland gaming ecosystems and simplified PC-side control.",

  mumu_global_name: "MuMuPlayer",
  mumu_global_desc: "Global-facing version of MuMu with international download mirrors, multilingual support, and optimized cross-platform emulation for Windows and macOS.",

  gamingcommunity_name: "Gaming Community",
  murlok_name: "Murlok.io",
  murlok_desc: "WoW talent and build guides.",
  wowforums_name: "World of Warcraft Forums (US)",
  wowforums_desc: "Official game portal for WoW.",
  wowanalyzer_name: "WoWAnalyzer",
  wowanalyzer_desc: "Improve your performance with personal feedback and stats. Just enter the link of a Warcraft Logs report.",
  ragezone_name: "RaGEZONE",
  ragezone_desc: "RaGEZONE is a veteran online forum focused on MMORPG development, private server emulation, and game modding. It hosts a wide range of resources including server files, tutorials, and technical discussions for games like MU Online, MapleStory, and Ragnarok. With a strong developer community and active user base, RaGEZONE serves as a hub for enthusiasts exploring game customization and reverse engineering.",
  mmochampion_name: "MMO Champion",
  mmochampion_desc: "World of Warcraft-focused news and forum hub featuring patch notes, raid strategies, and community discussions.",
  warcraftlogs_name: "Warcraft Logs",
  warcraftlogs_desc: "Combat analysis platform for World of Warcraft, offering detailed raid metrics, rankings, and performance breakdowns.",
  raiderio_name: "Raider.IO",
  raiderio_desc: "Raider.IO is a World of Warcraft (WoW) Mythic+ and Raid Progression rankings site!",
  maplestory_name: "MapleStory",
  maplestory_desc: "Maplestory is one of the oldest MMORPGs out there.",
  curseforge_name: "CurseForge",
  curseforge_desc: "CurseForge is a leading platform for discovering, managing, and publishing mods and addons for games like Minecraft, World of Warcraft, and The Sims 4. It supports creators and simplifies modding with a dedicated desktop app.",
  minecraftforum_name: "Minecraft Forum",
  minecraftforum_desc: "Minecraft Forum is a long-standing community hub for Minecraft players and modders, offering discussions, tutorials, modpacks, and updates across both Java and Bedrock editions.",
  ign_name: "IGN",
  ign_desc: "A media outlet covering video games, entertainment, and pop culture through reviews, news, and original content.",

  learning_name: "Learning",
  duolingo_global_name: "Duolingo",
  duolingo_global_desc: "Gamified language learning.",
  duolingo_cn_name: "Duolingo (多邻国)",
  duolingo_cn_desc: "Localized Chinese version of Duolingo.",

  forums_name: "Forums",

  incelsis_name: "Incel.is",
  incelsis_desc: "Incel.is is an online discussion forum centered around the incel subculture. It provides a space for users to share perspectives, engage in dialogue, and explore topics related to romantic exclusion, social dynamics, and identity.",

  fourchan_name: "4chan",
  fourchan_desc: "4chan is an anonymous imageboard platform where users share images and text across a wide range of topic-specific boards. It supports real-time discussions on subjects such as technology, anime, video games, fitness, politics, and more. Posts are typically short-lived, and the site emphasizes anonymity and open participation without user accounts.",

  knowledgespedia_name: "Knowledge & Pedias",

  wikipedia_name: "Wikipedia",
  wikipedia_desc: "Free online encyclopedia.",

  baidubaike_name: "Baidu Baike (百度百科)",
  baidubaike_desc: "Chinese collaborative knowledge base.",

  liquipedia_name: "Liquipedia",
  liquipedia_desc: "Liquipedia is an online encyclopedia focused on esports.",

  incelwiki_name: "Incel Wiki",
  incelwiki_desc: "Incel Wiki is a community-curated encyclopedia focused on the incel subculture—short for \"involuntary celibate.\"",

  marxistsorg_name: "Marxists Internet Archive",
  marxistsorg_desc: "Marxists Internet Archive is a non-profit online encyclopedia that hosts a multilingual library (created in 1990) of the works of communist, anarchist, and socialist writers, such as Karl Marx, Friedrich Engels, Vladimir Lenin, Leon Trotsky, Joseph Stalin, Mao Zedong, Rosa Luxemburg, Mikhail Bakunin, Peter Kropotkin, and Pierre-Joseph Proudhon, as well as that of writers of related ideologies, and even unrelated ones (for instance, Sun Tzu).",

  religion_name: "Religion",

  qurancom_name: "Quran.com",
  qurancom_desc: "Clean, mobile-optimized site for reading and listening to the Quran. Includes translations and tafsir.",

  biblecom_name: "YouVersion Bible",
  biblecom_desc: "Offers full text of the Bible in many translations. Includes reading plans, audio, and mobile apps.",

  analytics_name: "Analytics",

  pwastats_name: "PWA Stats",
  pwastats_desc: "PWA Stats is a curated dashboard showcasing the impact of Progressive Web Apps across industries, with real-world case studies, performance metrics, and adoption trends.",

  statcounter_name: "StatCounter GS",
  statcounter_desc: "Tracks the Usage Share of Search Engines, Browsers and Operating Systems.",

  basemarkweb_name: "Basemark Web",
  basemarkweb_desc: "Basemark Web is a cross-platform benchmark that measures real-world client-side performance of web browsers.",

  browserbench_name: "BrowserBench",
  browserbench_desc: "MotionMark is a benchmark designed to put browser graphics systems to the test.",

  musicstreaming_name: "Music Streaming",
  spotify_name: "Spotify",
  spotify_desc: "Global music streaming platform.",

  applemusic_name: "Apple Music",
  applemusic_desc: "Apple’s premium music service.",

  youtubemusic_name: "YouTube Music",
  youtubemusic_desc: "Stream over 100 million songs, albums, remixes, and live performances—YouTube Music’s PWA offers personalized playlists, podcast support, and seamless playback across devices.",

  soundcloud_name: "SoundCloud",
  soundcloud_desc: "SoundCloud is a German audio streaming service owned and operated by SoundCloud Global Limited & Co. KG. The service enables its users to upload, promote, and share audio.",

  ecommerece_name: "E-commerece",

  starbucks_name: "Starbucks",
  starbucks_desc: "Coffee ordering and loyalty tracking.",

  amazon_name: "Amazon",
  amazon_desc: "Shop millions of products, track orders, and manage your account.",

  bestbuy_name: "Best Buy",
  bestbuy_desc: "Electronics and appliances retail hub.",

  ebay_name: "eBay",
  ebay_desc: "Global e-commerce platform—eBay connects buyers and sellers through auctions, fixed-price listings, and curated collections.",
  temu_desc: "Temu is an online marketplace operated by e-commerce company PDD Holdings. The program is designed to help local sellers reach more local consumers, bring more locally relevant products to local shoppers, and improve the user experience.",
  shopify_name: "Shopify",
  shopify_desc: "Build and manage your own online store with customizable tools and secure checkout.",

  taobao_name: "Taobao (淘宝)",
  taobao_desc: "A major consumer-to-consumer e-commerce platform in China, Taobao offers a diverse marketplace featuring everything from fashion and electronics to handmade local products. Backed by Alibaba, it’s known for powerful search tools, mobile-first features, and deep integration with logistics and social commerce.",

  walmart_name: "Walmart",
  walmart_desc: "Multinational retail giant offering groceries, electronics, apparel, and more through supercenters and online shopping.",

  target_name: "Target",
  target_desc: "U.S.-based retail chain offering groceries, electronics, clothing, and home goods—available via superstores and online shopping.",

  cvs_name: "CVS",
  cvs_desc: "U.S. pharmacy and retail chain offering prescriptions, health and wellness products, beauty essentials, and everyday groceries—available in-store and online.",

  doordash_name: "Doordash",
  doordash_desc: "Food delivery and logistics platform connecting users with restaurants, convenience stores, and groceries—order online or via app for on-demand service.",

  kfc_name: "KFC",
  kfc_desc: "Global fast food chain known for its fried chicken—order meals, explore deals, and find locations through its app or website.",

  subway_name: "Subway",
  subway_desc: "International sandwich shop offering customizable subs, wraps, and salads—order online, join rewards, and locate stores easily.",

  mcdonalds_name: "McDonald's",
  mcdonalds_desc: "World's largest fast food chain serving burgers, fries, breakfast, and beverages—mobile ordering, rewards, and location finder available via app or site.",
  applestore_name: "Apple Store",
  applestore_desc: "Apple Store is the official retail and support channel for Apple products. Shop iPhones, Macs, iPads, and accessories, or get help from Apple Specialists and Genius Bar technicians.",
  appleretail_name: "Apple Retail Store",
  appleretail_desc: "Apple Retail Store is Apple’s official physical store where customers can shop products, get technical support, and attend in-store sessions. Locations offer hands-on experiences with devices and personalized service from Apple Specialists.",
  housing_name: "Housing",
  booking_name: "Booking",
  booking_desc: "Search and book hotels, resorts, apartments, and more from global providers. Filter by location, price, rating, and availability.",
  airbnb_name: "Airbnb",
  airbnb_desc: "Discover unique stays and short-term rentals hosted by locals. Search by location, price, type, and availability.",
  zillow_name: "Zillow",
  zillow_desc: "Browse homes for sale and rent across the U.S. View property details, estimate home values, and explore neighborhood insights.",
  redfin_name: "Redfin",
  redfin_desc: "Search real estate listings with live updates and agent-backed insights. Compare home prices, schedule tours, and track market trends.",
  auctioncom_name: "Auction.com",
  auctioncom_desc: "Discover residential and commercial properties for auction. Bid online, review foreclosure details, and explore investment opportunities.",

  jobs_name: "Jobs",
  linkedin_name: "LinkedIn",
  linkedin_desc: "Connect with professionals, explore job opportunities, and build your career profile. Follow companies, join industry groups, and share insights.",
  handshake_name: "Handshake",
  handshake_desc: "Handshake is a career platform designed for students and recent graduates to discover jobs, internships, and events. It connects users with employers, career centers, and peers to support early career growth and networking.",
  codesignal_name: "CodeSignal",
  codesignal_desc: "A platform for technical assessments, interview preparation, and skills certification used by companies and job seekers.",
  remoteok_name: "Remote OK",
  remoteok_desc: "Remote OK is a global job board specializing in remote work opportunities across tech, design, marketing, and more. Updated daily with verified listings from remote-friendly companies.",
  mobilitylogistics_name: "Mobility & Logistics",

  uber_name: "Uber",
  uber_desc: "Ride-hailing and delivery platform—book trips, order food, and manage your account via installable PWA.",

  amtrak_name: "Amtrak",
  amtrak_desc: "Book train tickets, check schedules, and track your ride—Amtrak’s PWA offers smooth travel planning across 500+ U.S. destinations.",

  delta_name: "Delta",
  delta_desc: "Manage flights, check in, and track status—Delta’s installable PWA streamlines your journey with mobile-friendly tools and SkyMiles integration.",

  united_name: "United Airlines",
  united_desc: "Book flights, manage reservations, and track travel status—United’s installable PWA connects you to over 300 destinations worldwide with MileagePlus rewards, mobile check-in, and real-time updates.",

  flixbus_name: "FlixBus",
  flixbus_desc: "Explore 1,800+ destinations across the US and beyond—FlixBus’s PWA lets you book tickets, track your ride in real time, and travel comfortably with Wi-Fi, outlets, and extra legroom.",

  sfexpress_name: "SF Express (顺丰速运)",
  sfexpress_desc: "SF Express—track domestic and international shipments, schedule pickups, and manage delivery services.",
  usps_name: "USPS",
  usps_desc: "United States Postal Service—track shipments, buy postage, schedule pickups, and access national mailing services and address tools through its official portal.",
  cars_name: "Cars",
  tesla_name: "Tesla",
  tesla_desc: "Tesla is an American electric vehicle and clean energy company founded by Elon Musk and others in 2003. It is known for its innovative EVs, autonomous driving technology, and energy solutions such as solar panels and battery storage.",
  jiakaobaodian_name: "Jiakaobaodian (驾考宝典)",
  jiakaobaodian_desc: "China’s leading driving test platform—offers up-to-date question banks, multilingual exam prep, and full-process guidance for learners. On Microsoft Edge for Android, please log in first via the browser. The option to install as a Progressive Web App (PWA) becomes available after authentication.",

  tickets_name: "Tickets",

  ctrip_name: "Ctrip (携程)",
  ctrip_desc: "Book flights, hotels, trains, and vacation packages across China and worldwide. Compare prices, check availability, and manage your travel plans easily.",

  taopiaopiao_name: "Tao Piao Piao (淘票票)",
  taopiaopiao_desc: "Tao Piao Piao is a leading Chinese movie ticketing platform owned by Alibaba. It offers showtimes, seat selection, and online booking for cinemas across China, along with trailers, reviews, and promotional content for current and upcoming films.",

  cloud_name: "Cloud (is someone else's computer)",

  linode_name: "Linode",
  linode_desc: "Akamai-powered cloud hosting, VMs, and dev tools.",

  azure_name: "Azure",
  azure_desc: "Azure is the cloud computing platform developed by Microsoft. It offers management, access and development of applications and services to individuals, companies, and governments through its global infrastructure.",

  websitesblogs_name: "Websites & Blogs",

  wordpress_name: "WordPress",
  wordpress_desc: "Open-source content management system—build blogs, websites, and online stores with thousands of themes, plugins, and full customization.",

  adactio_name: "Adactio",
  adactio_desc: "Adactio is the online home of Jeremy Keith, a web developer and author living and working in Brighton, England.",
  medium_name: "Medium",
  medium_desc: "Online publishing platform for articles, essays, and stories from individuals and organizations.",
  herbsutter_name: "Herb Sutter",
  herbsutter_desc: "Herb Sutter (chairman of ISO C++ standard committee WG21)’s personal blog—explore thought-provoking essays, deep dives into modern C++, and insights on programming language evolution. A trusted resource for developers seeking clarity, rigor, and vision in software design.",
  bjarnestroustrup_name: "Bjarne Stroustrup",
  bjarnestroustrup_desc: "Bjarne Stroustrup is a Danish computer scientist best known for designing and implementing the C++ programming language.",
  nvidia_name: "NVIDIA",
  nvidia_desc: "NVIDIA is a global leader in artificial intelligence computing and supplies chips for data centers, gaming, and more.",

  usgov_name: "United States Government🇺🇸",

  irs_name: "IRS",
  irs_desc: "Official site of the U.S. Internal Revenue Service—access tax forms, file returns, track refunds, manage payments, and stay updated on federal tax regulations and news.",

  uscis_name: "USCIS",
  uscis_desc: "U.S. Citizenship and Immigration Services—manage immigration applications, check case status, access forms, and explore resources for citizenship, green cards, and asylum.",

  ssa_name: "SSA",
  ssa_desc: "Social Security Administration—access retirement, disability, and Medicare benefits, manage your account, and find resources for planning and applying.",

  tsa_name: "TSA",
  tsa_desc: "Transportation Security Administration—get travel tips, apply for TSA PreCheck, check airport security wait times, and review prohibited items.",

  dos_name: "DOS",
  dos_desc: "U.S. Department of State—apply for passports, review travel advisories, access consular services, and explore foreign policy resources.",

  usagov_name: "USA.gov",
  usagov_desc: "USA.gov—official guide to U.S. government services and information. Find benefits, contact agencies, explore topics like taxes, immigration, health, and more—all in one centralized portal.",

  identitytheft_name: "IdentityTheft",
  identitytheft_desc: "Federal Trade Commission’s one-stop resource for identity theft victims—report fraud, create a recovery plan, access sample letters, and track progress through personalized steps.",

  ftc_name: "FTC",
  ftc_desc: "Federal Trade Commission—protecting consumers and promoting competition through enforcement, education, and advocacy. Access fraud reporting tools, business guidance, and resources on scams, privacy, and identity theft.",

  fda_name: "FDA",
  fda_desc: "U.S. Food and Drug Administration—protects public health by ensuring the safety, efficacy, and security of food, drugs, medical devices, cosmetics, and radiation-emitting products. Access recalls, approvals, research, and consumer guidance.",

  fed_name: "FED",
  fed_desc: "Central bank of the United States—formulates monetary policy, supervises financial institutions, promotes financial stability, and provides services to the banking system. Access economic data, policy updates, and regulatory resources.",

  dol_name: "DOL",
  dol_desc: "U.S. Department of Labor—administers federal labor laws to ensure fair, safe, and healthy working conditions. Access wage standards, unemployment resources, workplace safety guidance, and employment training programs.",

  dod_name: "DOD",
  dod_desc: "U.S. Department of Defense—coordinates and supervises the nation's military forces, including the Army, Navy, Air Force, Marines, Space Force, and Coast Guard. Access defense news, policy updates, service member resources, and official publications.",

  gsa_name: "GSA",
  gsa_desc: "General Services Administration—manages federal property, procurement, and technology services. Access auctions, contracts, and governmentwide initiatives.",

  dhs_name: "DHS",
  dhs_desc: "Department of Homeland Security—protects the U.S. from threats through border security, immigration enforcement, cybersecurity, and emergency response.",

  dea_name: "DEA",
  dea_desc: "Drug Enforcement Administration—enforces controlled substance laws, combats drug trafficking, and supports prevention and education efforts.",

  eeoc_name: "EEOC",
  eeoc_desc: "Equal Employment Opportunity Commission—enforces laws against workplace discrimination and provides resources for employees and employers.",

  nsa_name: "NSA",
  nsa_desc: "National Security Agency—provides signals intelligence and cybersecurity services to protect national security and support military operations.",

  cia_name: "CIA",
  cia_desc: "Central Intelligence Agency—collects and analyzes foreign intelligence, conducts covert operations, and informs U.S. national security policy.",

  doj_name: "DOJ",
  doj_desc: "Department of Justice—enforces federal law, defends the interests of the U.S., and ensures fair and impartial administration of justice.",

  omb_name: "OMB",
  omb_desc: "Office of Management and Budget—oversees federal budget development, agency performance, and regulatory policy across the executive branch.",

  nasa_name: "NASA",
  nasa_desc: "National Aeronautics and Space Administration—explores space and aeronautics, conducts scientific research, and leads missions to study Earth, the solar system, and the universe. Access news, images, videos, and live coverage of launches and discoveries.",

  whitehouse_name: "White House",
  whitehouse_desc: "Official residence and workplace of the President of the United States—explore executive branch initiatives, press releases, policy updates, and historical archives. Access resources from the Office of the President and stay informed on national priorities.",
  idme_name: "ID.me",
  idme_desc: "ID.me is a private digital identity platform trusted by U.S. government agencies for secure online access. It helps users verify their identity, access public services, and unlock exclusive benefits for verified groups like military personnel, students, and first responders.",
  organizations_name: "Organizations",
  iso_name: "ISO",
  iso_desc: "The International Organization for Standardization (ISO) is an independent, non-governmental international organization that develops and publishes global standards across a wide range of industries and sectors to ensure quality, safety, efficiency, and interoperability.",

  olympics_name: "Olympics",
  olympics_desc: "The modern Olympic Games are the world's preeminent international sporting events.",

  un_name: "UN",
  un_desc: "The United Nations (UN) is the only place on Earth where all the world's nations come together to discuss common problems and find shared solutions that benefit all of humanity.",
  healthinsurance_name: "Health & Insurance",
  digitalexpertgehealthcare_name: "Digital Expert GE HealthCare",
  digitalexpertgehealthcare_desc: "Digital Expert by GE HealthCare is a cloud-based platform that connects clinicians with real-time support, training, and expert guidance. Designed to enhance diagnostic confidence and workflow efficiency, it empowers healthcare professionals with on-demand access to clinical expertise and digital tools.",
  uhs_name: "UHS",
  uhs_desc: "Universal Health Services—hospital management and healthcare provider offering behavioral health, acute care, and medical services across the U.S.",

  deltadental_name: "Delta Dental",
  deltadental_desc: "Dental insurance provider serving individuals and employers—manage benefits, find dentists, view claims, and explore oral health resources online.",

  research_name: "Research",

  secdeadlines_name: "Security and Privacy Conference Deadlines",
  secdeadlines_desc: "Countdowns to top Security and Privacy conference deadlines.",

  hotcrp_name: "HotCRP",
  hotcrp_desc: "A web-based conference management system for paper submission, review, and decision tracking.",

  education_name: "Education",

  princeton_name: "Princeton University",
  princeton_desc: "Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746, it is the fourth-oldest higher education institution in the U.S. and one of the nine colonial colleges. Princeton is renowned for its undergraduate and doctoral programs, and its mission is to prepare students for meaningful lives and future challenges through world-class scholarship and teaching.",

  binghamton_name: "Binghamton University",
  binghamton_desc: "Binghamton University is a world-class institution offering interdisciplinary education with an international perspective and one of the most vibrant research programs in the U.S.",

  fudan_name: "Fudan University",
  fudan_desc: "Fudan University is a comprehensive research university in Shanghai, China, founded in 1905 as the first higher education institution established by a Chinese person.",

  adult_name: "Adult",

  pornhub_name: "Pornhub",
  pornhub_desc: "Adult entertainment portal.",

  spankbang_name: "SpankBang",
  spankbang_desc: "Free adult video streaming site.",

  hentaihaven_name: "Hentai Haven",
  hentaihaven_desc: "Hentai-focused adult media platform.",

  missavtv_name: "MissAV TV",
  missavtv_desc: "Japanese adult video index.",

  xnxx_name: "XNXX.COM",
  xnxx_desc: "Czech-French adult video sharing site founded in 1997, with global infrastructure.",

  onlyfans_name: "OnlyFans",
  onlyfans_desc: "Subscription-based platform known for exclusive adult and creator content.",

  javhdporn_name: "JavHDPorn",
  javhdporn_desc: "Free Janpanese AV HD Videos, Japanese Porn Streaming Online",
};

registerLocale("enus", L);
