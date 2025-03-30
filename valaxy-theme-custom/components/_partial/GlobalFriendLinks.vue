<script setup lang="ts">
import { useThemeConfig } from "../../composables";
const themeConfig = useThemeConfig();
</script>

<template>
  <div class="menu">
    <ul
      class="menu-list"
    >
      <li v-for="link in themeConfig.asideLinks" :key="link.url">
        <a :href="link.url" target="_blank">
          {{ link.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
