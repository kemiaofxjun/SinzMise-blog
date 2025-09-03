<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div v-if="loadingStatus" v-html="svgContent" class="loading" @click="loadingStatus = false">
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const svgContent =
  ref(`<svg viewBox="0 0 1728 1117" preserveAspectRatio="xMinYMin slice"
     xmlns="http://www.w3.org/2000/svg">
  <!-- 外圈装饰三角形保持不变 -->
  <g class="triangle-group">
    <path d="M606 -123L1061 666H151L606 -123Z"/>
    <path d="M190.15 144L67.3 -68.94L313 -68.94L190.15 144Z"/>
    <path d="M1424.17 339L1249.35 35.97L1599 35.97L1424.17 339Z"/>
    <path d="M-96.7 513.333L-216.4 305.853H23L-96.7 513.333Z"/>
    <path d="M502.825 603.83L391 410L614.65 410L502.825 603.83Z"/>
    <path d="M1228.45 648.333L1048.9 337.113L1408 337.113L1228.45 648.333Z"/>
    <path d="M246.375 925.667L96.75 666.317H396L246.375 925.667Z"/>
    <path d="M606.375 1048.45L504 871L708.75 871L606.375 1048.45Z"/>
    <path d="M1376.5 960L1219 687H1534L1376.5 960Z"/>
    <path d="M365.395 170L503.791 409.885H227L365.395 170Z"/>
    <path d="M1049.36 337L1198.71 595.886H900L1049.36 337Z"/>
    <path d="M1248.81 36L1340.61 195.132H1157L1248.81 36Z"/>
    <path d="M503.99 680.333L614.981 872.716H393L503.99 680.333Z"/>
    <path d="M870.433 698.333L997.866 919.218H743L870.433 698.333Z"/>
    <path d="M1419.1 487L1534.2 686.508H1304L1419.1 487Z"/>
    <path d="M312.914 809L445.828 1039.38H180L312.914 809Z"/>
    <path d="M1225.51 1053.67L1368.01 1300.68H1083L1225.51 1053.67Z"/>
    <path d="M1550.51 792L1693.01 1039.01H1408L1550.51 792Z"/>
  </g>

  <!-- 内圈：发光的“喵” -->
  <g id="breathingParts">
    <!-- 可选：淡蓝色背景圆 -->
    <circle cx="864" cy="559" r="210"
            fill="#E0F0FA" fill-opacity="0.9"/>

    <!-- “喵”字 -->
    <text x="864" y="580"
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="240"
          fill="#ffffff"
          font-family="serif"
          filter="url(#glow)">
      喵
    </text>
  </g>

  <!-- 发光滤镜 -->
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feFlood flood-color="#ffffff" flood-opacity="2.5"/>
      <feComposite in2="blur" operator="in"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
</svg>
`)
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";

const store = mainStore();
const { loadingStatus } = storeToRefs(store);

// 显示提示
const showTip = ref(false);
const showTimeOut = ref(null);

// 监听加载状态
watch(
  () => loadingStatus.value,
  (val) => {
    if (val) {
      showTimeOut.value = setTimeout(() => {
        showTip.value = true;
      }, 3000);
    } else {
      showTip.value = false;
      clearTimeout(showTimeOut.value);
    }
  },
);

onBeforeUnmount(() => {
  clearTimeout(showTimeOut.value);
});
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#b9e6f6, #ece5f4);
  z-index: 9999;
  :global(#breathingParts) {
    animation: loading 2s infinite;
  }
  :global(.triangle-group path) {
    fill: white;
    fill-opacity: 0.15;
  }
  :global(.circle-path) {
    fill: #E0F0FA;
    fill-opacity: 0.9;
  }
  :global(.led-path) {
    fill: white;
    filter: url(#glow);
  }
  :global(.glow-color) {
    flood-color: white;
  }
  html.dark & {
    background: linear-gradient(#c3bde9, #fee4ff);
    :global(.circle-path) {
      fill: #fee4ff;
    }
    :global(.glow-color) {
      flood-color: #efe0fd;
    }
  }
}
</style>
