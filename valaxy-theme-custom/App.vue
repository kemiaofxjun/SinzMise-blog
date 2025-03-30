<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { onMounted, onBeforeMount } from "vue";
import { useAppStore, useSiteConfig } from "valaxy";
import { useRoute } from "vue-router";
import { useThemeConfig } from "./composables";
import { isClient } from "@vueuse/core";
  
const route = useRoute();
const site = useSiteConfig();
const theme = useThemeConfig();

useHead({
  link: [
    {
      rel: "canonical",
      href: site.value.url?.slice(0, -1) + route.path,
    }
  ],
});

const app = useAppStore();

onBeforeMount(async () => {
  // fuck you reverse proxy
  if (isClient) {
    const allowedDomains = [
      [98, 108, 111, 103, 46, 115, 116, 111, 114, 105,
        99, 97, 108, 46, 115, 112, 97, 99, 101
      ],
      [98, 108, 111, 103, 46, 115, 105, 110, 122, 109,
        105, 115, 101, 46, 116, 111, 112
      ],
      [98, 108, 111, 103, 45, 100, 50, 109, 46, 112, 97,
        103, 101, 115, 46, 100, 101, 118
      ],
      [98, 108, 111, 103, 45, 112, 105, 110, 107, 45, 97,
        108, 112, 104, 97, 45, 50, 54, 46, 118, 101, 114, 
        99, 101, 108, 46, 97, 112, 112],
      [108, 111, 99, 97, 108, 104, 111, 115, 116],
    ].map((domain) => String.fromCharCode(...domain));

    const currentDomain = window.location.hostname;
    if (!allowedDomains.includes(currentDomain)) {
      window.location.href = "https://" + allowedDomains[0];
    }
  }
});

onMounted(async () => {
  (app.showLoading = false), 
  await import("@fontsource/noto-sans-sc/400.css");
});
</script>
<template>
  <PageLoading v-if="app.showLoading && theme.pageLoading" />
</template>
