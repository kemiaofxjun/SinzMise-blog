<script lang="ts" setup>
import {Base64} from 'js-base64'

const props = defineProps<{
  name: string;
  type: "unity" | string;
  file: string;
  width: 800 | string;
  height: 600 | string;
}>();

const myJsonString = JSON.stringify({ title: props.name, file: props.file, type: props.type, width: props.width, height: props.height });

const insert_data = Base64.encode(myJsonString); 

const url = 'gameload://' + insert_data + '/';

</script>

<template>
  <a :href="url"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;&nbsp;使用GameLoad游玩</a>
</template>
