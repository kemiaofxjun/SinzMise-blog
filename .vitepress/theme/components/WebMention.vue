<script setup>
import { ref, computed, onMounted } from 'vue'
 
const props = defineProps({
  domain: {
    type: String,
    required: true 
  },
  token: {
    type: String,
    required: true 
  }
})
 
// Reactive data 
const webmentions = ref([])
const loading = ref(true)
const error = ref(null)
const sending = ref(false)
const sendError = ref(null)
const sendSuccess = ref(false)
const mentionUrl = ref('')
const mentionType = ref('reply')
const mentionContent = ref('')
 
// Computed properties 
const likes = computed(() => webmentions.value.filter(m  => m['wm-property'] === 'like'))
const reposts = computed(() => webmentions.value.filter(m  => m['wm-property'] === 'repost'))
const comments = computed(() => {
  return webmentions.value.filter(m  => 
    m['wm-property'] === 'in-reply-to' || 
    m['wm-property'] === 'mention' ||
    m['wm-property'] === 'reply'
  )
})
 
// Fetch webmentions using fetch API 
const fetchWebmentions = async () => {
  try {
    const currentUrl = typeof window !== 'undefined' ? window.location.href  : ''
    const response = await fetch(
      `https://webmention.io/api/mentions.jf2?domain=${props.domain}&token=${props.token}&per-page=100&sort-dir=down&target=${encodeURIComponent(currentUrl)}` 
    )
    
    if (!response.ok)  {
      throw new Error(`HTTP error! status: ${response.status}`) 
    }
    
    const data = await response.json() 
    webmentions.value  = data.children  || []
  } catch (err) {
    error.value  = err.message  
  } finally {
    loading.value  = false 
  }
}
 
// Send webmention using fetch API 
const sendWebmention = async () => {
  if (!mentionUrl.value)  {
    sendError.value  = '请填写URL'
    return 
  }
 
  sending.value  = true 
  sendError.value  = null 
  sendSuccess.value  = false 
 
  try {
    const currentUrl = window.location.href  
    const endpoint = 'https://webmention.io/'  + props.domain  + '/webmention'
    
    const formData = new URLSearchParams()
    formData.append('source',  mentionUrl.value) 
    formData.append('target',  currentUrl)
    
    if (mentionContent.value  && mentionType.value  === 'reply') {
      formData.append('content',  mentionContent.value) 
    }
 
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    
    if (response.status  === 202) {
      sendSuccess.value  = true 
      setTimeout(fetchWebmentions, 3000) // Refresh after 3 seconds 
    } else {
      const errorData = await response.text() 
      throw new Error(errorData || `HTTP error! status: ${response.status}`) 
    }
  } catch (err) {
    sendError.value  = err.message  
  } finally {
    sending.value  = false 
  }
}
 
// Send like 
const sendLike = async () => {
  mentionType.value  = 'like'
  mentionUrl.value  = typeof window !== 'undefined' ? window.location.href  : ''
  await sendWebmention()
}
 
onMounted(() => {
  fetchWebmentions()
})
</script>
 
