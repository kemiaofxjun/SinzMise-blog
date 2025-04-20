<template>
  <div class="card">
    <div class="p-4">
      <div class="mb-3 text-sm">{{ t("sidebar.headline") }}</div>
      <div class="mb-1 flex flex-col justify-center items-center text-center">
          <p class="text-sm mb-1">Site PV: <span id="busuanzi_site_pv"></span></p>
          <p class="text-sm mb-1">Site UV:<span id="busuanzi_site_uv"></span></p>
          <p v-if="isPost" class="text-sm mb-1">Post PV:<span id="busuanzi_page_pv"></span></p>
          <p v-if="isPost" class="text-sm mb-1">Post UV:<span id="busuanzi_page_uv"></span></p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useScriptTag } from '@vueuse/core';
import { useI18n } from "vue-i18n";
import { useLayout } from 'valaxy'
const { t } = useI18n();
const isPost = useLayout('post')
useScriptTag('https://jsd.cdn.sinzmise.top/npm/penndu/bsz.js')
</script>