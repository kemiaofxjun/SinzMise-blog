<template>
  <div id="friend-circle-lite-root">
    <div id="random-article"></div>
    <div class="articles-container" id="articles-container"></div>
    <button id="load-more-btn" @click="loadMoreArticles">再来亿点</button>
    <div id="stats-container"></div>
    
    <!-- 模态框 -->
    <div id="modal" class="modal" :class="{'modal-open': showModal}" @click.self="hideModal"  v-if="showModal">
      <div class="modal-content">
        <img id="modal-author-avatar" :src="modalData.avatar  || errorImg" @error="handleImgError" alt="">
        <a id="modal-author-name-link" :href="modalData.link">{{  modalData.author  }}</a>
        <div id="modal-articles-container">
          <div class="modal-article" v-for="(article, index) in modalData.articles"  :key="index">
            <a class="modal-article-title" :href="article.link"  target="_blank">{{ article.title  }}</a>
            <div class="modal-article-date">📅{{ formatDate(article.created)  }}</div>
          </div>
        </div>
        <img id="modal-bg" :src="modalData.avatar  || errorImg" @error="handleImgError" alt="">
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import '@/assets/fclite.css'

const { theme } = useData();

// 响应式数据 
const UserConfig = ref({
  private_api_url: theme.value.fc.api,
  page_turning_number: theme.value.fc.number,
  error_img: theme.value.fc.errorImg, 
})
 
const start = ref(0) 
const allArticles = ref([])
const showModal = ref(false)
const modalData = ref({
  author: '',
  avatar: '',
  link: '',
  articles: []
})
const errorImg = ref(theme.value.fc.errorImg) 
 
// 方法 
const initializeFcLite = () => {
  const root = document.getElementById('friend-circle-lite-root') 
  if (!root) return 
 
  // 清除之前的内容 
  root.innerHTML  = ''
 
  // 创建DOM结构 
  const randomArticleContainer = document.createElement('div') 
  randomArticleContainer.id  = 'random-article'
  root.appendChild(randomArticleContainer) 
 
  const container = document.createElement('div') 
  container.className  = 'articles-container'
  container.id  = 'articles-container'
  root.appendChild(container) 
  
  const loadMoreBtn = document.createElement('button') 
  loadMoreBtn.id  = 'load-more-btn'
  loadMoreBtn.innerText  = '再来亿点'
  loadMoreBtn.addEventListener('click',  loadMoreArticles)
  root.appendChild(loadMoreBtn) 
 
  // 创建统计信息容器 
  const statsContainer = document.createElement('div') 
  statsContainer.id  = 'stats-container'
  root.appendChild(statsContainer) 
 
  // 初始加载 
  loadMoreArticles()
}
 
const loadMoreArticles = () => {
  const cacheKey = 'friend-circle-lite-cache'
  const cacheTimeKey = 'friend-circle-lite-cache-time'
  const cacheTime = localStorage.getItem(cacheTimeKey) 
  const now = new Date().getTime()
 
  if (cacheTime && (now - cacheTime < 10 * 60 * 1000)) {
    const cachedData = JSON.parse(localStorage.getItem(cacheKey)) 
    if (cachedData) {
      processArticles(cachedData)
      return 
    }
  }
 
  fetch(`${UserConfig.value.private_api_url}all.json`) 
    .then(response => response.json()) 
    .then(data => {
      localStorage.setItem(cacheKey,  JSON.stringify(data)) 
      localStorage.setItem(cacheTimeKey,  now.toString()) 
      processArticles(data)
    })
    .finally(() => {
      const loadMoreBtn = document.getElementById('load-more-btn') 
      if (loadMoreBtn) loadMoreBtn.innerText  = '再来亿点'
    })
}
 
