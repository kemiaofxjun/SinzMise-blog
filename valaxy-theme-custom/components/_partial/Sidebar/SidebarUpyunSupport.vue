<script lang="ts" setup>
const upyun = {
  name: "又拍云",
  url: "https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral",
  logo: "https://objects.lihaoyu.cn/bigcake-blog-images/2024/07/23/669f25a357c6e.webp",
};
</script>

<template>
  <div class="card">
    <div class="p-4">
      <div class="mb-3 text-sm">云存储提供商</div>
      <div class="max-h-fit overflow-y-auto">
        <a class="flex-center" :href="upyun.url" target="_blank" :title="upyun.name">
          <img
            class="upyun-logo"
            style="width:100px;height:25px"
            m="b-2px l-1 r-2"
            :src="upyun.logo"
            loading="lazy"
            :alt="upyun.name"
          />
        </a>
      </div>
    </div>
  </div>
</template>
