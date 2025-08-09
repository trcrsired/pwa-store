// locale/enus.js
import { registerLocale } from './localization.js';

const L = {
  "wrapper": "wrapper",
  "fundamental_name": "Fundamental",
  "chabots_name": "Chatbots",
  "microsoft_services_name": "Microsoft Services",
  "snaeplayer_desc": "Lightweight on device music player PWA.",
  "flow_desc": "Browser Based EPUB reader",
  "treader_desc": "Lightweight text file reader.",
  "webvideoplayer_desc": "An easy-to-use and very lightweight (<100KB) video player for local video/audio files on desktop platforms, powered by Web technology.",
  "pwaplayer_name": "PWA Player (My own toy)",
  "pwaplayer_desc": "A demo PWA Player for me to learn.",
  "calculator_desc": "Simple, installable calculator PWA—works offline and optimized for mobile.",
  "weawow_desc": "Ad-free weather PWA with stunning photo forecasts, detailed hourly & 14-day data, and customizable widgets.",
  "screenflashlight_desc": "A web-based PWA flashlight app",
  "copilot_desc": "Conversational AI by Microsoft—Copilot helps you think, write, and explore with real-time web access and voice support.",
  "deepseek_desc": "Chinese-developed AI assistant with powerful reasoning and multilingual support—DeepSeek’s PWA offers free access to its flagship models.",
  "chatgpt_desc": "OpenAI’s conversational assistant—ChatGPT’s PWA delivers installable access to GPT models, memory, plugins, and voice features.",
  "gemini_desc": "Google Gemini is a powerful artificial intelligence (AI) model developed by Google that can understand and generate text, images, videos, and audio. It serves as both a chatbot and the underlying large language model (LLM) that powers it, making it versatile for various applications. Gemini is designed to integrate with Google services, allowing users to interact with their data in Gmail, Google Calendar, and more, enhancing productivity and user experience.",
  "qwen_desc": "Multimodal AI by Alibaba—Qwen’s PWA supports chat, image generation, dialect-aware voice synthesis, and deep research tools.",
  "outlook_desc": "Webmail and calendar by Microsoft.",
  "onedrive_desc": "Cloud storage with robust PWA features.",
  "bing_name": "Bing",
  "bing_desc": "Microsoft's search engine delivering web, image, video, and map results with integrated AI features and daily visual highlights.",
  "google_desc": "Global search and service hub offering instant access to Search, Gmail, Drive, Translate, and other tools via a fast, unified web interface optimized across devices.",
  "googlevoice_name": "Google Voice",
  "googlevoice_desc": "Get a free U.S. phone number for calls, texts, and voicemail—syncs across devices and works on web or mobile.",
  "googlemaps_name": "Google Maps",
  "googlemaps_desc": "Navigate the world with Google Maps—its PWA lets you find places, get directions, explore nearby businesses, and view real-time traffic, transit, and satellite layers.",
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

  bing_webmaster_name: "Bing Webmaster Tools",
  bing_webmaster_desc: "Bing Webmaster Tools provides website owners with insights into search performance, indexing status, and SEO diagnostics. Monitor traffic, submit sitemaps, and optimize your site for visibility on Bing Search.",

  pwabuilder_name: "PWA Builder",
  pwabuilder_desc: "PWA Builder is an open-source tool developed by Microsoft that simplifies the process of deploying Progressive Web Apps (PWAs).",

  python_desc: "Python is a programming language that lets you work quickly and integrate systems more effectively.",

  rust_desc: "A language empowering everyone to build reliable and efficient software.",

  isocpp_name: "ISO C++",
  isocpp_desc: "isocpp.org is the official website for the Standard C++ Foundation, which supports the C++ software developer community and promotes the understanding and use of modern Standard C++.",

  linuxdie_name: "Linux.die",
  linuxdie_desc: "Extensive archive of Linux documentation, man pages, and HOWTO guides—ideal for developers, sysadmins, and command-line enthusiasts seeking quick reference and deep technical insight.",

  godbolt_desc: "Interactive compiler explorer for C, C++, Rust, and more—visualizing assembly output and comparing optimization across toolchains.",

  v86_desc: "Virtual x86 emulator running legacy operating systems like Windows 95 and Linux directly in the browser using WebAssembly.",

  fsf_name: "Free Software Foundations",
  fsf_desc: "The Free Software Foundation (FSF) is a nonprofit with a worldwide mission to promote computer user freedom.",

  gccmcf_name: "GCC MCF",
  gccmcf_desc: "A customized GCC fork for Windows that replaces the standard POSIX thread model with its own minimal C library-based fiber-compatible threading system (MCF).",

  geeksforgeeks_desc: "GeeksforGeeks is a comprehensive educational portal that empowers learners across domains.",

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

  youtube_desc: "Video streaming platform by Google.",
  reddit_desc: "Community-driven discussion forums.",
  x_name: "X (Twitter)",
  x_desc: "Text-based social updates and chatter.",
  instagram_desc: "Image-centric social network.",
  facebook_desc: "Meta’s primary social platform.",
  tinder_desc: "Swipe-based dating experience.",
  bluesky_desc: "Federated social media alternative.",
  twitch_desc: "Live streaming platform for gamers, creators, and communities to interact in real time.",
  patreon_desc: "Support creators directly and access exclusive content.",
  discord_desc: "Voice, video, and text platform for communities, creators, and friends — organized around invite-only servers and topic-based channels.",
  telegram_desc: "Cloud-based messaging app offering fast, secure communication with support for large groups, media sharing, and cross-device sync.",
  zoom_desc: "Video conferencing platform offering reliable virtual meetings, webinars, screen sharing, and collaboration tools across devices.",
  hackernews_name: "Hacker News",
  hackernews_desc: "Tech-savvy and community-driven—Hacker News offers a minimalist PWA experience for discovering and discussing cutting-edge ideas in programming, startups, and science.",
  lobsters_desc: "Lobsters is a computing-focused community centered around link aggregation and discussion, launched on July 3rd, 2012.",
  tieba_name: "Tieba (贴吧)",
  tieba_desc: "Baidu’s interest-based forum network where users gather in topic-specific bars to share posts, media, and discussions. On mobile, you need to use Microsoft Edge with Android and modify the agent string by adding ArkWeb to bypass the Tieba mini app check.",

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
  whitehouse_desc: "Official residence and workplace of the President of the United States—explore executive branch initiatives, press releases, policy updates, and historical archives. Access resources from the Office of the President and stay informed on national priorities."
};

registerLocale("enus", L);