const processArticles = (data) => {
  allArticles.value  = data.article_data  
  
  // 处理统计数据 
  const stats = data.statistical_data  
  const statsContainer = document.getElementById('stats-container') 
  if (statsContainer) {
    statsContainer.innerHTML  = `
      <div>Powered by: <a href="https://github.com/willow-god/Friend-Circle-Lite"  target="_blank">FriendCircleLite</a><br></div>
      <div>Designed By: <a href="https://www.liushen.fun/"  target="_blank">LiuShen</a><br></div>
      <div>订阅:${stats.friends_num}    活跃:${stats.active_num}    总文章数:${stats.article_num}<br></div> 
      <div>更新时间:${stats.last_updated_time}</div> 
    `
  }
 
  displayRandomArticle()
 
  const articles = allArticles.value.slice(start.value,  start.value  + UserConfig.value.page_turning_number) 
  const container = document.getElementById('articles-container') 
  
  articles.forEach(article  => {
    const card = document.createElement('div') 
    card.className  = 'card'
 
    const title = document.createElement('div') 
    title.className  = 'card-title'
    title.innerText  = article.title  
    title.onclick  = () => window.open(article.link,  '_blank')
    card.appendChild(title) 
 
    const author = document.createElement('div') 
    author.className  = 'card-author'
    const authorImg = document.createElement('img') 
    authorImg.className  = 'no-lightbox'
    authorImg.src  = article.avatar  || UserConfig.value.error_img  
    authorImg.onerror  = () => authorImg.src  = UserConfig.value.error_img  
    author.appendChild(authorImg) 
    author.appendChild(document.createTextNode(article.author)) 
    card.appendChild(author) 
 
    author.onclick  = () => {
      showAuthorArticles(article.author,  article.avatar,  article.link) 
    }
 
    const date = document.createElement('div') 
    date.className  = 'card-date'
    date.innerText  = "🗓️" + article.created.substring(0,  10)
    card.appendChild(date) 
 
    const bgImg = document.createElement('img') 
    bgImg.className  = 'card-bg no-lightbox'
    bgImg.src  = article.avatar  || UserConfig.value.error_img  
    bgImg.onerror  = () => bgImg.src  = UserConfig.value.error_img  
    card.appendChild(bgImg) 
 
    if (container) container.appendChild(card) 
  })
 
  start.value  += UserConfig.value.page_turning_number  
 
  const loadMoreBtn = document.getElementById('load-more-btn') 
  if (loadMoreBtn && start.value  >= allArticles.value.length)  {
    loadMoreBtn.style.display  = 'none'
  }
}
 
const displayRandomArticle = () => {
  if (allArticles.value.length  === 0) return 
  
  const randomArticle = allArticles.value[Math.floor(Math.random()  * allArticles.value.length)] 
  const randomArticleContainer = document.getElementById('random-article') 
  
  if (randomArticleContainer) {
    randomArticleContainer.innerHTML  = `
      <div class="random-container">
        <div class="random-container-title">随机钓鱼</div>
        <div class="random-title">${randomArticle.title}</div> 
        <div class="random-author">作者: ${randomArticle.author}</div> 
      </div>
      <div class="random-button-container">
        <a href="#" id="refresh-random-article">刷新</a>
        <button class="random-link-button" onclick="window.open('${randomArticle.link}',  '_blank')">过去转转</button>
      </div>
    `
 
    // 为刷新按钮添加事件监听器 
    const refreshBtn = document.getElementById('refresh-random-article') 
    if (refreshBtn) {
      refreshBtn.addEventListener('click',  (event) => {
        event.preventDefault() 
        displayRandomArticle()
      })
    }
  }
}
 
const showAuthorArticles = (author, avatar, link) => {
  modalData.value  = {
    author,
    avatar,
    link: new URL(link).origin,
    articles: allArticles.value.filter(article  => article.author  === author).slice(0, 4)
  }
  showModal.value  = true 
}
 
const hideModal = () => {
  showModal.value  = false 
}
 
const handleImgError = (event) => {
  event.target.src  = errorImg.value  
}
 
const formatDate = (dateString) => {
  return dateString.substring(0,  10)
}
 
// 生命周期钩子 
onMounted(() => {
  initializeFcLite()
})
</script>