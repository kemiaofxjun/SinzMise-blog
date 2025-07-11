<template>
  <div class="chatContainer">
    <div class="chatBoxTitle">
      <i class="fa fa-chevron-left"></i>
      <span class="chatTitleText">{{ title }}</span>
      <div class="chatBoxIcons">
        <i class="fa fa-group"></i>
        <i class="fa fa-dedent"></i>
      </div>
    </div>
    <div class="chatBox">
      <div v-for="(item, index) in processedChatData" :key="index" v-html="item"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
const { theme } = useData();
const props = defineProps({
  jsonFilePath: {
    type: String,
    required: true,
    description: '聊天数据JSON文件路径（必填）'
  },
  myAvatar: {
    type: String,
    description: '当前用户头像URL（可选）'
  },
  title: {
    type: String,
    default: '群聊的聊天记录',
    description: '聊天窗口标题（可选）'
  },
  hideAvatar: {
    type: Boolean,
    default: false,
    description: '是否隐藏头像（可选）'
  }
});

// 响应式数据
const chatData = ref([]);
const userAvatarMap = ref(new Map());
const avatarIndex = ref(0);
const sysProcessed = ref(new Set());
const myavatar = props.myAvatar || theme.value.siteMeta.author.cover;

// 计算属性
const processedChatData = computed(() => {
  return generateChatContent(chatData.value);
});

// 生命周期钩子
onMounted(() => {
  loadChatData(props.jsonFilePath)
    .then(data => {
      chatData.value = data;
    })
    .catch(err => {
      console.error('Error loading chat data:', err);
    });
});

// 方法定义
async function loadChatData(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`加载失败: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('加载聊天数据出错:', error);
    return [];
  }
}

function generateChatContent(chatData) {
  const content = [];
  sysProcessed.value.clear();

  chatData.forEach(chatItem => {
    if (chatItem.name?.toLowerCase() === 'sys') {
      content.push(generateSystemNotification(chatItem));
      sysProcessed.value.add(chatItem.content);
    } else if (!sysProcessed.value.has(chatItem.content)) {
      content.push(generateChatItem(chatItem));
    }
  });

  return content;
}

function generateChatItem(chatItem) {
  const name = (chatItem.name || '未知').trim();
  const content = (chatItem.content || '无内容').trim();
  const isMe = name.toLowerCase() === 'me';
  const chatName = isMe ? '我' : name;
  const chatClass = isMe ? 'me' : '';
  const avatarUrl = getAvatarUrl(chatItem, isMe);

  return `
    <div class="chatItem ${chatClass}">
      ${props.hideAvatar ? '' : `<img class="chatAvatar no-lightbox" src="${avatarUrl}" onerror="this.src='https://via.placeholder.com/100';">`}
      <div class="chatContentWrapper">
        <b class="chatName">${chatName}</b>
        <div class="chatContent">${parseContent(content)}</div>
      </div>
    </div>
  `;
}

function generateSystemNotification(chatItem) {
  const content = (chatItem.content || '无内容').trim();
  return `
    <div class="systemNotification">
      <div class="systemContent">${parseContent(content)}</div>
    </div>
  `;
}

function parseContent(content) {
  // 处理图片
  content = content.replace(/\[:image::(https?:\/\/[^\s]+?)::\]/g, 
    (_, url) => `<img class="chatMedia img-fancybox" data-fancybox="gallery" src="${url}" alt="Image" />`);
  
  // 处理聊天记录引用
  content = content.replace(/\[:chat:\(([^)]+)\)::([^\s]+?)::\]/g, 
    (_, title, path) => `
      <div class="chatQuoteCard">
        <div class="chatQuoteTitle">
          <i class="fa fa-database"></i>
          <span>转发的聊天记录</span>
        </div>
        <a class="chatMessage" onclick="window.open('https://blog.awaae001.top/Chatroom/?jsonFilePath=${encodeURIComponent(path)}&title=${encodeURIComponent(title)}', '_blank', 'width=800,height=600,scrollbars=yes')">转发自：${title}</a>
      </div>
    `);
  
  // 处理链接
  content = content.replace(/\[:a::(https?:\/\/[^\s]+?)::\]/g, 
    (_, url) => `<a href="${url}" class="chatLink" target="_blank">${url}</a>`);
  
  // 处理@提及
  content = content.replace(/\[:call::@([^:]+?)::\]/g, 
    (_, user) => `<span class="chatCall">@${user}</span>`);
  
  // 处理引用内容
  content = content.replace(/\[:rep:\[([^\]]+)\]:(.*?)::\]/g, 
    (_, user, text) => `
      <div class="chatQuote">
        <div class="quoteUser">
          <i class="fa fa-share-square-o"></i>
          <span>${user}</span>
        </div>
        <span class="quotedMessage">${text}</span>
      </div>
    `);

  return content;
}

function getAvatarUrl(chatItem, isMe) {
  if (isMe) return myavatar;
  
  const { avatar } = chatItem;
  if (avatar?.startsWith('http')) return avatar;
  if (avatar && !isNaN(Number(avatar))) return `https://q1.qlogo.cn/g?b=qq&nk=${avatar}&s=100`;
  
  return assignAvatar(chatItem.name);
}

