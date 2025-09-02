<template>
  <!-- 说说容器 -->
  <div id="artitalk_main"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

// LeanCloud 配置，请改成你自己的
const ARTITALK_CONFIG = {
  appId: '20In9roWavNrTMj76UmVEALE-MdYXbMMI',
  appKey: 'Y8DPaodZp5fsFEFLMTwj2QEk',
  serverURL: 'https://artitalk.314926.xyz',
  pageSize: 50,
  shuoPla: '',
  motion: 1,
  atComment: 1,
  bgImg: '',
  color1: '#ffffff',
  color2: '#ffffff',
  color3: '#3b9a9c',
}

// 脚本 URL
const ARTITALK_JS_URL = 'https://unpkg.com/artitalk'

/* ----------- 2. 动态加载 & 初始化 Artitalk ----------- */
let scriptEl = null

const loadArtitalk = () => {
  if (window.Artitalk) {           // 已加载过
    initArtitalk()
    return
  }

  scriptEl = document.createElement('script')
  scriptEl.src = ARTITALK_JS_URL
  scriptEl.async = true
  scriptEl.setAttribute('data-pjax', '')
  document.head.appendChild(scriptEl)
  scriptEl.onload = initArtitalk
}

const initArtitalk = () => {
  if (!window.Artitalk) return
  new window.Artitalk(ARTITALK_CONFIG)
  fixAvatar()                      // 立刻修复头像
}

const unloadArtitalk = () => {
  if (scriptEl) {
    scriptEl.remove()
    scriptEl = null
  }
  if (window.Artitalk) {
    delete window.Artitalk
  }
}

/* ----------- 3. 强制修复头像拉伸 ----------- */
const fixAvatar = () => {
  const timer = setInterval(() => {
    // 抓取所有疑似头像
    const imgs = document.querySelectorAll(
      '#artitalk_main img[src*="qcloud"], ' +
      '#artitalk_main img[class*="avatar"], ' +
      '#artitalk_main .artitalk-avatar img, ' +
      '#artitalk_main .atk-avatar img'
    )
    if (imgs.length) {
      imgs.forEach((img) => {
        img.style.width = '48px'
        img.style.height = '48px'
        img.style.objectFit = 'cover'
        img.style.borderRadius = '50%'
      })
      clearInterval(timer)
    }
  }, 200)

  setTimeout(() => clearInterval(timer), 6000) // 6 秒后停止尝试
}

/* ----------- 4. 生命周期 ----------- */
onMounted(() => {
  loadArtitalk()
})
onBeforeUnmount(() => {
  unloadArtitalk()
})
</script>

<style scoped>
/* 容器简单留间距，避免贴边 */
#artitalk_main {
  margin-top: 1rem;
}
</style>