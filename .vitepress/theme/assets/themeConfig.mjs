// 主题配置
export const themeConfig = {
  // 站点信息
  siteMeta: {
    // 站点标题
    title: "汐塔魔法屋",
    // 站点描述
    description: "听，是潮汐的声音",
    // 站点logo
    logo: "/images/logo/logo.webp",
    // 站点地址
    site: "https://blog.storical.space",
    // 语言
    lang: "zh-CN",
    // 作者
    author: {
      name: "王九弦SZ·Ninty",
      cover: "https://images1.blog.sinzmise.top/profile/avatar.avif",
      email: "email@sinzmise.top",
      link: "https://www.storical.space",
    },
  },
  // 备案信息
  // icp: "萌ICP备114514号",
  // 建站日期
  since: "2020-07-28",
  // 每页文章数据
  postSize: 8,
  // inject
  inject: {
    // 头部
    // https://vitepress.dev/zh/reference/site-config#head
    header: [
      // favicon
      ["link", { rel: "icon", href: "/favicon.ico" }],
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
      // 预载 DocSearch
      [
        "link",
        {
          href: "https://QAS05YI2PH-dsn.algolia.net",
          rel: "preconnect",
          crossorigin: "",
        },
      ],
    ],
  },
  // 导航栏菜单
  nav: [
    {
      text: "文章",
      items: [
        { text: "归档", link: "/pages/archives", icon: "article" },
        { text: "分类", link: "/pages/categories", icon: "folder" },
        { text: "标签", link: "/pages/tags", icon: "hashtag" },
      ],
    },
    {
      text: "友链",
      items: [
        // { text: "友链鱼塘", link: "/pages/friends", icon: "fish" },
        { text: "友人帐", link: "/pages/link", icon: "people" },
      ],
    },
    {
      text: "我的",
      items: [
        { text: "关于本站", link: "/pages/about", icon: "contacts" },
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
          name: "博客站",
          url: "/",
        },
        {
          icon: "/images/icon.png",
          name: "个人主页",
          url: "https://www.storical.space/",
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
    ],
  },
  // 评论
  comment: {
    enable: true,
    // 评论系统选择
    // artalk / twikoo
    type: "artalk",
    // artalk
    // https://artalk.js.org/
    artalk: {
      site: "汐塔魔法屋",
      server: "https://artalk.sinzmise.top/",
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      // 必填，若不想使用 CDN，可以使用 pnpm add twikoo 安装并引入
      js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/twikoo/1.6.39/twikoo.all.min.js",
      envId: "",
      // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
      region: "ap-shanghai",
      lang: "zh-CN",
    },
  },
  // 侧边栏
  aside: {
    // 站点简介
    hello: {
      enable: true,
      text: `<span class="h-card">
      <img class="u-photo" style='display:none' src="https://images1.blog.sinzmise.top/profile/avatar.avif"/>
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
    },
  },
  // 友链
  friends: {
    // 友链朋友圈
    circleOfFriends: "",
    // 动态友链
    dynamicLink: {
      server: "",
      app_token: "",
      table_id: "",
    },
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
    enable: false,
    appId: "QAS05YI2PH",
    apiKey: "ca5f8dbdbff910816e2995bfd16c2b27",
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
      "post-link",
      "report",
      "more-link",
      "skills-item",
      "right-menu-link",
      "link-card",
    ],
  },
  // 站点统计
  tongji: {
    "51la": "",
  },
  // WebMention
  webmention:{
    enable: true,
    url: 'blog.storical.space',
    token: 'BUDcxWH7PTphGZE7n6NTpA',
  },
};
