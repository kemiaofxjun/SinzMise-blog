<template>
  <div id="friend-circle-lite-root">
    <div id="random-article"></div>
    <div class="articles-container" id="articles-container"></div>
    <button id="load-more-btn" @click="loadMoreArticles">再来亿点</button>
    <div id="stats-container"></div>
  </div>
</template>
 
<script setup>
import { onMounted, ref } from 'vue'
import '@/assets/fclite.css'

const { theme } = useData();

const UserConfig = ref({
  private_api_url: theme.value.fc.api,
  page_turning_number: theme.value.fc.number,
  error_img: theme.value.fc.errorImg
})
 
const start = ref(0)
const allArticles = ref([])
 
onMounted(() => {
  initializeFcLite()
})
 
const initializeFcLite = () => {
  const root = document.getElementById('friend-circle-lite-root') 
  if (!root) return 
 
  // Clear previous content 
  root.innerHTML  = ''
 
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
  root.appendChild(loadMoreBtn) 
 
  // Create stats container 
  const statsContainer = document.createElement('div') 
  statsContainer.id  = 'stats-container'
  root.appendChild(statsContainer) 
 
  // Initial load 
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
      if (loadMoreBtn) {
        loadMoreBtn.innerText  = '再来亿点'
      }
    })
}
 
const processArticles = (data) => {
  allArticles.value  = data.article_data  
  
  // Process stats 
  const stats = data.statistical_data  
  const statsContainer = document.getElementById('stats-container') 
  if (statsContainer) {
    statsContainer.innerHTML  = `
      <div>Powered by: <a href="https://github.com/willow-god/Friend-Circle-Lite"  target="_blank">FriendCircleLite</a><br></div>
      <div>Designed By: <a href="https://www.liushen.fun/"  target="_blank">LiuShen</a><br></div>
      <div>订阅:${stats.friends_num}  活跃:${stats.active_num}  总文章数:${stats.article_num}<br></div> 
      <div>更新时间:${stats.last_updated_time}</div> 
    `
  }
 
  displayRandomArticle()
 
  const container = document.getElementById('articles-container') 
  if (!container) return 
 
  const articles = allArticles.value.slice(start.value,  start.value  + UserConfig.value.page_turning_number) 
 
  articles.forEach(article  => {
    const card = document.createElement('div') 
    card.className  = 'card'
 
    const title = document.createElement('div') 
    title.className  = 'card-title'
    title.innerText  = article.title  
    card.appendChild(title) 
    title.onclick  = () => window.open(article.link,  '_blank')
 
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
 
    container.appendChild(card) 
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
  if (!randomArticleContainer) return 
 
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
 
  // Add event listener for refresh button 
  const refreshBtn = document.getElementById('refresh-random-article') 
  if (refreshBtn) {
    refreshBtn.addEventListener('click',  function(event) {
      event.preventDefault() 
      displayRandomArticle()
    })
  }
}
 
const showAuthorArticles = (author, avatar, link) => {
  const root = document.getElementById('friend-circle-lite-root') 
  if (!root) return 
 
  // Create modal if it doesn't exist 
  if (!document.getElementById('fcmod'))  {
    const fcmod = document.createElement('div') 
    fcmod.id  = 'fcmod'
    fcmod.className  = 'fcmod'
    fcmod.innerHTML  = `
      <div class="fcmod-content">
        <img id="fcmod-author-avatar" src="" alt="">
        <a id="fcmod-author-name-link"></a>
        <div id="fcmod-articles-container"></div>
        <img id="fcmod-bg" src="" alt="">
      </div>
    `
    root.appendChild(fcmod) 
  }
 
  const fcmod = document.getElementById('fcmod') 
  const fcmodArticlesContainer = document.getElementById('fcmod-articles-container') 
  const fcmodAuthorAvatar = document.getElementById('fcmod-author-avatar') 
  const fcmodAuthorNameLink = document.getElementById('fcmod-author-name-link') 
  const fcmodBg = document.getElementById('fcmod-bg') 
 
  if (!fcmod || !fcmodArticlesContainer || !fcmodAuthorAvatar || !fcmodAuthorNameLink || !fcmodBg) return 
 
  fcmodArticlesContainer.innerHTML  = ''
  fcmodAuthorAvatar.src  = avatar || UserConfig.value.error_img  
  fcmodAuthorAvatar.onerror  = () => fcmodAuthorAvatar.src  = UserConfig.value.error_img  
  fcmodBg.src  = avatar || UserConfig.value.error_img  
  fcmodBg.onerror  = () => fcmodBg.src  = UserConfig.value.error_img  
  fcmodAuthorNameLink.innerText  = author 
  fcmodAuthorNameLink.href  = new URL(link).origin 
 
  const authorArticles = allArticles.value.filter(article  => article.author  === author)
  authorArticles.slice(0,  4).forEach(article => {
    const articleDiv = document.createElement('div') 
    articleDiv.className  = 'fcmod-article'
 
    const title = document.createElement('a') 
    title.className  = 'fcmod-article-title'
    title.innerText  = article.title  
    title.href  = article.link  
    title.target  = '_blank'
    articleDiv.appendChild(title) 
 
    const date = document.createElement('div') 
    date.className  = 'fcmod-article-date'
    date.innerText  = "📅" + article.created.substring(0,  10)
    articleDiv.appendChild(date) 
 
    fcmodArticlesContainer.appendChild(articleDiv) 
  })
 
  fcmod.style.display  = 'block'
  setTimeout(() => {
    fcmod.classList.add('fcmod-open') 
  }, 10)
 
  // Add click event to close modal when clicking outside 
  fcmod.onclick  = function(event) {
    if (event.target  === fcmod) {
      hideFcmod()
    }
  }
}
 
const hideFcmod = () => {
  const fcmod = document.getElementById('fcmod') 
  if (!fcmod) return 
 
  fcmod.classList.remove('fcmod-open') 
  fcmod.addEventListener('transitionend',  () => {
    fcmod.style.display  = 'none'
    const root = document.getElementById('friend-circle-lite-root') 
    if (root && fcmod.parentNode  === root) {
      root.removeChild(fcmod) 
    }
  }, { once: true })
}
</script>
