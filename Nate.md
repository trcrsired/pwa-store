许多网站并不提供完善的 PWA 支持，但这并不意味着它们不能被封装并转化为可安装的体验。本仓库是一个集中式的启动器，用于启动自定义PWA封装程序，使用户能够更安全、更自由地安装和浏览网页。

* PWA商店：[pwa-store](https://pwa-store-7x5.pages.dev/store/)
* PWA仓库：[GitHub](https://github.com/trcrsired/pwa-store)
---

# 网站图标

我们需要准备一张尺寸为 512x512 或更小的webp格式的正方形图像（大约在10KiB内），放入`pwa-store/docs/store/icons/`对应的四个目录(我们关注的）下。
~/pwa-store/docs/store/icons/
* pwa
* msedge
* wechatmini
* wrappers

| 序号 | 条件 | 存放路径 | 是否生成包装 | 额外要求 |
| :---: | :--- | :--- | :---: | :--- |
| 1 | 有积木，能直接安装 | pwa | 否 | 无 |
| 2 | 无积木，但移动端浏览器能安装(安卓Edge好些， 有些浏览器不能安装的它可以）| msedge | 是 | 包装需添加 apptype: msedge |
| 3 | 无积木，移动端(安卓, 苹果)也不能安装 | wrappers | 是 | 无 |
| 4 | 微信小程序专区 | wechatmini | 否 | 仅需放置小程序封面图+小程序链接/码 |

注意：就目前来看，因为移动端Edge浏览器可以兼容很多其他浏览器不能安装的，所以msedge作为保底的标识符，代表移动端浏览器可以按装的， 而并非只是Edge。

> **图片方面**：
> **图片裁剪**：可以将获取到的图片然后前往[在线工具Real Favicon Generator](https://realfavicongenerator.net/)， 点击按钮Pick your favicon image上传您的图像文件。下一步，网页将显示所有使用场景。您可以保留默认选项，滚动到页面底部，然后点击按钮Next →生成网站图标。 这样我们会下载一个安装包， 里面有`web-app-manifest-512x512.png`的图片。
> **转化格式**：由于我采用的是Fedora发型版，使用Magick（ImageMagick）工具转换， 比如在终端运行命令`magick web-app-manifest-512x512.png web-app-manifest-512x512.webp`就会得到webp格式的图片， 然后修改成网站的名称(推荐英文格式)就好。

> **积木解释**：
> **pwa**：比如打开[chirpy](https://chirpy.cotes.page/)网页(无论是电脑，还是手机),会发现有个“小积木”，这个是能够直接完善支持PWA的。
![image](https://img2024.cnblogs.com/blog/1915850/202604/1915850-20260411100002896-613700811.png)
> **msedge**：比如[美国北卡罗来纳州夏洛特市本地新闻电视台](ttps://www.wbtv.com/)官网, 会发现，并没有小积木，但是在手机edge浏览器上->三横(三）->添加手机(Add to phone)， 然后可以在移动端桌面出现wbtv应用，这个是移动端（安卓）Edge浏览器能安装的。
>![image](https://img2024.cnblogs.com/blog/1915850/202604/1915850-20260411102320596-604229970.png)
> **wrappers**：这种情况就是前两者都不能创建的，无积木，安卓也不能安装。
> **wechatmini**:微信小程序的基本都熟悉。
> ![image](https://img2024.cnblogs.com/blog/1915850/202604/1915850-20260411104129696-445143163.png)

---

# mesedge

1. **图标处理**：
pwa非常容易， 我们来看看mesedage, 比如美国北卡罗来纳州夏洛特市本地新闻电视台官网`https://www.wbtv.com/`， 打开浏览器，会发现它并没有“小积木”， 但是如果在移动端浏览器上，我们可以把它添加到移动端桌面。所以判断它属于mesedge。
将已经处理的512x512的png格式的图片，转换为webp格式的图片。或许你可能会问为什么需要webp格式？或许是PNG 清晰透明、JPG 小但糊、WebP 又小又清，日常用 WebP 基本是最优解。
```bash
magick wbtv.png wbtv.webp
```
![image](https://img2024.cnblogs.com/blog/1915850/202604/1915850-20260411092137557-29417559.png)

2. **设置中英文介绍**：
接下来需要来到~/pwa-store/docs/store/locale/下设置中英文，我们提交pr的只关注的只有两个英文：enus.js和zhcn.js， 

首先看enus.js

|方式           | 对应增添部分|
| :------------|-----------|
|pwa           |// PWA     |
|msedge        |// Microsoft Edge|
|wechatmini    |// WeChat Mini Programs|
|wrappers      |// Wrappers|

注意：Edge浏览器全称Microsoft Edge，这是指移动端的。

把其中一已有的示例丢给ai,按照格式分别生成英中文的json格式
```txt
threeblueonebrown_name: "3Blue1Brown",
threeblueonebrown_desc: "Opens 3Blue1Brown, a site featuring visual and intuitive explanations of advanced math topics.",
按照上述格式生成以下的：
https://www.icloud.com
https://www.wbtv.com
```
这里丢给[豆包](https://www.doubao.com/)， 产出如下内容：
```json
icloud_name: "iCloud",
icloud_desc: "Opens iCloud, a cloud service by Apple for storing photos, files, notes, mail and syncing data across devices.",
```

```json
icloud_name: "iCloud",
icloud_desc: "打开 iCloud，苹果官方云服务，可存储照片、文件、备忘录、邮件并在多设备间同步数据。",
```
前者追加enus.js文件中`// Microsoft Edge`后面
同理，后者追加zhcn.js文件中`// Microsoft Edge`后面

效果
![image](https://img2024.cnblogs.com/blog/1915850/202604/1915850-20260411125236873-1964947196.png)
![image](https://img2024.cnblogs.com/blog/1915850/202604/1915850-20260411125307493-33547972.png)


3. **执行脚本并手动归类**：

然后打开~/pwa-store/scripts/下`generate_wrappers.py`的脚本文件，归类放入`WRAPPERS = []`里面，格式和前面一样，使用现有的例子丢给ai： 提示词如下。

```txt
比如按照
  { "name" : "University of Oxford", "url": "https://www.ox.ac.uk", "keyify_name": "oxford", "apptype": "msedge" },
格式生成
https://www.wbtv.com
```

ai会输出
```js
{ "name" : "WBTV", "url": "https://www.wbtv.com", "keyify_name": "wbtv", "apptype": "msedge" },
```

将输出内容追加到`WRAPPERS = []`括号里面。

因为在站点都写了 `"apptype": "msedge"`，所以脚本会去这里找图标： `docs/store/icons/msedge/` 而不是 `docs/store/icons/` 根目录。\
也就是说你需要确认这个文件存在：docs/store/icons/msedge/wbtv.webp

然后回到项目根目录`~/pwa-store`,执行下列命令：
```bash
python scripts/generate_wrappers.py ~/pwa-store
```

这个脚本会删掉掉并重建_：
* `docs/wrappers/`
* `docs/extensions/`
* `docs/msedge/`

然后重新生成你的新 wrapper。
对你这个站点，生成结果应该会出现在：
* `docs/msedge/wbtv/`

---

手动归类：目的是把这个应用条目补进源 categories里面， 在docs/store/categories.js里面按照下面列表手动修改归类。
比如我们的WBTV判断是News部分， 所以追加到News里面。
```js
  {
    name: "News",
    nameKey: "news_name",
    apps: [
      {
        name: "WBTV",
        nameKey: "wbtv_name",
        descriptionKey: "wbtv_desc",
        icon: "icons/msedge/wbtv.webp",
        url2: "/msedge/wbtv",
        apptype2: "wrapper",
        apptype_hide: "msedge",
        url: "https://www.wbtv.com"
      },
    ],
  },
```

**50个顶层分类**：`export const categories = [...]` 里一共 50 个顶层分类（categories）。

| 序号 | 英文分类名 | 中文翻译对照 | 对应的分类结构 |
|---|---|---|---|
| 1 | Fundamental | 基础的 | `"nameKey": "fundamental_name", "name": "Fundamental"`, `apps: [ ... ]` 里面 |
| 2 | Alternatives | 替代方案 | `"nameKey": "alternatives_name", "name": "Alternatives"`, `apps: [ ... ]` 里面 |
| 3 | Weather | 天气 | `"nameKey": "weather_name", "name": "Weather"`, `apps: [ ... ]` 里面 |
| 4 | WeChat Builtins | 微信内置功能 | `"nameKey": "wechatbuiltins_name", "name": "WeChat Builtins"`, `apps: [ ... ]` 里面 |
| 5 | Chatbots | 聊天机器人 | `"nameKey": "chabots_name", "name": "Chatbots"`, `apps: [ ... ]` 里面 |
| 6 | Cybersecurity | 网络安全 | `"nameKey": "cybersecurity_name", "name": "Cybersecurity"`, `apps: [ ... ]` 里面 |
| 7 | Time | 时间 | `"nameKey": "time_name", "name": "Time"`, `apps: [ ... ]` 里面 |
| 8 | Microsoft Services | 微软服务 | `"nameKey": "microsoft_services_name", "name": "Microsoft Services"`, `apps: [ ... ]` 里面 |
| 9 | Google Services | 谷歌服务 | `"nameKey": "google_services_name"`, `apps: [ ... ]` 里面 |
| 10 | Office Suites | 办公套件 | `"nameKey": "officesuites_name", "name": "Office Suites"`, `apps: [ ... ]` 里面 |
| 11 | Programming | 编程 | `"nameKey": "programming_name", "name": "Programming"`, `apps: [ ... ]` 里面 |
| 12 | Internet Services | 互联网服务 | `"nameKey": "internetservices_name", "name": "Internet Services"`, `apps: [ ... ]` 里面 |
| 13 | Mail | 邮件 | `"nameKey": "mail_name", "name": "Mail"`, `apps: [ ... ]` 里面 |
| 14 | Social Media | 社交媒体 | `"nameKey": "socialmedia_name", "name": "Social Media"`, `apps: [ ... ]` 里面 |
| 15 | Finance | 金融 | `"nameKey": "finance_name", "name": "Finance"`, `apps: [ ... ]` 里面 |
| 16 | Business | 商业 | `"nameKey": "business_key", "name": "Business"`, `apps: [ ... ]` 里面 |
| 17 | Billing | 缴费 | `"nameKey": "billing_key", "name": "Billing"`, `apps: [ ... ]` 里面 |
| 18 | Tech | 科技 | `"nameKey": "tech_key", "name": "Tech"`, `apps: [ ... ]` 里面 |
| 19 | Resource Distributions | 资源分发 | `"nameKey": "resourcedistributions_name", "name": "Resource Distributions"`, `apps: [ ... ]` 里面 |
| 20 | Media Tools | 媒体工具 | `"nameKey": "mediatools_name", "name": "Media Tools"`, `apps: [ ... ]` 里面 |
| 21 | News | 新闻 | `"nameKey": "news_name", "name": "News"`, `apps: [ ... ]` 里面 |
| 22 | Fashion | 时尚 | `"nameKey": "fashion_name", "name": "Fashion"`, `apps: [ ... ]` 里面 |
| 23 | Entertainment Platform | 娱乐平台 | `"nameKey": "entertainmentplatform_name", "name": "Entertainment Platform"`, `apps: [ ... ]` 里面 |
| 24 | Games | 游戏 | `"nameKey": "games_name", "name": "Games"`, `apps: [ ... ]` 里面 |
| 25 | Gaming Community | 游戏社区 | `"nameKey": "gamingcommunity_name", "name": "Gaming Community"`, `apps: [ ... ]` 里面 |
| 26 | Learning | 学习 | `"nameKey": "learning_name", "name": "Learning"`, `apps: [ ... ]` 里面 |
| 27 | Forums | 论坛 | `"nameKey": "forums_name", "name": "Forums"`, `apps: [ ... ]` 里面 |
| 28 | Knowledge & Pedias | 知识与百科 | `"nameKey": "knowledgespedia_name", "name": "Knowledge & Pedias"`, `apps: [ ... ]` 里面 |
| 29 | Religion | 宗教 | `"nameKey": "religion_name", "name": "Religion"`, `apps: [ ... ]` 里面 |
| 30 | Analytics | 分析工具 | `"nameKey": "analytics_name", "name": "Analytics"`, `apps: [ ... ]` 里面 |
| 31 | Live Tracking | 实时追踪 | `"nameKey": "livetracking_name", "name": "Live Tracking"`, `apps: [ ... ]` 里面 |
| 32 | Streaming | 流媒体 | `"nameKey": "streaming_name", "name": "Streaming"`, `apps: [ ... ]` 里面 |
| 33 | E-commerce | 电子商务 | `"nameKey": "ecommerece_name", "name": "E-commerce"`, `apps: [ ... ]` 里面 |
| 34 | Food | 食物 | `"nameKey": "food_name", "name": "Food"`, `apps: [ ... ]` 里面 |
| 35 | Mobility & Logistics | 出行与物流 | `"nameKey": "mobilitylogistics_name", "name": "Mobility & Logistics"`, `apps: [ ... ]` 里面 |
| 36 | Cars | 汽车 | `"nameKey": "cars_name", "name": "Cars"`, `apps: [ ... ]` 里面 |
| 37 | Tickets | 票务 | `"nameKey": "tickets_name", "name": "Tickets"`, `apps: [ ... ]` 里面 |
| 38 | Housing | 住房 | `"nameKey": "housing_name", "name": "Housing"`, `apps: [ ... ]` 里面 |
| 39 | Jobs | 求职 | `"nameKey": "jobs_name", "name": "Jobs"`, `apps: [ ... ]` 里面 |
| 40 | Cloud (is someone else's computer) | 云服务（别人的电脑） | `"nameKey": "cloud_name", "name": "Cloud (is someone else's computer)"`, `apps: [ ... ]` 里面 |
| 41 | LegalTech | 法律科技 | `"nameKey": "legaltech_name", "name": "LegalTech"`, `apps: [ ... ]` 里面 |
| 42 | Websites & Blogs | 网站与博客 | `"nameKey": "websitesblogs_name", "name": "Websites & Blogs"`, `apps: [ ... ]` 里面 |
| 43 | Manosphere | 男性圈 | `"nameKey": "manosphere_name", "name": "Manosphere"`, `apps: [ ... ]` 里面 |
| 44 | United States Government🇺🇸 | 美国政府 | `"nameKey": "usgov_name", "name": "United States Government🇺🇸"`, `apps: [ ... ]` 里面 |
| 45 | Chinese Government🇨🇳 | 中国政府 | `"nameKey": "cngov_name", "name": "Chinese Government🇨🇳"`, `apps: [ ... ]` 里面 |
| 46 | Organizations | 组织机构 | `"nameKey": "organizations_name", "name": "Organizations"`, `apps: [ ... ]` 里面 |
| 47 | Health & Insurance | 健康与保险 | `"nameKey": "healthinsurance_name", "name": "Health & Insurance"`, `apps: [ ... ]` 里面 |
| 48 | Life | 生活 | `"nameKey": "life_name", "name": "Life"`, `apps: [ ... ]` 里面 |
| 49 | Sports | 体育 | `"nameKey": "sports_name", "name": "Sports"`, `apps: [ ... ]` 里面 |
| 50 | Research | 研究 | `"nameKey": "research_name", "name": "Research"`, `apps: [ ... ]` 里面 |
| 51 | Education | 教育 | `"nameKey": "education_name", "name": "Education"`, `apps: [ ... ]` 里面 |
| 52 | Web Portal | 网址导航/门户 | `"nameKey": "webportal_name", "name": "Web Portal"`, `apps: [ ... ]` 里面 |
| 53 | Other PWA Stores | 其他 PWA 商店 | `"nameKey": "otherpwastores_name", "name": "Other PWA Stores"`, `apps: [ ... ]` 里面 |
| 54 | Boards | 版块/图板 | `"nameKey": "boards_name", "name": "Boards"`, `apps: [ ... ]` 里面 |
| 55 | Bluetooth Devices | 蓝牙设备 | `"nameKey": "bluetoothdevices_name", "name": "Bluetooth Devices"`, `apps: [ ... ]` 里面 |
| 56 | Adult | 成人内容 | `"nameKey": "adult_name", "name": "Adult"`, `apps: [ ... ]` 里面 |


---

各分类里 app 的“添加方式”

| 基础字段 | 含义 | 基础(共有) | pwa | msedge | wrapper | wechatmini |
|---|---|---|---|---|---|---|
| `name` | 展示名称 | ✅ | ❌ | ✅ | ✅ | ❌ |
| `nameKey` | 名称对应的多语言键名 | ❌ | ❌ | ❌ | ❌ | ❌ |
| `apps` | 该分类下的应用列表 | ❌ | ❌ | ❌ | ❌ | ❌ |
| `icon` | 图标路径 | ✅ | ❌ | ✅ | ✅ | ❌ |
| `url` | 主访问地址；也可能是站点地址、站内相对路径、小程序唤起地址等 | ✅ | ❌ | ✅ | ✅ | ❌ |
| `descriptionKey` | 描述文本对应的多语言键名 | ❌ | ❌ | ❌ | ❌ | ❌ |
| `manifestUrl` | Web App Manifest 地址 | ❌ | ❌ | ❌ | ❌ | ❌ |
| `manifestId` | Manifest 对应的应用 ID / 安装标识 | ❌ | ❌ | ❌ | ❌ | ❌ |
| `urlDisplay` | 对外展示的网址，一般用于 wrapper 显示原站地址 | ❌ | ❌ | ❌ | ❌ | ❌ |
| `apptype` | 应用类型，例如 `wrapper`、`pwa`、`msedge`、`wechatmini`、`native`、`extension` | ✅ | ✅pwa | ✅msedge | ✅wrapper | ✅wechatmini |
| `hide` | 是否隐藏；为 `true` 时通常不在前台正常展示 | ❌ | ❌ | ❌ | ❌ | ❌ |
| `url2` | 第二访问入口，常用于同时保留另一种安装/包装方式 | ❌ | ❌ | ❌ | ❌ | ❌ |
| `apptype2` | 第二应用类型，对应 `url2` | ❌ | ❌ | ✅ | ❌ | ❌ |
| `manifestUrl2` | 第二 Manifest 地址，对应 `url2` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `manifestId2` | 第二 Manifest ID，对应 `url2` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `namekey` | 另一种写法的小写字段名，作用与 `nameKey` 相同，但属于文件中的不统一写法 | ❌ | ❌ | ❌ | ❌ | ❌ |

---

**示例**：
**pwa**：最常见的“普通 PWA/网页站点”写法通常是：

```js
{
  "name": "Google",
  "icon": "icons/pwa/google.webp",
  "url": "https://www.google.com",
  "descriptionKey": "google_desc"
}
```

---

**msedge**: Microsoft Edge类（指的是移动端浏览器）:`apptype` 是 `msedge`，通常保留原站 URL。

```js
{
  "name": "Laptop Mag",
  "nameKey": "laptopmag_name",
  "descriptionKey": "laptopmag_desc",
  "icon": "icons/msedge/laptopmag.webp",
  "url": "https://www.laptopmag.com",
  "apptype": "msedge",
  "url2": "/msedge/laptopmag",
  "apptype2": "wrapper",
  "manifestUrl2": "/msedge/laptopmag/manifest.json",
  "manifestId2": "/msedge/laptopmag"
}
```

---

**wrapper**： Wrapper 型:`url` 指向本项目内部路径 `/wrappers/...`，并带 `apptype: "wrapper"`。

```js
{
  "name": "Perplexity",
  "icon": "icons/wrappers/perplexity.webp",
  "url": "/wrappers/perplexity",
  "urlDisplay": "https://www.perplexity.ai",
  "descriptionKey": "perplexity_desc",
  "apptype": "wrapper",
  "manifestUrl": "/wrappers/perplexity/manifest.json",
  "manifestId": "/wrappers/perplexity"
}
```

---

**wechatmini**： 微信小程序型。

```js
{
  "name": "China Telecom",
  "nameKey": "chinatelecom_name",
  "descriptionKey": "chinatelecom_desc",
  "icon": "icons/wechatmini/chinatelecom.webp",
  "url": "#小程序://中国电信App/euxKgI21HGTS3KJ",
  "apptype": "wechatmini"
}
```

---

# 提pr

超简单！提交 PR 完整教程（一步一步照着做）
我给你写最通俗、新手也能直接用的版本，你跟着点就行👇
一、准备工作（10 秒）
1. 打开你要提交的项目 GitHub 页面
2. 点击右上角 Fork → 把项目复制到你自己的账号里

二、修改代码
1. 进入你 Fork 后的项目
2. 找到要改的文件
3. 点右上角 铅笔图标 ✏️ 编辑
4. 改完后拉到最下面
5. 点 Commit changes 保存

三、发起 Pull Request（PR）
1. 回到你 Fork 的项目首页
2. 点上方的 Pull requests
3. 点 New pull request
4. 确认分支正确后
5. 点 Create pull request
6. 写标题 + 简单说明
7. 再点 Create pull request 提交
✅ 完成！ 等作者合并就行。

---