<template>
  <div class="webmentions">
    <h2>互动与反馈</h2>
    
    <!-- Send WebMention Form -->
    <div class="send-mention">
      <h3>发送回响</h3>
      <div class="form-group">
        <label for="mention-type">类型:</label>
        <select id="mention-type" v-model="mentionType" class="form-control">
          <option value="reply">回复</option>
          <option value="like">点赞</option>
          <option value="repost">转发</option>
          <option value="mention">提及</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="mention-url">你的内容URL:</label>
        <input 
          id="mention-url" 
          v-model="mentionUrl" 
          type="url" 
          placeholder="https://你的网站/文章"
          class="form-control"
        />
      </div>
      
      <div v-if="mentionType === 'reply'" class="form-group">
        <label for="mention-content">内容 (可选):</label>
        <textarea 
          id="mention-content" 
          v-model="mentionContent" 
          placeholder="你的回复内容..."
          class="form-control"
          rows="3"
        ></textarea>
      </div>
      
      <button 
        @click="sendWebmention" 
        :disabled="sending"
        class="send-button"
      >
        {{ sending ? '发送中...' : '发送' }}
      </button>
      
      <div v-if="sendError" class="error-message">
        {{ sendError }}
      </div>
      
      <div v-if="sendSuccess" class="success-message">
        成功发送! 回响可能需要几分钟才会显示。 
      </div>
    </div>
    
    <!-- Display WebMentions -->
    <div v-if="loading" class="loading">加载中...</div>
    
    <div v-else-if="error" class="error">
      加载WebMentions时出错: {{ error }}
    </div>
    
    <div v-else class="mentions-container">
      <!-- Likes -->
      <div v-if="likes.length  > 0" class="mention-section">
        <h3>点赞 <span class="count">{{ likes.length  }}</span></h3>
        <div class="like-list">
          <a 
            v-for="like in likes" 
            :key="like['wm-id']" 
            :href="like.url"  
            target="_blank" 
            rel="noopener noreferrer"
            class="like-item"
          >
            <img 
              v-if="like.author.photo"  
              :src="like.author.photo"  
              :alt="like.author.name"  
              class="avatar" 
            />
            <span v-else class="default-avatar">👍</span>
            <span class="like-author">{{ like.author.name  }}</span>
          </a>
        </div>
      </div>
      
      <!-- Reposts -->
      <div v-if="reposts.length  > 0" class="mention-section">
        <h3>转发 <span class="count">{{ reposts.length  }}</span></h3>
        <div class="repost-list">
          <a 
            v-for="repost in reposts" 
            :key="repost['wm-id']" 
            :href="repost.url"  
            target="_blank" 
            rel="noopener noreferrer"
            class="repost-item"
          >
            <img 
              v-if="repost.author.photo"  
              :src="repost.author.photo"  
              :alt="repost.author.name"  
              class="avatar" 
            />
            <span class="repost-author">{{ repost.author.name  }}</span>
          </a>
        </div>
      </div>
      
      <!-- Comments -->
      <div v-if="comments.length  > 0" class="mention-section">
        <h3>评论 <span class="count">{{ comments.length  }}</span></h3>
        <ul class="comment-list">
          <li v-for="comment in comments" :key="comment['wm-id']" class="comment-item">
            <a :href="comment.url"  target="_blank" rel="noopener noreferrer" class="comment-link">
              <img 
                v-if="comment.author.photo"  
                :src="comment.author.photo"  
                :alt="comment.author.name"  
                class="avatar" 
              />
              <div class="comment-content">
                <div class="comment-meta">
                  <strong>{{ comment.author.name  }}</strong>
                  <span class="comment-date">
                    {{ new Date(comment.published  || comment['wm-received']).toLocaleDateString() }}
                  </span>
                </div>
                <div 
                  v-if="comment.content"  
                  v-html="comment.content.html  || comment.content.text"  
                  class="comment-text"
                ></div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      
      <div v-if="webmentions.length  === 0" class="no-mentions">
        目前还没有互动。你可以通过上面的表单发送WebMention反馈。
      </div>
    </div>
  </div>
</template>
 
<style scoped>
/* 样式保持不变，与之前的实现相同 */
.webmentions {
  margin: 3rem 0;
  padding: 1.5rem;
  border-top: 1px solid var(--main-border-shadow);
}
 
.action-buttons {
  margin-bottom: 1.5rem;
}
 
.like-button {
  padding: 0.5rem 1rem;
  background-color: var(--main-site-background);
  border: 1px solid var(--main-border-shadow);
  color: var(--main-font-color);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}
 
.like-button:hover {
  background-color: var(--main-card-second-background);
}
 
.count {
  background-color: var(--main-site-background);
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}
 
.send-mention {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--main-site-background);
  border-radius: 6px;
}
 
.form-group {
  margin-bottom: 1rem;
}
 
.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--main-border-shadow);
  color:var(--main-font-second-color);
  background-color: var(--main-card-background);
  border-radius: 4px;
  font-size: 0.9rem;
}
 
.send-button {
  padding: 0.5rem 1rem;
  background-color: var(--main-color);
  color: var(--main-card-background);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}
 
.send-button:hover {
  background-color: var(--main-color-hover);
}
 
.send-button:disabled {
  background-color: var(--main-color-bg);
  cursor: not-allowed;
}
 
.error-message {
  color: #d33;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
 
.success-message {
  color: #2c7d32;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
 
.loading {
  color: #666;
}
 
.error {
  color: #d33;
}
 
.mentions-container {
  margin-top: 2rem;
}
 
.mention-section {
  margin-bottom: 2rem;
}
 
.mention-section h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
 
.like-list, .repost-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}
 
.like-item, .repost-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  padding: 0.3rem 0.6rem;
  background-color: var(--main-site-background);
  border-radius: 4px;
  font-size: 0.9rem;
}
 
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
 
.default-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--main-site-background);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
 
.comment-list {
  list-style: none;
  padding: 0;
}
 
.comment-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--main-site-background);
  border-radius: 6px;
}
 
.comment-link {
  display: flex;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
}
 
.comment-content {
  flex: 1;
}
 
.comment-meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.3rem;
}
 
.comment-date {
  font-size: 0.8rem;
  color: #666;
}
 
.comment-text {
  font-size: 0.9rem;
  line-height: 1.5;
}
 
.comment-text :deep(a) {
  color: #0078d7;
  text-decoration: underline;
}
 
.no-mentions {
  color: #666;
  font-style: italic;
}
</style>