function assignAvatar(name) {
  const avatars = [
    "https://i.p-i.vip/30/20240920-66ed9a608c2cf.png",
    "https://i.p-i.vip/30/20240920-66ed9b0655cba.png",
    "https://i.p-i.vip/30/20240920-66ed9b18a56ee.png",
    "https://i.p-i.vip/30/20240920-66ed9b2c199bf.png",
    "https://i.p-i.vip/30/20240920-66ed9b3350ed1.png",
    "https://i.p-i.vip/30/20240920-66ed9b5181630.png",
  ];

  if (!userAvatarMap.value.has(name)) {
    userAvatarMap.value.set(name, avatars[avatarIndex.value % avatars.length]);
    avatarIndex.value++;
  }
  return userAvatarMap.value.get(name);
}
</script>

<style>
:root {
  --primary-color: rgb(43, 105, 100);
  --secondary-color: rgb(236, 236, 236);
  --text-color: rgb(255, 255, 255);
  --highlight-color: rgb(63, 153, 146);
  --border-color: rgba(49, 56, 66, 0.193);
  --avatar-size: 40px;
  --padding-main: 20px;
  --radius-main: 10px;
}

.chatContainer {
  overflow: hidden;
  width: 100%;
  border: 3px solid var(--primary-color);
  border-radius: 8px;
  background-color: var(--secondary-color);
}

.chatBoxTitle {
  display: flex;
  justify-content: space-between;
  background: var(--primary-color);
  padding: 10px;
  color: var(--text-color);
  align-items: center;
}

.chatBoxTitle i ,.chatBoxTitle .svg-inline--fa {
  padding-top: 1px;
  font-size: 16px;
  margin: 0 10px;
  color: var(--text-color);
  cursor: pointer;
}

.chatTitleText {
  flex: 1;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.chatTitleText:hover {
  color: var(--secondary-color);
}

.chatBox {
  padding: var(--padding-main) 30px;
  box-sizing: border-box;
  background-color: var(--secondary-color);
  max-height: 900px;
  overflow: auto;
}

@media (max-width: 768px) {
  .chatBox {
    padding: var(--padding-main) 10px;
  }
}

@media (max-width: 480px) {
  .chatBox {
    padding: var(--padding-main) 5px;
  }
}

.chatItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: var(--padding-main) 0;
}

img.chatAvatar {
  width: var(--avatar-size)!important;
  height: var(--avatar-size)!important;
  border-radius: 50% !important;
  margin: 5px 10px 0 0 !important;
}

.chatContentWrapper {
  display: flex;
  flex-direction: column;
  width: calc(100% - 110px);
}

.chatContent {
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  padding: 10px;
  border-radius: 0 var(--radius-main) var(--radius-main) var(--radius-main);
  width: fit-content;
  max-width: 100%;
  word-wrap: break-word;
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
}

.chatCall {
  color: rgb(4, 147, 243);
  font-weight: bold;
}

.chatContent:hover {
  background: var(--primary-color);
  color: var(--text-color);
}

.chatName {
  color: var(--primary-color);
}

.chatMedia {
  max-width: 100%;
  height: auto;
  margin-top: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  border-radius: 8px;
}

.chatMedia:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.chatItem.me {
  flex-direction: row-reverse;
}

.chatItem.me .chatAvatar {
  margin: 5px 0 0 10px !important;
}

.chatItem.me .chatContentWrapper {
  align-items: flex-end;
}

.chatItem.me .chatContent {
  background: rgb(248, 251, 255);
  border-radius: var(--radius-main) 0 var(--radius-main) var(--radius-main);
  transition: none;
}

.chatItem.me .chatCall {
  color: rgb(225, 160, 8);
  font-weight: bold;
}

.chatItem.me .chatContent:hover {
  background: rgb(248, 251, 255);
  color: inherit;
}

.chatItem.me .chatName {
  color: var(--highlight-color);
}

.chatLink {
  text-decoration: underline;
  transition: color 0.3s ease-in-out, text-decoration 0.3s ease-in-out;
  color: var(--border-color);
}

.chatLink:hover {
  text-decoration: none;
  color: var(--highlight-color);
}

.chatQuoteCard {
  display: flex;
  border: 3px solid var(--highlight-color);
  border-radius: 0 var(--radius-main) var(--radius-main) var(--radius-main);
  flex-direction: column;
  align-items: stretch;
  margin: -12px;
}

.chatQuoteTitle {
  background-color: var(--highlight-color);
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.chatQuoteTitle span {
  padding-left: 64px;
}

.chatQuoteTitle i {
  margin-top: 2px;
  margin-left: 2px;
}

.chatMessage {
  margin: 16px 16px;
}

.chatQuote {
  display: flex;
  border: 3px solid var(--highlight-color);
  border-radius: 0 var(--radius-main) var(--radius-main) var(--radius-main);
  flex-direction: column;
  align-items: stretch;
  margin: 0px -10px -10px;
}

.quoteUser {
  background-color: var(--highlight-color);
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.quoteUser span {
  padding: -16px;
  font-weight: lighter;
}

.quoteUser i {
  margin-top: 2px;
  margin-left: 2px;
  font-weight: lighter;
}

.systemNotification {
  text-align: center;
  background-color: rgb(161, 161, 161);
  padding: 1px;
  margin: 20px auto;
  max-width: 50%;
  font-style: italic;
  font-weight: bold;
  border: 1px;
  border-radius: var(--radius-main);
}

.systemContent {
  font-size: 14px;
  line-height: 1.5;
}
</style>