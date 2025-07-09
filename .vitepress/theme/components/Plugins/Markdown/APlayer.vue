<!-- .vitepress/theme/components/APlayer.vue -->
<script setup>
import { onMounted, ref } from 'vue'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'

const props = defineProps({
  src: String,
  title: String,
  artist: String,
  cover: String,
})

const aplayerContainer = ref(null)

onMounted(() => {
  if (typeof window !== 'undefined') {
    const ap = new APlayer({
      container: aplayerContainer.value,
      audio: {
        url: props.src,
        name: props.title,
        artist: props.artist,
        cover: props.cover,
      },
    })
  }
})
</script>

<template>
  <div ref="aplayerContainer" class="aplayer-container"></div>
</template>

<style>
.aplayer-container {
  margin: 1.5rem 0;
}
</style>