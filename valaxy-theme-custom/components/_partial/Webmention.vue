<script setup>
import { ref, onMounted, computed } from 'vue'
 
const mentions = ref([])
const isLoading = ref(true)
const error = ref(null)
const currentUrl = typeof window !== 'undefined' ? window.location.href  : ''
 
// 分类 Webmention 类型 
const categorizedMentions = computed(() => {
  return {
    replies: mentions.value.filter(m  => m.activity.type  === 'reply'),
    likes: mentions.value.filter(m  => m.activity.type  === 'like'),
    reposts: mentions.value.filter(m  => m.activity.type  === 'repost')
  }
})
 
onMounted(async () => {
  try {
    const response = await fetch(
      `https://webmention.io/api/mentions?target=${encodeURIComponent(currentUrl)}` 
    )
    const data = await response.json() 
    mentions.value  = data.links  || []
  } catch (err) {
    error.value  = '加载互动数据失败，请稍后重试。'
  } finally {
    isLoading.value  = false 
  }
})
</script>
 
<template>
  <section class="webmentions-container section">
    <h3 class="title is-4 has-text-centered mb-5">
      <span class="icon-text">
        <span class="icon">
          <i class="fas fa-message"></i>
        </span>
        <span>网络回响</span>
      </span>
    </h3>
 
    <!-- 加载状态 -->
    <div v-if="isLoading" class="has-text-centered">
      <span class="icon is-large">
        <i class="fas fa-spinner fa-pulse fa-2x"></i>
      </span>
      <p class="mt-2">正在加载互动数据...</p>
    </div>
 
    <!-- 错误提示 -->
    <div v-else-if="error" class="notification is-warning">
      {{ error }}
    </div>
 
    <!-- 内容展示 -->
    <div v-else>
      <!-- 网络回响（Reply） -->
      <div v-if="categorizedMentions.replies.length"  class="mb-6">
        <h4 class="subtitle is-5 has-text-grey mb-3">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-comment-dots"></i>
            </span>
            <span>回响 ({{ categorizedMentions.replies.length  }})</span>
          </span>
        </h4>
        <div class="box is-shadowless" style="border-left: 3px solid #48c78e;">
          <article 
            v-for="mention in categorizedMentions.replies"  
            :key="mention.id"  
            class="media"
          >
            <figure v-if="mention.author?.photo"  class="media-left">
              <p class="image is-48x48">
                <img 
                  :src="mention.author.photo"  
                  :alt="mention.author.name"  
                  class="is-rounded"
                >
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ mention.author?.name  || '匿名用户' }}</strong>
                  <small class="ml-2">
                    <a :href="mention.source"  target="_blank" rel="noopener">
                      <time :datetime="mention.published  || mention['wm-received']">
                        {{ new Date(mention['wm-received']).toLocaleDateString() }}
                      </time>
                    </a>
                  </small>
                  <br>
                  <span v-html="mention.content?.text  || '点击查看原文'"></span>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
 
      <!-- 点赞（Like） -->
      <div v-if="categorizedMentions.likes.length"  class="mb-6">
        <h4 class="subtitle is-5 has-text-grey mb-3">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-heart"></i>
            </span>
            <span>点赞 ({{ categorizedMentions.likes.length  }})</span>
          </span>
        </h4>
        <div class="tags">
          <span 
            v-for="mention in categorizedMentions.likes"  
            :key="mention.id"  
            class="tag is-rounded is-light"
          >
            <a :href="mention.source"  target="_blank" rel="noopener">
              {{ mention.author?.name  || '匿名用户' }}
            </a>
          </span>
        </div>
      </div>
 
      <!-- 转发（Repost） -->
      <div v-if="categorizedMentions.reposts.length"> 
        <h4 class="subtitle is-5 has-text-grey mb-3">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-retweet"></i>
            </span>
            <span>转发 ({{ categorizedMentions.reposts.length  }})</span>
          </span>
        </h4>
        <div class="box is-shadowless" style="border-left: 3px solid #3e8ed0;">
          <article 
            v-for="mention in categorizedMentions.reposts"  
            :key="mention.id"  
            class="media"
          >
            <figure v-if="mention.author?.photo"  class="media-left">
              <p class="image is-48x48">
                <img 
                  :src="mention.author.photo"  
                  :alt="mention.author.name"  
                  class="is-rounded"
                >
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ mention.author?.name  || '匿名用户' }}</strong> 转发了本文 
                  <small class="ml-2">
                    <a :href="mention.source"  target="_blank" rel="noopener">
                      <time :datetime="mention.published  || mention['wm-received']">
                        {{ new Date(mention['wm-received']).toLocaleDateString() }}
                      </time>
                    </a>
                  </small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
 
      <!-- 空状态 -->
      <div 
        v-if="!categorizedMentions.replies.length  && !categorizedMentions.likes.length  && !categorizedMentions.reposts.length"  
        class="has-text-centered has-text-grey"
      >
        <p>反正亦是空空空空如也~~</p>
      </div>
    </div>
  </section>
</template>
 
<style scoped>
.webmentions-container {
  max-width: 800px;
  margin: 0 auto;
}
 
.media {
  margin-bottom: 1.5rem;
}
 
.media:last-child {
  margin-bottom: 0;
} 
 
.tag {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
 
.tag a {
  color: inherit;
}
</style>