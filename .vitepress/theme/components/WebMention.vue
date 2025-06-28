<template>
  <div class="webmentions" v-if="showWebmentions">
    <div class="webmentions-header">
      <h2>互动反馈 ({{ filteredMentions.length }})</h2>
      <div class="webmentions-controls">
        <button 
          @click="fetchMentions" 
          :disabled="loading"
          class="refresh-button"
          aria-label="刷新互动数据"
        >
          <span v-if="!loading">🔄</span>
          <span v-else class="loading-dots">...</span>
        </button>
        <div class="webmentions-filters">
          <button 
            v-for="type in mentionTypes" 
            :key="type.value"
            @click="toggleFilter(type.value)"
            :class="{ active: activeFilters.includes(type.value) }"
            class="filter-button"
            :aria-label="`筛选${type.label}`"
          >
            {{ type.icon }} ({{ typeCounts[type.value] || 0 }})
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>正在加载互动数据...</p>
    </div>
    
    <div v-else>
      <div v-if="error" class="error-state">
        <p>⚠️ {{ error }}</p>
        <button @click="fetchMentions" class="retry-button">重试</button>
      </div>
      
      <div v-else>
        <div v-if="filteredMentions.length" class="mentions-container">
          <div 
            v-for="(mention, index) in filteredMentions" 
            :key="mention.id" 
            class="mention"
            :style="`animation-delay: ${index * 0.1}s`"
          >
            <a 
              :href="mention.data.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="mention-avatar-link"
              :aria-label="`查看${mention.data.author.name}的原文`"
            >
              <img 
                :src="mention.data.author.photo || defaultAvatar" 
                :alt="mention.data.author.name" 
                class="mention-avatar"
                loading="lazy"
                width="48"
                height="48"
              >
            </a>
            <div class="mention-content">
              <div class="mention-header">
                <a 
                  :href="mention.data.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="mention-author"
                >
                  {{ mention.data.author.name }}
                </a>
                <span class="mention-type" :class="`mention-type--${mention.activity.type}`">
                  {{ getTypeLabel(mention.activity.type) }}
                </span>
              </div>
              <div 
                class="mention-text" 
                v-if="mention.data.content"
                v-html="formatContent(mention.data.content.text || mention.data.content)"
              ></div>
              <div class="mention-meta">
                <time :datetime="mention.data.published || mention.verified_date">
                  {{ formatDate(mention.data.published || mention.verified_date) }}
                </time>
                <span>•</span>
                <a 
                  :href="mention.data.url" 
                  class="mention-source" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  查看原文
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-mentions">
          <p>还没有互动反馈，<a href="https://indieweb.org/Webmention" target="_blank" rel="noopener noreferrer">了解如何参与</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyLDRBNiw2LDAsMSwwLDE4LDEwLDYsNiwwLDAsMCwxMiw0WiIgZmlsbD0iI2NjYyIvPjxwYXRoIGQ9Ik0xMiwxMWE1LDUsMCwwLDAtNSw1LDcsNywwLDAsMCw3LDcsNyw3LDAsMCwwLDctN0E1LDUsMCwwLDAsMTIsMTFaIiBmaWxsPSIjY2NjIi8+PC9zdmc+'

