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
    link: '',
    text: '',
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
      ["link", { rel: "authorization_endpoint", href: "https://indieauth.com/auth" }],
      ["link", { rel: "token_endpoint", href: "https://tokens.indieauth.com/token" }],
      // WebMention
      ["link", { rel: "webmention", href: "https://webmention.io/blog.storical.space/webmention" }],
      ["link", { rel: "pingback", href: "https://webmention.io/blog.storical.space/xmlrpc" }],
      ['script', { 
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ 
          "@context": "https://schema.org", 
          "@type": "WebSite",
          "url": "https://blog.storical.space",
          "potentialAction": {
            "@type": "InteractAction",
            "name": "发送WebMention",
            "target": "https://webmention.io/blog.storical.space/webmention"
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
          href: "https://blog.storical.space/rss.xml",
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
          href: "//at.alicdn.com/t/c/font_4199232_5a15rygopns.css",
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
      ["meta", { name: "algolia-site-verification", content: "21268A4938445E1D" }],
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
        { text: "归档", link: "/pages/archives", symbol: "icon-pjh-wenzhang" },
        { text: "分类", link: "/pages/categories", symbol: "icon-pjh-fenlei" },
        { text: "标签", link: "/pages/tags", symbol: "icon-pjh-qunfariji" },
      ],
    },
    {
      text: "友链",
      items: [
        { text: "友人帐", link: "/pages/link", symbol: "icon-pjh-lianjie" },
        { text: "朋友圈", link: "/pages/circle", symbol: "icon-pjh-icon_pengyouquan" },
        { text: "留言板", link: "/pages/comments", symbol: "icon-pjh-liuyanban" },
      ],
    },
    {
      text: "我的",
      items: [
        { text: "关于本站", link: "/pages/about", symbol: "icon-pjh-guanyuwomen" },
      ],
    },
    {
      text: "穿梭",
      newtab: true,
      items: [
        { text: "十年之约", link: "https://www.foreverblog.cn/go.html", symbol: "icon-pjh-chongdonglogo" },
        { text: "个站商店", link: "https://storeweb.cn/s/1707", symbol: "icon-pjh-shangdian" },
        { text: "博客录", link: "https://boke.lu/sj", symbol: "icon-pjh-blog" },
        { text: "空间穿梭", link: "https://www.blogsclub.org/go", symbol: "icon-pjh-chuansuokuang" },
      ],
    },
  ],
  // 导航栏菜单 - 左侧
  navMore: [
    {
      name: "项目",
      list: [
        {
          icon: "/images/icon.png",
          name: "魔法屋",
          url: "/",
        },
        {
          icon: "https://www.storical.space/favicon.ico",
          name: "故事空间",
          url: "https://www.storical.space/",
        },
        {
          icon: "https://diary.sinzmise.top/upload/3cf8380460044642b9e11050c7a163c6",
          name: "中弦记事本",
          url: "https://diary.sinzmise.top/",
        },
      ],
    },
  ],
  // 封面配置
  cover: {
    // 是否开启双栏布局
    twoColumns: false,
    // 是否开启封面显示
    showCover: {
      // 是否开启封面显示 文章不设置cover封面会显示异常，可以设置下方默认封面
      enable: true,
      // 封面布局方式: left | right | both
      coverLayout: 'both',
      // 默认封面(随机展示)
      defaultCover: [
        'https://images1.blog.sinzmise.top/ba/pc/01.73tpzcksoy.webp',
        'https://images1.blog.sinzmise.top/ba/pc/02.pf43r2w6h.webp',
        'https://images1.blog.sinzmise.top/ba/pc/03.5tqst12tfi.webp',
        'https://images1.blog.sinzmise.top/ba/pc/04.8ojgyti07r.webp',
        'https://images1.blog.sinzmise.top/ba/pc/05.esaalno2u.webp',
        'https://images1.blog.sinzmise.top/ba/pc/06.86tfa8gmnm.webp',
        'https://images1.blog.sinzmise.top/ba/pc/07.4qr3i56zll.webp',
        'https://images1.blog.sinzmise.top/ba/pc/08.9rj69pdu4s.webp',
        'https://images1.blog.sinzmise.top/ba/pc/09.2veipiuk0n.webp',
        'https://images1.blog.sinzmise.top/ba/pc/10.54xj90fai0.webp',
        'https://images1.blog.sinzmise.top/ba/pc/11.4g49ozrrhv.webp',
        'https://images1.blog.sinzmise.top/ba/pc/12.7p3dlnf8wi.webp',
        'https://images1.blog.sinzmise.top/ba/pc/13.3uum2oxazj.webp',
        'https://images1.blog.sinzmise.top/ba/pc/14.7i05q7t3hn.webp',
        'https://images1.blog.sinzmise.top/ba/pc/15.pf43r2w3d.webp',
        'https://images1.blog.sinzmise.top/ba/pc/16.2doh0xt6a1.webp',
        'https://images1.blog.sinzmise.top/ba/pc/17.5q76vb9qmr.webp',
        'https://images1.blog.sinzmise.top/ba/pc/18.839tcinjtm.webp',
        'https://images1.blog.sinzmise.top/ba/pc/19.7p2f61ijp.webp',
        'https://images1.blog.sinzmise.top/ba/pc/20.ibw8bgqp8.webp',
      ]
    }
  },
  // 页脚信息
  footer: {
    // 社交链接（请确保为偶数个）
    social: [
      {
        icon: "email",
        link: "mailto:email@sinzmise.top",
      },
      {
        icon: "github",
        link: "https://github.com/SinzMise/",
      },
      {
        icon: "bilibili",
        link: "https://space.bilibili.com/479627766",
      },
      {
        icon: "qq",
        link: "https://res.abeim.cn/api/qq/?qq=669506721",
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
          { text: "个人主页", link: "https://www.storical.space/", newTab: true },
          { text: "汐娜故事书", link: "https://mast.sinzmise.top/", newTab: true },
          { text: "魔法监测站", link: "https://monitor.sinzmise.top/", newTab: true },
        ],
      },
      {
        text: "联系",
        items: [
          { text: "一号Q群", link: "https://qm.qq.com/q/U2UTeFiwsU", newTab: true },
          { text: "二号Q群", link: "https://qm.qq.com/q/HxRzzl1VoA", newTab: true },
        ],
      },
      {
        text: "导航",
        items: [
          { text: "博客大全", link: "https://daohang.lusongsong.com/", newTab: true },
          { text: "浪海导航", link: "https://www.langhai.net/", newTab: true },
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
      serverURL: "https://wle.pl.sinzmise.top/",
      lang: "zh-CN",
      placeholder: '就很无语，我搞的Artalk寄了，没办法，只好换评论系统了\n但之前2025.01之后的数据全丢失了啊（悲）',
      login: 'enable',
      recaptchaV3Key: '6LdKGYsrAAAAAJWRy33v5gBwQ6rCHoMZE-r9NHb6',
      emoji: [
        '//jsd.cdn.sinzmise.top/npm/@waline/emojis@1.2.0/bmoji',
        '//jsd.cdn.sinzmise.top/npm/@waline/emojis@1.2.0/bilibili',
        '//jsd.cdn.sinzmise.top/gh/GamerNoTitle/ValineCDN@master/Menhera-chan',
        '//files.blog.sinzmise.top/emotes/ba',
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
      <img class="u-photo" style='display:none' src="https://images1.blog.sinzmise.top/profile/avatar.webp"/>
      昵称：<a class="p-name u-url" href="https://www.storical.space">王九弦SZ·Ninty</a><br>
      邮箱：<a class="u-email" href="mailto:email@sinzmise.top">email@sinzmise.top</a><br>
      <div class="p-note">听，是潮汐的声音在呼唤着我们</div>
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
      enable: false,
      // 倒计时日期
      data: {
        name: "春节",
        date: "2025-01-29",
      },
    },
    // 站点数据
    siteData: {
      enable: true,
      links: [
        { 
          title: "无聊湾 🥱 The Boring Bay",
          href: "https://boringbay.com",
          image: "https://boringbay.com/api/badge/blog.storical.space"
        },
        { 
          title: "BlogsClub 博阅榜",
          href: "https://www.blogsclub.org/rank.html",
          image: "https://www.blogsclub.org/badge/blog.storical.space"
        },
        { 
          title: "Web Site Hit Counter",
          href: "https://www.easycounter.com/",
          image: "https://www.easycounter.com/counter.php?szninty"
        },
        { 
          title: "本站已经支持HTTP/3",
          href: "https://http3.wcode.net/?q=blog.storical.space",
          image: "https://http3.wcode.net/badges/http3.svg?host=blog.storical.space"
        },
      ]
    },
  },
  // 友链朋友圈
  fc: {
    api: 'https://fc.blog.sinzmise.top/',
    number: 20,
    errorImg: 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico'
  },
  // 音乐播放器
  // https://github.com/imsyy/Meting-API
  music: {
    enable: true,
    // url
    url: "https://meting.api.sinzmise.top/api",
    // id
    id: 8253386665,
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
      appId: "9SEUZMI90C",
      apiKey: "e9a109b12467e90882017055d5c5fd67",
      index: "blog_v3_kemiaosw_top_cnrptjah7x_pages"
    }
  },
  // 打赏
  rewardData: {
    enable: false,
    // 微信二维码
    wechat: "https://pic.efefee.cn/uploads/2024/04/07/66121049d1e80.webp",
    // 支付宝二维码
    alipay: "https://pic.efefee.cn/uploads/2024/04/07/661206631d3b5.webp",
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
  iconfont: '//at.alicdn.com/t/c/font_4199232_f0feiwgh0uw.js',
  // AI摘要
  postsummary: {
    enable: true,
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
