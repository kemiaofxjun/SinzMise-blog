<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
useScriptTag('/js/chatroom/chatroom.js')

const props = defineProps<{
  name: string;
  id: "chatroom" | string;
  file: string;
  width: 800 | string;
  height: 600 | string;
}>();

const id = props.id;

</script>

<script lang="js" setup>
  const props = defineProps()
  chatroom.init ({
    jsonFilePath: "/posts/61713/chats.json",
    chatroomName: props.id,
    MyAvatar: "https://blog.sinzmise.top/img/avatar.png",
    title: "SWPP 开发交流群"
  })
</script>

<template>
  <div :id="id">加载中</div>
</template>