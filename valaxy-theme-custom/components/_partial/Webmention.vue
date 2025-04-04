<template>
  <div class="webmentions">
    <h2 class="title is-4">📢 网络回响 ({{ mentions.length  }})</h2>
    
    <!-- 不同类型的回响（评论、点赞、转发等） -->
    <div v-if="mentions.length"> 
      <div v-for="mention in mentions" :key="mention.url"  class="card mb-4">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="mention.author.photo  || 'https://via.placeholder.com/48'"  :alt="mention.author.name"  class="is-rounded mention-avatar">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6">
                <a :href="mention.author.url"  target="_blank" rel="noopener noreferrer">
                  {{ mention.author.name  || "匿名用户" }}
                </a>
              </p>
              <p class="subtitle is-7">
                <a :href="mention.url"  target="_blank" rel="noopener noreferrer">
                  {{ new Date(mention.published  || mention['wm-received']).toLocaleDateString() }}
                </a>
              </p>
            </div>
          </div>
 
          <div class="content">
            <!-- 显示回响内容 -->
            <div v-if="mention.content"> 
              <div v-html="mention.content.html  || mention.content.text"></div> 
            </div>
            
            <!-- 显示互动类型（点赞、转发等） -->
            <div v-else-if="mention['wm-property'] === 'like-of'" class="has-text-success">
              ❤️ 点赞了这篇文章 
            </div>
            <div v-else-if="mention['wm-property'] === 'repost-of'" class="has-text-info">
              🔄 转发了这篇文章 
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 无回响时的提示 -->
    <div v-else class="notification is-light">
      暂无互动，欢迎在 Mastodon/Twitter 等平台讨论并链接到本文！
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios' // 或直接使用 fetch 
 
const mentions = ref([])
 
onMounted(async () => {
  try {
    const response = await axios.get( 
      `https://webmention.io/api/mentions.jf2?target=https://blog.storical.space/posts/60486/` 
    )
    mentions.value  = response.data.children  || []
  } catch (error) {
    console.error('Failed  to fetch WebMentions:', error)
  }
})
</script>

<style>
.mention-avatar{
  width: 3em;
}
</style>