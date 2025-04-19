import { defineSiteConfig } from "valaxy";

export default defineSiteConfig({
  url: "https://blog.storical.space",
  favicon: "/favicon.ico",
  lang: "zh-CN",
  title: "汐塔魔法屋",
  author: {
    name: "王九弦SZ·Ninty",
    avatar: "https://images1.blog.sinzmise.top/profile/avatar.avif",
    email: "email@sinzmise.top",
    link: "https://www.storical.space",
  },
  description: "欢迎各位来到这个空间当中的小屋",
  subtitle: "来逛逛吧！",

  feed: {
    favicon: "https://images1.blog.sinzmise.top/profile/icon.avif",
  },

  cdn: {
    prefix: "https://jsd.cdn.sinzmise.top/npm/",
  },

  social: [
    {
      name: "GitHub",
      link: "https://github.com/SinzMise",
      icon: "ri-github-line",
      color: "#6e5494",
    },
    {
      name: "哔哩哔哩",
      link: "https://space.bilibili.com/479627766",
      icon: "ri-bilibili-line",
      color: "#FF8EB3",
    },
    {
      name: "E-Mail",
      link: "mailto:email@sinzmise.top",
      icon: "ri-mail-line",
      color: "#8E71C1",
    },
  ],

  search: {
    enable: true,
    type: "fuse",
  },

  sponsor: {
    enable: true,
    description: "给我打钱，助力汐塔计划能够启动（划掉",
    methods: [
      {
        name: "支付宝",
        url: "/images/a28f41b28eb936764b8111c4cedb0e8.jpg",
        color: "#00A3EE",
        icon: "i-ri-alipay-line",
      },
    ],
  },

  comment: {
    enable: true,
  },

  mediumZoom: {
    enable: true,
  },

  statistics: {
    enable: true,
  },

  vanillaLazyload: {
    enable: false,
  },
});
