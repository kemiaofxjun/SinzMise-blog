<script lang="ts" setup>

const props = defineProps<{
  src: string;
}>();

</script>

<template>
  <audio controls :src="props.src"></audio>
</template>
