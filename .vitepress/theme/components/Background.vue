<template>
  <Teleport to="body">
    <!-- 站点背景 -->
    <div v-if="backgroundType !== 'close'" :class="['background', backgroundType, themeValue]">
      <img
        v-if="backgroundType === 'image'"
        :src="backgroundUrl"
        id="background-cover"
        class="cover"
        alt="background"
        @error="coverError"
        @load="coverLoaded"
      />
    </div>
  </Teleport>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";

const store = mainStore();
const { backgroundType, backgroundUrl, themeValue } = storeToRefs(store);

// 加载失败
const coverError = (e) => {
  // 替换为透明图片
  e.target.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' width='100%25' height='100%25'%3E%3C/svg%3E";
  $message.error("背景图片加载失败，请重新设置");
};

// 加载完成
const coverLoaded = (e) => {
  const imgElement = e.target;
  // 加载完成
  imgElement.classList.add("loaded");
};
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -2;
  &.patterns {
    background-color: var(--main-site-background);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    transition: background-image 0.5s, background-color 0.5s;
    background-image: var(--theme-background-image);
  }
  &.dark {
    &.patterns {
      background-image: var(--theme-background-image);
    }
    .cover {
      filter: brightness(0.6);
    }
  }
  .cover {
    width: auto;
    height: auto;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition:
      filter 0.3s,
      opacity 0.3s;
    &.loaded {
      opacity: 1;
    }
  }
}
</style>
