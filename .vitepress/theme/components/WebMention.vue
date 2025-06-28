<script setup>
import { ref, computed, onMounted } from 'vue'

const rawMentions = ref([])
const loading = ref(true)
const error = ref(null)
const activeTab = ref('all') // 'all', 'replies', 'likes', 'reposts', 'mentions'

const fetchWebmentions = async () => {
  try {
    const url = window.location.href
    const response = await fetch(
      `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(url)}`
    )
    
    if (!response.ok) throw new Error('Failed to fetch webmentions')
    
    const data = await response.json()
    rawMentions.value = data.children || []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// 分类和排序mention
const mentions = computed(() => {
  const result = {
    all: [...rawMentions.value].sort((a, b) => 
      new Date(b['wm-received']) - new Date(a['wm-received'])),
    likes: rawMentions.value
      .filter(m => m['wm-property'] === 'like-of')
      .sort((a, b) => new Date(b['wm-received']) - new Date(a['wm-received'])),
    reposts: rawMentions.value
      .filter(m => m['wm-property'] === 'repost-of')
      .sort((a, b) => new Date(b['wm-received']) - new Date(a['wm-received'])),
    replies: rawMentions.value
      .filter(m => m['wm-property'] === 'in-reply-to')
      .sort((a, b) => new Date(b['wm-received']) - new Date(a['wm-received'])),
    mentions: rawMentions.value
      .filter(m => m['wm-property'] === 'mention-of')
      .sort((a, b) => new Date(b['wm-received']) - new Date(a['wm-received']))
  }
  
  return result
})

// 当前显示的mention
const displayedMentions = computed(() => {
  return activeTab.value === 'all' 
    ? mentions.value.all 
    : mentions.value[activeTab.value]
})

// 统计总数
const mentionCounts = computed(() => ({
  all: rawMentions.value.length,
  likes: mentions.value.likes.length,
  reposts: mentions.value.reposts.length,
  replies: mentions.value.replies.length,
  mentions: mentions.value.mentions.length
}))

onMounted(() => {
  fetchWebmentions()
})
</script>

<template>
  <div class="webmentions">
    <h2><i class="pj-historical icon-pjh-hulianwang"></i>WebMention 网络回响</h2>
    
    <div v-if="loading" class="loading">正在加载互动数据...</div>
    
    <div v-else-if="error" class="error">错误: {{ error }}</div>
    
    <template v-else>
      <!-- 标签页导航 -->
      <div class="mention-tabs">
        <button
          v-for="tab in ['all', 'replies', 'likes', 'reposts', 'mentions']"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ 
            tab === 'all' ? '全部' :
            tab === 'replies' ? '回复' :
            tab === 'likes' ? '点赞' :
            tab === 'reposts' ? '转发' : '提及'
          }}
          <span class="count">{{ mentionCounts[tab] }}</span>
        </button>
      </div>
      
      <!-- 内容区域 -->
      <div v-if="displayedMentions.length > 0" class="mention-content">
        <div v-for="item in displayedMentions" :key="item['wm-id']" class="mention-item">
          <div class="mention-header">
            <a :href="item.author.url" target="_blank" rel="noopener noreferrer">
              <img 
                v-if="item.author.photo" 
                :src="item.author.photo" 
                :alt="item.author.name"
                class="avatar"
              >
            </a>
            <a :href="item.author.url" class="author-name">{{ item.author.name }}</a>
            <span class="mention-type">
              {{ 
                item['wm-property'] === 'like-of' ? '点赞了' :
                item['wm-property'] === 'repost-of' ? '转发了' :
                item['wm-property'] === 'in-reply-to' ? '回复了' : '提及了'
              }}
            </span>
            <span class="mention-date">
              {{ new Date(item['wm-received']).toLocaleDateString() }}
            </span>
          </div>
          
          <div v-if="item.content" class="mention-body">
            <div v-if="item['wm-property'] !== 'like-of'" 
                 class="mention-text" 
                 v-html="item.content.html || item.content.text">
            </div>
            <div v-else class="mention-like">❤️</div>
          </div>
          
          <a v-if="item.url" :href="item.url" class="mention-link" target="_blank">
            查看原文
          </a>
        </div>
      </div>
      
      <div v-else class="no-mentions">
        还没有{{ 
          activeTab === 'all' ? '任何' :
          activeTab === 'replies' ? '回复' :
          activeTab === 'likes' ? '点赞' :
          activeTab === 'reposts' ? '转发' : '提及'
        }}互动
      </div>
    </template>
  </div>
</template>

<style scoped>
.pj-historical{
  font-size: 26px;
  font-weight: normal;
  margin-right: 8px;
}

.webmentions {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.loading, .error, .no-mentions {
  padding: 1rem;
  background: var(--main-card-background);
  border-radius: 4px;
}

.mention-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mention-tabs button {
  padding: 0.5rem 1rem;
  background: var(--main-card-border);
  color: var(--main-font-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.3s, background-color 0.3s;
}

.mention-tabs button:hover {
  background: var(--main-color-hover);
}

.mention-tabs button.active {
  background: var(--main-color);
  color: white;
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
}

.mention-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mention-item {
  padding: 1rem;
  background: var(--main-site-background);
  border-radius: 4px;
}

.mention-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.author-name {
  font-weight: bold;
}

.mention-type {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.mention-date {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.mention-body {
  margin: 0.5rem 0;
}

.mention-text {
  line-height: 1.5;
}

.mention-text :deep(a) {
  color: var(--main-font-color);
}

.mention-text :deep(a):hover {
  color: var(--main-font-second-color);
}

.mention-like {
  font-size: 1.2rem;
}

.mention-link {
  font-size: 0.8rem;
  color: var(--main-color);
  text-decoration: none;
}

.mention-link:hover {
  color: var(--main-color-hover);
}
</style>