export default {
  data() {
    return {
      mentions: [],
      loading: false,
      error: null,
      activeFilters: ['like', 'repost', 'reply', 'mention'],
      defaultAvatar,
      currentUrl: ''
    }
  },
  computed: {
    showWebmentions() {
      return this.mentions.length > 0 || this.loading
    },
    mentionTypes() {
      return [
        { value: 'like', label: '喜欢', icon: '👍' },
        { value: 'repost', label: '转发', icon: '🔄' },
        { value: 'reply', label: '回复', icon: '💬' },
        { value: 'mention', label: '提及', icon: '🔗' }
      ]
    },
    typeCounts() {
      const counts = {}
      this.mentions.forEach(mention => {
        counts[mention.activity.type] = (counts[mention.activity.type] || 0) + 1
      })
      return counts
    },
    sortedMentions() {
      return [...this.mentions].sort((a, b) => {
        const dateA = new Date(a.data.published || a.verified_date)
        const dateB = new Date(b.data.published || b.verified_date)
        return dateB - dateA
      })
    },
    filteredMentions() {
      if (this.activeFilters.length === 0) return []
      return this.sortedMentions.filter(mention => 
        this.activeFilters.includes(mention.activity.type)
      )
    }
  },
  methods: {
    getTypeLabel(type) {
      const labels = {
        like: '喜欢',
        repost: '转发',
        reply: '回复',
        mention: '提及'
      }
      return labels[type] || type
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    formatContent(content) {
      if (typeof content !== 'string') return ''
      // 简单的链接处理
      return content.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      )
    },
    toggleFilter(type) {
      if (this.activeFilters.includes(type)) {
        this.activeFilters = this.activeFilters.filter(t => t !== type)
      } else {
        this.activeFilters = [...this.activeFilters, type]
      }
    },
    getCurrentUrl() {
      // 确保在客户端环境下执行
      if (typeof window !== 'undefined') {
        // 移除可能的hash和查询参数
        return window.location.href.split(/[?#]/)[0]
      }
      return ''
    },
    async fetchMentions() {
      try {
        this.loading = true
        this.error = null
        
        // 获取当前页面URL
        this.currentUrl = this.getCurrentUrl()
        if (!this.currentUrl) {
          throw new Error('无法获取当前页面URL')
        }
        
        const response = await fetch(
          `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(this.currentUrl)}`
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        this.mentions = data.children || []
      } catch (err) {
        console.error('Failed to fetch webmentions:', err)
        this.error = '无法加载互动数据，请稍后再试'
      } finally {
        this.loading = false
      }
    }
  },
  async mounted() {
    // 只在客户端执行
    if (typeof window !== 'undefined') {
      await this.fetchMentions()
    }
  }
}
</script>
 
<style scoped>
.webmentions {
  margin: 3rem 0;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.webmentions:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.webmentions-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.webmentions-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.webmentions-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.refresh-button {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.refresh-button:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.refresh-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.webmentions-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-button {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.filter-button:hover {
  border-color: var(--vp-c-brand-light);
}

.filter-button.active {
  background: var(--vp-c-brand-light);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand-darker);
}

.mentions-container {
  display: grid;
  gap: 1.25rem;
}

.mention {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider-light);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.mention:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.mention-avatar-link {
  flex-shrink: 0;
}

.mention-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.mention:hover .mention-avatar {
  transform: scale(1.05);
}

.mention-content {
  flex: 1;
  min-width: 0;
}

.mention-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.mention-author {
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.mention-author:hover {
  color: var(--vp-c-brand);
}

.mention-type {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.mention-type--like {
  background: rgba(0, 184, 124, 0.1);
  color: #00b87c;
}

.mention-type--repost {
  background: rgba(0, 130, 230, 0.1);
  color: #0082e6;
}

.mention-type--reply {
  background: rgba(255, 140, 0, 0.1);
  color: #ff8c00;
}

.mention-type--mention {
  background: rgba(138, 43, 226, 0.1);
  color: #8a2be2;
}

.mention-text {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.mention-text a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.mention-text a:hover {
  text-decoration: underline;
}

.mention-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.mention-meta time {
  font-family: monospace;
}

.mention-source {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.mention-source:hover {
  color: var(--vp-c-brand);
  text-decoration: underline;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--vp-c-divider-light);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: var(--vp-c-red);
  text-align: center;
}

.retry-button {
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-red);
  color: var(--vp-c-red);
}

.no-mentions {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}

.no-mentions a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.no-mentions a:hover {
  text-decoration: underline;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .webmentions {
    padding: 1rem;
  }
  
  .mention {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .mention-avatar {
    width: 40px;
    height: 40px;
  }
  
  .mention-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .webmentions-controls {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>