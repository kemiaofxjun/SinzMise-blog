<script lang="ts" setup>
import { watch, nextTick, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import Artalk from "artalk";
import "artalk/dist/Artalk.css";
import { useFrontmatter } from "valaxy";
import { useAppStore } from "valaxy";

const appStore = useAppStore();
const fm = useFrontmatter();
const el = ref<HTMLElement | null>(null);
const route = useRoute();

let artalk: Artalk;

onMounted(() => {
  nextTick(() => {
    initArtalk(getConfByPage());
  });
  watch(
    () => ({ isDark: appStore.isDark }),
    (newVal) => {
      if (artalk) {
        artalk.setDarkMode(newVal.isDark);
      }
    }
  );
});

watch(
  () => route.path,
  () => {
    nextTick(() => {
      artalk.update(getConfByPage());
      artalk.reload();
    });
  }
);

onBeforeUnmount(() => {
  artalk.destroy();
});

function initArtalk(conf: any) {
  artalk = Artalk.init({
    el: el.value,
    emoticons: "/assets/emoticons/default.json",
    gravatar: {
      mirror: "https://cdn.libravatar.org/avatar/",
    },
    ...conf,
  });
}

function getConfByPage() {
  return {
    pageKey: "" + route.path,
    pageTitle: fm.value.title,
    server: "https://artalk.sinzmise.top",
    site: "汐塔魔法屋",
    useBackendConf: true,
    locale: "auto",
    darkMode: appStore.isDark,
  };
}
</script>

<template>
  <div class="card">
    <div class="card-content">
      <ClientOnly>
        <h3 class="title is-4 has-text-centered mb-5">
          <span class="icon-text">
            <span class="icon">
              <i class="fas fa-comments"></i>
            </span>
            <span>评论</span>
          </span>
        </h3>
        <div ref="el"></div>
      </ClientOnly>
    </div>
  </div>
</template>
