<script setup>
import { ref, computed } from 'vue'
import { useThemeConfig } from "../../composables";

const themeConfig = useThemeConfig();
const isFormOpen = ref(false)
const targetUrl = ref(typeof window !== 'undefined' ? window.location.href  : '')
const sourceUrl = ref('')
const isSending = ref(false)
const resultMessage = ref('')
const isError = ref(false)
 
// 验证URL格式 
const isValidUrl = computed(() => {
  try {
    new URL(sourceUrl.value) 
    return true 
  } catch {
    return false 
  }
})
 
const sendWebmention = async () => {
  if (!isValidUrl.value)  {
    resultMessage.value  = '请输入有效的URL（如 https://example.com ）'
    isError.value  = true 
    return 
  }
 
  isSending.value  = true 
  try {
    const response = await fetch(themeConfig.webmention.mention,  {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        source: sourceUrl.value, 
        target: targetUrl.value  
      })
    })
 
    if (response.ok)  {
      resultMessage.value  = '发送成功！Webmention 已提交'
      isError.value  = false 
      sourceUrl.value  = ''
      setTimeout(() => isFormOpen.value  = false, 2000)
    } else {
      throw new Error(`HTTP error: ${response.status}`) 
    }
  } catch (err) {
    resultMessage.value  = `发送失败：${err.message}` 
    isError.value  = true 
  } finally {
    isSending.value  = false 
  }
}
</script>
 
<template>
  <div class="webmention-sender">
    <!-- 触发按钮 -->
    <button 
      @click="isFormOpen = !isFormOpen"
      class="button is-primary is-fullwidth"
      :class="{ 'is-light': isFormOpen }"
    >
      <span class="icon-text">
        <span class="icon">
          <i class="fas fa-paper-plane"></i>
        </span>
        <span>{{ isFormOpen ? '取消发送' : '发送回响' }}</span>
      </span>
    </button>
 
    <!-- 折叠表单 -->
    <div v-if="isFormOpen" class="mt-4">
      <div class="field">
        <label class="label">目标页面URL</label>
        <div class="control">
          <input 
            v-model="targetUrl" 
            class="input" 
            type="url" 
            placeholder="https://"
          >
        </div>
        <p class="help">默认当前页面，如需通知其他页面可修改</p>
      </div>
 
      <div class="field">
        <label class="label">您的互动URL</label>
        <div class="control has-icons-right">
          <input 
            v-model="sourceUrl"
            class="input"
            :class="{ 'is-danger': !isValidUrl && sourceUrl }"
            type="url"
            placeholder="https://您的站点/互动页面"
            required 
          >
          <span v-if="sourceUrl" class="icon is-small is-right">
            <i 
              class="fas" 
              :class="isValidUrl ? 'fa-check has-text-success' : 'fa-exclamation has-text-danger'"
            ></i>
          </span>
        </div>
        <p class="help">请输入您发表评论/转发的页面地址</p>
      </div>
 
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button 
            @click="sendWebmention"
            class="button is-link"
            :class="{ 'is-loading': isSending }"
            :disabled="!sourceUrl || !isValidUrl"
          >
            发送Webmention 
          </button>
        </div>
      </div>
 
      <!-- 结果反馈 -->
      <div 
        v-if="resultMessage"
        class="notification"
        :class="{ 'is-success': !isError, 'is-danger': isError }"
      >
        <button class="delete" @click="resultMessage = ''"></button>
        {{ resultMessage }}
      </div>
    </div>
  </div>
</template>
 
<style scoped>
.webmention-sender {
  margin: 1.25rem auto 0;
}
</style>