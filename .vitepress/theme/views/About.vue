<template>
  <div class="about">
    <h1 class="title">关于本站</h1>
    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 介绍 -->
      <div class="about-item hello">
        <span class="text1">你好，很高兴认识你👋</span>
        <span class="text2 title2">我是 克喵爱吃卤面·KeMiao</span>
        <span class="text3">只是一名 博主</span>
      </div>
      <!-- 追求 -->
      <div class="about-item pursuit">
        <span class="tip">记录生活</span>
        <span class="title2">分享资源</span>
        <span class="title2">踩坑教程</span>
        <span class="title2">希望我的博文能帮助到你！</span>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 2fr 3fr">
      <!-- 技能 -->
      <div class="about-item skills">
        <span class="tip">技能</span>
        <span class="title2">开启创造力</span>
        <div class="skills-list">
          <a
            v-for="(item, index) in skillsData"
            :key="index"
            :style="{ '--color': item.color }"
            :href="item.link"
            class="skills-item"
            target="_blank"
          >
            <div class="skills-logo">
              <i :class="`iconfont icon-${item.icon}`"></i>
            </div>
            <span class="skills-name">{{ item.name }}</span>
          </a>
        </div>
      </div>
      <!-- 生涯 -->
      <div class="about-item career">
        <span class="tip">生涯</span>
        <span class="title2">
          <i>进步了吗？</i>
        </span>
        <div class="list">
          <span class="list-item" style="--color: #357ef5">一个没有实力的普通人在笨拙地学习~</span>
        </div>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 性格 -->
      <div class="about-item character" style="--color: #4298b4">
        <span class="tip">性格</span>
        <span class="title2">提倡者</span>
        <span class="title2" style="color: var(--color)">INFJ</span>
        <span class="more">
          在
          <a href="https://www.16personalities.com/ch/" target="_blank">16personalities</a>
          了解更多关于
          <a href="https://www.16personalities.com/infj-personality?utm_source=welcome-turbulent-campaigner&utm_medium=email&utm_campaign=results&utm_content=type-personality-0" target="_blank">
            提倡者
          </a>
        </span>
        <img
          src="https://www.16personalities.com/static/images/personality-types/avatars/email/large/INFJ_male.png?v=1"
          alt="male"
          class="male"
        />
      </div>
      <!-- 座右铭 -->
      <div class="about-item">
        <span class="tip">座右铭</span>
        <span class="title1" style="margin-top: 20px">愿你看清一切真相后，</span>
        <span class="title2">依旧热爱你的家人和朋友。</span>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 1fr 1fr">
      <div
        class="about-item like image"
        style="
          --color: #0c0e20;
          background-image: url(https://jsd.cdn.sinzmise.top/gh/SinzMise/picx-images-hosting@master/20240120/Blue_archive_main_picture.1xn3v0svk0ao.webp);
        "
      >
        <div class="image-content">
          <span class="tip">爱好游戏</span>
          <span class="title2">蔚蓝档案</span>
          <div class="image-desc">
            <span class="left">手机、电脑及软硬件</span>
          </div>
        </div>
      </div>
      <div
        class="about-item like image"
        style="
          --color: #7b3c25;
          background-image: url(https://p1.music.126.net/nd_hrcffrO41ho9kwvh6mQ==/109951163026324216.jpg);
        "
      >
        <div class="image-content">
          <span class="tip">音乐偏好</span>
          <span class="title2">纯音乐、ACG</span>
          <div class="image-desc">
            <span class="left">一起欣赏更多音乐</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 2fr 3fr">
      <!-- 数据 -->
      <div
        class="about-item static image"
        style="
          --color: #0f1114;
        "
      >
        <div class="image-content">
          <span class="tip">数据</span>
          <span class="title2">访问统计</span>
          <div class="static-data">
            <div class="static-item">
              <span class="static-name">使用的是</span>
              <span class="static-num">Umami</span>
            </div>
          </div>
          <div class="image-desc opacity">
            <span class="left">
              可在 <a href="https://umami.status.sinzmise.top/share/OaBMl3SHl8e9fyMJ/blog.storical.space" target="_blank">这里</a> 查看
            </span>
          </div>
        </div>
      </div>
      <!-- 信息 -->
      <div class="about-item child">
        <div
          class="about-item map image"
          style="background-image: url(http://files.blog.sinzmise.top/images/msedge_rW8coY9Rbh.png)"
        >
          <span class="position">我现在住在 <strong>中国，广东省 潮州市</strong></span>
        </div>
        <div class="about-item info">
          <div class="info-item">
            <span class="info-name">生于</span>
            <span class="info-num" style="--color: #43a6c6">2007</span>
          </div>
          <div class="info-item">
            <span class="info-name">现在职业</span>
            <span class="info-num" style="--color: #dfac46">只是一名学生</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 博客搭建历程 -->
    <div class="about-content" style="display: flex">
      <div class="about-item">
        <span class="tip">博客搭建历程</span>
        <span class="title2">从个人网站到博客</span>
        <p class="text">
          19年的时候，我尝试着用<strong>Utool的内网穿透+IIS</strong>搞了我的第一个个人网站，但是因为<strong>耗电量太大</strong>所以这个网站搞着搞着没了
        </p>
        <p class="text">
          后面意外找到了免费的虚拟主机，所以那次开始我就搞了我的第一个个人博客，使用的<strong>Z-Blog PHP</strong>，但是那个虚拟主机商跑路了，只能就此作罢，再次寻找免费的虚拟主机
        </p>
        <p class="text">
          后面发现了<strong>Hexo + Github Pages</strong>能实现无服务器部署博客，我搭建静态博客之路也就此开始
        </p>
        <p class="text">
          第一次搭建静态博客，用的是<strong>Hexo-Theme-NexT</strong>主题，后面也试过自己做主题什么的
        </p>
        <p class="text">
          但是随着时间的推移，Hexo博客的加载速度越来越慢，最终我在2025年上半年换掉了这个我使用了4年的框架
        </p>
        <p class="text">
          初次换掉Hexo框架的是Valaxy，这个框架经历很多人推荐，klcdm和小何也用的这个框架，所以我就试了一下
        </p>
        <p class="text">
          结果因为tab的问题，不得不再次换框架，最终换成了<strong>VitePress</strong>，使用的是<strong>Curve</strong>主题
        </p>
        <psw class="text">
          （希望后面不会再换框架或者主题了。。。。。。换来换去我自己都累啊。。。。。。）
        </psw>
      </div>
    </div>
    <!-- 加入的博客联盟 -->
    <div class="about-content" style="display: flex">
      <div class="about-item">
        <span class="tip">加入的博客联盟</span>
        <span class="title2">同时也是这里面的成员呢~~</span>
        <div class="joined-list">
          <a
            v-for="(item, index) in Joined"
            :key="index"
            :style="{ '--color': item.color }"
            :href="item.link"
            class="joined-item"
            target="_blank"
          >
            <span class="joined-name">{{ item.text }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 我加入的
const Joined = [
  { text: "集博栈（原中文博客列表导航）", link: "https://www.zhblogs.net/"},
  { text: "BlogFinder", link: "https://bf.zzxworld.com/s/995"},
  { text: "博友圈", link: "https://www.boyouquan.com"},
  { text: "博客录", link: "https://boke.lu/"},
  { text: "十年之约", color: "#3776AB", link: "https://www.foreverblog.cn/blog/6371.html"},
  { text: "RssBlog", link: "https://rssblog.cn/member/d711afd659d65c2ba2d3b18697818cf7/"},
  { text: "笔墨迹", link: "https://blogscn.fun/"},
  { text: "BlogsClub", link: "https://www.blogsclub.org/blog/99.html"},
  { text: "揪蝉", link: "https://jiuchan.org"},
];
// 技能数据
const skillsData = [
  {
    name: "JavaScript",
    color: "#f1e05abd",
    icon: "javascript",
    link: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
  },
  {
    name: "HTML5",
    color: "#e34f26",
    icon: "html5",
    link: "https://developer.mozilla.org/zh-CN/docs/Web/HTML",
  },
  {
    name: "CSS3",
    color: "#563d7c",
    icon: "css3",
    link: "https://developer.mozilla.org/zh-CN/docs/Web/CSS",
  },
  {
    name: "Vue",
    color: "#41b883",
    icon: "vue",
    link: "https://cn.vuejs.org/",
  },
  {
    name: "Node.js",
    color: "#026E00",
    icon: "nodejs",
    link: "https://nodejs.org/",
  },
  {
    name: "Python",
    color: "#3776AB",
    icon: "python",
    link: "https://www.python.org/",
  },
  {
    name: "Git",
    color: "#F05032",
    icon: "git",
    link: "https://git-scm.com/",
  },
  {
    name: "Photoshop",
    color: "#31A8FF",
    icon: "photoshop",
    link: "https://www.adobe.com/cn/lead/creativecloud/business.html",
  },
];
</script>

<style lang="scss" scoped>
.about {
  .title {
    font-size: 2.4rem;
    text-align: center;
    border: none;
  }
  .about-content {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    margin-bottom: 20px;
    .about-item {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 1.2rem 2rem;
      border-radius: 12px;
      background-color: var(--main-card-background);
      border: 1px solid var(--main-card-border);
      box-shadow: 0 8px 12px -4px var(--main-border-shadow);
      overflow: hidden;
      .joined-list {
        margin-top: 12px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .joined-item {
          display: flex;
          align-items: center;
          margin-right: 10px;
          margin-top: 10px;
          padding: 8px 12px 8px 8px;
          border-radius: 40px;
          background-color: var(--main-site-background);
          border: 1px solid var(--main-card-border);
          box-shadow: 0 8px 12px -4px var(--main-border-shadow);
          transition: background-color 0.3s;
          cursor: pointer;
          .joined-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            margin-right: 8px;
            border-radius: 50%;
            background-color: var(--color);
            .iconfont {
              color: #fff;
            }
          }
          .joined-name {
            font-weight: bold;
            transition: color 0.3s;
          }
          &:hover {
            background-color: var(--main-card-background);
          }
        }
      }
      .tip {
        font-size: 14px;
        opacity: 0.8;
        margin-bottom: 12px;
      }
      .title1 {
        font-size: 36px;
        font-weight: bold;
        opacity: 0.6;
      }
      .title2 {
        font-size: 36px;
        font-weight: bold;
        margin-right: 4rem;
      }
      .text {
        font-size: 18px;
        margin: 0.6rem 0;
      }
      &.child {
        background-color: transparent;
        border: none;
        box-shadow: none;
        padding: 0;
        gap: 20px;
        .about-item {
          height: 100%;
        }
      }
      &.hello {
        justify-content: center;
        padding: 2rem;
        color: #fff;
        background-image: linear-gradient(120deg, #5b27ff 0%, #00d4ff 100%);
        background-size: 200% 200%;
        animation: gradientFlow 6s ease infinite;
        .title2 {
          line-height: 2;
        }
      }
      &.pursuit {
        .title2 {
          line-height: 1.2;
          &:last-child {
            display: inline-block;
            background-size: 100% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-repeat: no-repeat;
            background-image: linear-gradient(45deg, #fa7671 50%, #f45f7f);
          }
        }
      }
      &.character {
        min-height: 220px;
        cursor: pointer;
        .more {
          margin-top: auto;
          font-size: 14px;
          color: var(--main-color-gray);
          a {
            color: var(--main-color-gray);
            &:hover {
              color: var(--color);
            }
          }
        }
        .male {
          position: absolute;
          top: 20px;
          right: -10px;
          height: 140%;
          width: auto;
          transition: transform 0.5s;
          transform-origin: top center;
          @media (max-width: 768px) {
            height: 80%;
          }
        }
        &:hover {
          .male {
            transform: scale(1.2);
          }
        }
      }
      &.skills {
        .skills-list {
          margin-top: 12px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .skills-item {
            display: flex;
            align-items: center;
            margin-right: 10px;
            margin-top: 10px;
            padding: 8px 12px 8px 8px;
            border-radius: 40px;
            background-color: var(--main-site-background);
            border: 1px solid var(--main-card-border);
            box-shadow: 0 8px 12px -4px var(--main-border-shadow);
            transition: background-color 0.3s;
            cursor: pointer;
            .skills-logo {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
              margin-right: 8px;
              border-radius: 50%;
              background-color: var(--color);
              .iconfont {
                color: #fff;
              }
            }
            .skills-name {
              font-weight: bold;
              transition: color 0.3s;
            }
            &:hover {
              background-color: var(--main-card-background);
            }
          }
        }
      }
      &.career {
        .title2 {
          letter-spacing: 0.2rem;
          font-size: 40px;
        }
        .list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          .list-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 12px;
            color: var(--main-font-second-color);
            &::before {
              content: "";
              display: block;
              width: 16px;
              height: 16px;
              background-color: var(--color);
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }
        .career-img {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          @media (max-width: 768px) {
            position: static;
          }
        }
      }
      &.game {
        min-height: 300px;
        @media (max-width: 768px) {
          min-height: 240px;
        }
      }
      &.like {
        min-height: 400px;
        @media (max-width: 768px) {
          min-height: 300px;
        }
      }
      &.image {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        .image-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          z-index: 2;
          color: #fff;
          .image-desc {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;
            &.opacity {
              font-size: 14px;
              color: #eee;
              opacity: 0.8;
              a {
                color: #eee;
                &:hover {
                  color: var(--main-color);
                }
              }
            }
          }
        }
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: inset 0 -70px 204px 10px var(--color);
          z-index: 0;
        }
      }
      &.static {
        .static-data {
          display: grid;
          gap: 12px;
          grid-template-columns: 1fr 1fr;
          margin: 20px 0;
          .static-item {
            display: flex;
            flex-direction: column;
            .static-name {
              font-size: 15px;
              opacity: 0.8;
            }
            .static-num {
              font-size: 34px;
              font-weight: bold;
            }
          }
        }
      }
      &.map {
        min-height: 170px;
        background-size: 100%;
        transition: background 1.5s ease-in-out;
        cursor: pointer;
        @media (max-width: 768px) {
          background-size: cover;
          pointer-events: none;
        }
        .position {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 20px 30px;
          color: #fff;
          background-color: #636352;
          font-size: 20px;
          transition: bottom 1s;
        }
        &:hover {
          background-size: 120%;
          background-position-x: 0;
          background-position-y: 36%;
          .position {
            bottom: -80px;
          }
        }
      }
      &.info {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .info-item {
          display: flex;
          flex-direction: column;
          margin-right: 32px;
          .info-name {
            font-size: 14px;
            margin-bottom: 8px;
            color: var(--main-font-second-color);
          }
          .info-num {
            font-size: 34px;
            font-weight: bold;
            color: var(--color);
          }
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
