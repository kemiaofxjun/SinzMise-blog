// 主题配置
export const themeConfig = {
  // 站点信息
  siteMeta: {
    // 站点标题
    title: "喵洛阁",
    // 站点副标题（RSS限定）
    subtitle: "克喵的博客",
    // 站点描述
    description: "记录克喵的生活日记、资源分享和踩坑教程",
    // 站点logo
    logo: "https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp",
    // 站点地址
    site: "https://blog-v3.kemiaosw.top",
    // 语言
    lang: "zh-CN",
    // 作者
    author: {
      name: "克喵爱吃卤面",
      cover: "https://img.314926.xyz/images/2025/08/09/kemiaofxjun.webp",
      email: "me@mail.kemeow.top",
      link: "https://home.kemeow.top",
    },
    copy: "KeMiao Limited",
  },
  // 备案信息
  // icp: "萌ICP备114514号",
  gongan: {
    enable: false,
    link: 'https://icp.gov.moe/?keyword=20250530',
    text: '萌ICP备20250530号',
  },
  // 建站日期
  since: "2025-09-01",
  // 每页文章数据
  postSize: 8,
  // inject
  inject: {
    // 头部
    // https://vitepress.dev/zh/reference/site-config#head
    header: [
      // favicon
      ["link", { rel: "icon", href: "https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp" }],
      // IndieWeb
      // ["link", { rel: "authorization_endpoint", href: "https://indieauth.com/auth" }],
      // ["link", { rel: "token_endpoint", href: "https://tokens.indieauth.com/token" }],
      // WebMention
      ["link", { rel: "webmention", href: "https://webmention.io/blog-v3.kemiaosw.top/webmention" }],
      ["link", { rel: "pingback", href: "https://webmention.io/blog-v3.kemiaosw.top/xmlrpc" }],
      ['script', { 
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ 
          "@context": "https://schema.org", 
          "@type": "WebSite",
          "url": "https://blog-v3.kemiaosw.top",
          "potentialAction": {
            "@type": "InteractAction",
            "name": "发送WebMention",
            "target": "https://webmention.io/blog-v3.kemiaosw.top/webmention"
          }
        })
      }],
      ['script', { 
        src: 'https://jsd.cdn.sinzmise.top/npm/@ruffle-rs/ruffle'
      }],
      // RSS
      [
        "link",
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS",
          href: "https://blog-v3.kemiaosw.top/rss.xml",
        },
      ],
      // 预载 CDN
      [
        "link",
        {
          crossorigin: "",
          rel: "preconnect",
          href: "https://s1.hdslb.com",
        },
      ],
      [
        "link",
        {
          crossorigin: "",
          rel: "preconnect",
          href: "https://mirrors.sustech.edu.cn",
        },
      ],
      // HarmonyOS font
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css",
        },
      ],
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/lxgw-wenkai-screen-webfont/1.7.0/style.css",
        },
      ],
      // iconfont
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css",
        },
      ],
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "//at.alicdn.com/t/c/font_5012804_xl6gxco9da.css",
        },
      ],
      // Embed code
      ["link", { rel: "preconnect", href: "https://use.sevencdn.com" }],
      ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
      [
        "link",
        {
          crossorigin: "anonymous",
          href: "https://use.sevencdn.com/css2?family=Fira+Code:wght@300..700&display=swap",
          rel: "stylesheet",
        },
      ],
      // Algolia相关
      ["meta", { name: "algolia-site-verification", content: "072F0A41661AE537" }],
      // Font Awesome
      [
        "script",
        {
          src: "https://jsd.cdn.sinzmise.top/npm/@fortawesome/fontawesome-free/js/all.min.js",
        },
      ],
    ],
  },
  // 导航栏菜单
  nav: [
    {
      text: "文章",
      items: [
        { text: "归档", link: "/pages/archives", symbol: "icon-archives" },
        { text: "分类", link: "/pages/categories", symbol: "icon-fenlei" },
        { text: "标签", link: "/pages/tags", symbol: "icon-tag" },
      ],
    },
    {
      text: "友链",
      items: [
        { text: "友人帐", link: "/pages/link", symbol: "icon-LINKS" },
        { text: "朋友圈", link: "/pages/circle", symbol: "icon-wechat-friend" },
        { text: "留言板", link: "/pages/comments", symbol: "icon-liuyanban" },
      ],
    },
    {
      text: "我的",
      items: [
        { text: "微语", link: "/pages/shuoshuo", symbol: "icon-taolun" },
        // { text: "音乐馆", link: "https://music.kemiao.online/", target: '_blank', symbol: "icon-Music", newtab: true },
        // { text: "相册", link: "https://plog.kemeow.top/", symbol: "icon-xiangce" },
        { text: "关于本站", link: "/pages/about", symbol: "icon-about" },
      ],
    },
    // {
    //   text: "穿梭",
    //   newtab: true,
    //   items: [
    //     { text: "十年之约", link: "https://www.foreverblog.cn/go.html", symbol: "icon-pjh-chongdonglogo" },
    //     { text: "个站商店", link: "https://storeweb.cn/s/1707", symbol: "icon-pjh-shangdian" },
    //     { text: "博客录", link: "https://boke.lu/sj", symbol: "icon-pjh-blog" },
    //     { text: "空间穿梭", link: "https://www.blogsclub.org/go", symbol: "icon-pjh-chuansuokuang" },
    //   ],
    // },
  ],
  // 导航栏菜单 - 左侧
  navMore: [
    {
      name: "网站",
      list: [
        {
          icon: "https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp",
          name: "首页",
          url: "/",
        },
        {
          icon: "https://www.zhilu.site/api/avatar.png",
          name: "克喵的主页",
          url: "https://home.kemeow.top/",
        },
        {
          icon: "https://img.314926.xyz/images/2025/08/16/telegram.webp",
          name: "电报频道",
          url: "https://t.me/kemiaofx_me",
        },
        {
          icon: "https://imgtg.kemeow.top/file/AgACAgUAAyEGAAScqokCAANTaLhKy6KaXlbuAo_rglIAAZtyJvS1AAJkyTEbvR_AVQtiwDuxSlBEAQADAgADeAADNgQ.webp",
          name: "相册",
          url: "https://plog.kemeow.top/",          
        },
        {
          icon: "https://imgtg.kemeow.top/file/AgACAgUAAyEGAAScqokCAANVaLhLUDXZR606eUWuat0MRWdG8TsAAmvJMRu9H8BVA0Q3X6Yzb7kBAAMCAAN4AAM2BA.webp",
          name: "音乐馆",
          url: "https://music.kemiao.online/",          
        },
      ],
    },
  ],
  // 封面配置
  cover: {
    // 是否开启双栏布局
    twoColumns: true,
    // 是否开启封面显示
    showCover: {
      // 是否开启封面显示 文章不设置cover封面会显示异常，可以设置下方默认封面
      enable: true,
      // 封面布局方式: left | right | both
      coverLayout: 'both',
      // 默认封面(随机展示)
      defaultCover: [
        'https://img.314926.xyz/images/2025/07/30/cover5.webp',
        'https://img.314926.xyz/images/2025/07/30/jihuangcover.webp',
        'https://img.314926.xyz/images/2025/07/30/cover8.webp',
        'https://img.314926.xyz/images/2025/08/08/cover16.webp',
        'https://img.314926.xyz/images/2025/08/15/cover18.webp',
        'https://img.314926.xyz/images/2025/08/15/cover19.webp',
        'https://img.314926.xyz/images/2025/08/15/cover20.webp',
        'https://img.314926.xyz/images/2025/08/15/cover21.webp',
        'https://img.314926.xyz/images/2025/08/15/cover22.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/10.54xj90fai0.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/11.4g49ozrrhv.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/12.7p3dlnf8wi.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/13.3uum2oxazj.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/14.7i05q7t3hn.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/15.pf43r2w3d.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/16.2doh0xt6a1.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/17.5q76vb9qmr.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/18.839tcinjtm.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/19.7p2f61ijp.webp',
        // 'https://images1.blog.sinzmise.top/ba/pc/20.ibw8bgqp8.webp',
      ]
    }
  },
  // 页脚信息
  footer: {
    // 社交链接（请确保为偶数个）
    social: [
      {
        icon: "email",
        link: "mailto:me@mail.kemeow.top",
      },
      {
        icon: "telegram",
        link: "https://t.me/KemiaoJun",
      },
      {
        icon: "twitter-x",
        link: "https://x.com/kemiaofxjun",
      },
      {
        icon: "github",
        link: "https://github.com/kemiaofxjun/",
      },
      {
        icon: "bilibili",
        link: "https://space.bilibili.com/3546643173477234",
      },
      {
        icon: "qq",
        link: "https://res.abeim.cn/api/qq/?qq=3149261770",
      },
    ],
    // sitemap
    sitemap: [
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/pages/categories" },
          { text: "全部标签", link: "/pages/tags" },
          { text: "文章归档", link: "/pages/archives", newTab: true },
        ],
      },
      {
        text: "项目",
        items: [
          { text: "个人主页", link: "https://home.kemeow.top/", newTab: true },
          { text: "hexo-solitude", link: "https://myboke.kemiaosw.top/", newTab: true },
          { text: "网址检测", link: "https://status.kemeow.top/", newTab: true },
        ],
      },
      {
        text: "联系",
        items: [
          { text: "TG频道", link: "https://t.me/kemiaofx_me", newTab: true },
          { text: "TG群组", link: "https://t.me/kemiao_me", newTab: true },
        ],
      },
      {
        text: "导航",
        items: [
          { text: "导航", link: "https://nav.kemeow.top/", newTab: true },
          // { text: "浪海导航", link: "https://www.langhai.net/", newTab: true },
        ],
      },
    ],
  },
  // 评论
  comment: {
    enable: true,
    // 评论系统选择
    // artalk / twikoo / waline
    type: "waline",
    // artalk
    // https://artalk.js.org/
    artalk: {
      site: "汐塔魔法屋",
      server: "https://artalk.sinzmise.top",
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      // 必填，若不想使用 CDN，可以使用 pnpm add twikoo 安装并引入
      js: "https://jsd.cdn.sinzmise.top/npm/twikoo/dist/twikoo.all.min.js",
      envId: "https://tk.pl.blog.sinzmise.top/",
      // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
      region: "ap-shanghai",
      lang: "zh-CN",
    },
        // twikoo
    // https://twikoo.js.org/
    waline: {
      // 必填
      css: 'https://jsd.cdn.sinzmise.top/npm/@waline/client/dist/waline.css',
      js: "https://jsd.cdn.sinzmise.top/npm/@waline/client/dist/waline.umd.js",
      serverURL: "https://waline.kemeow.top/",
      lang: "zh-CN",
      placeholder: '克喵的waline评论',
      login: 'enable',
      recaptchaV3Key: '',
      emoji: [
        'https://jsd.cdn.sinzmise.top/npm/@waline/emojis@1.2.0/bmoji',
        '//jsd.cdn.sinzmise.top/npm/@waline/emojis@1.2.0/bilibili',
        'https://jsd.cdn.sinzmise.top/gh/GamerNoTitle/ValineCDN@master/Menhera-chan',
        'https://files.blog.sinzmise.top/emotes/ba',
        '//files.blog.sinzmise.top/emotes/azurlane',
        '//files.blog.sinzmise.top/emotes/a-li/png',
        '//files.blog.sinzmise.top/emotes/a-li/gif'
      ]
    },
  },
  // 侧边栏
  aside: {
    // 站点简介
    hello: {
      enable: true,
      text: `<span class="h-card">
      <img class="u-photo" style='display:none' src="https://img.314926.xyz/images/2025/08/09/kemiaofxjun.webp"/>
      昵称：<a class="p-name u-url" href="https://home.kemeow.top">克喵爱吃卤面•KeMiao</a><br>
      邮箱：<a class="u-email" href="mailto:me@mail.kemeow.top">me@mail.kemeow.top</a><br>
      <div class="p-note">欢迎来到克喵的博客！</div><br>
      如果您遇到网站的任何问题，优先<kbd>CTRL</kbd>+<kbd>F5</kbd>刷新一下。<br>
      还有什么问题建议直接邮箱联系我。
      </span>`,
    },
    // 目录
    toc: {
      enable: true,
    },
    // 标签
    tags: {
      enable: true,
    },
    // 倒计时
    countDown: {
      enable: true,
      // 倒计时日期
      data: {
        name: "春节",
        date: "2026-02-17",
      },
    },
    // 站点数据
    siteData: {
      enable: true,
      links: [
        // { 
        //   title: "无聊湾 🥱 The Boring Bay",
        //   href: "https://boringbay.com",
        //   image: "https://boringbay.com/api/badge/blog-v3.kemiaosw.top"
        // },
        // { 
        //   title: "BlogsClub 博阅榜",
        //   href: "https://www.blogsclub.org/rank.html",
        //   image: "https://www.blogsclub.org/badge/blog.storical.space"
        // },
        // { 
        //   title: "Web Site Hit Counter",
        //   href: "https://www.easycounter.com/",
        //   image: "https://www.easycounter.com/counter.php?szninty"
        // },
        { 
          title: "本站已经支持HTTP/3",
          href: "https://http3.wcode.net/?q=blog-v3.kemiaosw.top",
          image: "https://http3.wcode.net/badges/http3.svg?host=blog-v3.kemiaosw.top"
        },
      ]
    },
  },
  // 友链朋友圈
  fc: {
    api: 'https://fc.kemeow.top/',
    number: 20,
    errorImg: 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico'
  },
  // 音乐播放器
  // https://github.com/imsyy/Meting-API
  music: {
    enable: true,
    // url
    url: "https://meting.051531.xyz/api",
    // id
    id: 13681647281,
    // netease / tencent / kugou
    server: "netease",
    // playlist / album / song
    type: "playlist",
  },
  // 搜索
  // https://www.algolia.com/
  search: {
    enable: true,
    type: 'algolia',
    algolia:{
      appId: "CNRPTJAH7X",
      apiKey: "9345638525b4827d961de611e6b3e196",
      index: "blog_v3_kemiaosw_top_cnrptjah7x_articles"
    }
  },
  // 打赏
  rewardData: {
    enable: true,
    // 微信二维码
    wechat: "https://img.314926.xyz/images/2025/07/12/wechat.webp",
    // 支付宝二维码
    alipay: "https://img.314926.xyz/images/2025/07/12/alipay.webp",
  },
  // 图片灯箱
  fancybox: {
    enable: true,
    js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.min.js",
    css: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css",
  },
  // 外链中转
  jumpRedirect: {
    enable: true,
    // 排除类名
    exclude: [
      "cf-friends-link",
      "upyun",
      "icp",
      "author",
      "rss",
      "cc",
      "power",
      "social-link",
      "link-text",
      "travellings",
      "foreverblog",
      "post-link",
      "report",
      "more-link",
      "skills-item",
      "right-menu-link",
      "link-card",
      "link-child-btn",
      "email",
    ],
  },
  // 站点统计
  status: {
    umami:{
      enable: true,
      src: 'https://umami.status.sinzmise.top/a8f9c04189c7d6a2b6b03f4f3948ef41',
      id: 'f18a2137-2dfe-45b9-a524-21413e09bd68'
    }
  },
  // WebMention
  webmention:{
    enable: true,
  },
  // IndieWeb Webring
  indiewebring: true,
  // Iconfont JS
  iconfont: '//at.alicdn.com/t/c/font_5012804_xl6gxco9da.js',
  // AI摘要
  postsummary: {
    enable: false,
    use: 'cloudflare', // fakegpt/cloudflare
    cloudflare: {
      api: 'https://summary.blog.sinzmise.top',
      model: 'llama-3.1-8b-instruct'
    }
  },
  chatroom: {
    css: 'https://jsd.cdn.sinzmise.top/gh/awaae001/htmls@main/ChatRoom/main.css'
  }
};
