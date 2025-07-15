<template>
  <div ref="commentRef" id="comment-dom" :class="['comment-content', 'waline', { fill }]" >正在加载评论系统。。。。。。</div>
</template>

<script setup>
import { jumpRedirect } from "@/utils/commonTools";
import initComments from "@/utils/initComments";

const props = defineProps({
  // 填充评论区
  fill: {
    type: [Boolean, String],
    default: false,
  },
});

const { theme } = useData();
const { comment } = theme.value;

// 评论数据
const waline = ref(null);
const commentRef = ref(null);

// 多语言
const locale = {
  nick: '昵称',
  nickError: '昵称不能少于3个字符',
  mail: '邮箱',
  mailError: '请填写正确的邮件地址',
  link: '网址',
  optional: '可选',
  placeholder: comment.waline.placeholder || '欢迎评论',
  sofa: '来发评论吧~',
  submit: '提交',
  like: '喜欢',
  cancelLike: '取消喜欢',
  reply: '回复',
  cancelReply: '取消回复',
  comment: '评论',
  refresh: '刷新',
  more: '加载更多...',
  preview: '预览',
  emoji: '表情',
  uploadImage: '上传图片',
  seconds: '秒前',
  minutes: '分钟前',
  hours: '小时前',
  days: '天前',
  now: '刚刚',
  uploading: '正在上传',
  login: '登录',
  logout: '退出',
  admin: '博主',
  sticky: '置顶',
  word: '字',
  wordHint: '评论字数应在 $0 到 $1 字之间！\n当前字数：$2',
  anonymous: '匿名',
  level0: '潜水',
  level1: '冒泡',
  level2: '吐槽',
  level3: '活跃',
  level4: '话痨',
  level5: '传说',
  gif: '表情包',
  gifSearchPlaceholder: '搜索表情包',
  profile: '个人资料',
  approved: '通过',
  waiting: '待审核',
  spam: '垃圾',
  unsticky: '取消置顶',
  oldest: '按倒序',
  latest: '按正序',
  hottest: '按热度',
  reactionTitle: '你认为这篇文章怎么样？',
};

// 初始化 Waline
const initWaline = async () => {
  try {
    await nextTick();
    const Waline = await initComments(theme.value);
    waline.value = Waline.init({
      el: commentRef.value || "#comment-dom",
      serverURL: comment.waline.serverURL,
      lang: comment.waline.lang || 'zh-CN',
      commentSorting: comment.waline.commentSorting || 'latest',
      dark: 'html.dark',
      meta: comment.waline.meta || ['nick', 'mail', 'link'],
      requiredMeta: comment.waline.requiredMeta || ['nick', 'mail'],
      login: comment.waline.login || 'enable',
      wordLimit: comment.waline.wordLimit || '0',
      imageUploader: comment.waline.imageUploader || true,
      pageSize: comment.waline.pageSize || '10',
      recaptchaV3Key: comment.waline.recaptchaV3Key || '',
      turnstileKey: comment.waline.turnstileKey || '',
      reaction: comment.waline.reaction || true,
      emoji: comment.waline.emoji || ['//unpkg.com/@waline/emojis@1.1.0/weibo'],
      pageview: true,
      comment: true,
      locale,
    });
    return waline.value;
  } catch (error) {
    console.error("初始化评论出错：", error);
  }
};

// 填充评论区
const fillComments = (data) => {
  console.log("填充评论：", data);
  // 获取评论元素
  const commentDom = document.querySelector("#wl-edit.wl-editor");
  if (!commentDom) return false;
  // 获取输入框
  const commentInput = commentDom.querySelector("textarea");
  // 写入内容
  commentInput.value = data + "\n\n";
  commentInput.focus();
};

onMounted(() => {
  initWaline();
  if (props.fill) fillComments(props.fill);
  jumpRedirect(null, theme.value, true);
});
</script>
<style lang="scss">
#comment-dom,
.comment-content {
  --waline-theme-color: var(--main-color) !important;
  --waline-active-color: var(--main-color-hover) !important;
}
</style>