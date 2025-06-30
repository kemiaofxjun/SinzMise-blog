<!-- AI 摘要（Cloudflare AI Worker） -->
<template>
  <div class="article-gpt s-card">
    <div class="title">
      <span class="name" @click="initAbstract">
        <i class="iconfont icon-robot"></i>
        文章摘要
        <i class="iconfont icon-up"></i>
      </span>
      <span :class="['logo', { loading }]" @click="showOther"> CloudFlare AI Worker </span>
    </div>
    <div class="content s-card">
      <span class="text">{{ abstractData === "" ? "加载中..." : abstractData }}</span>
      <span v-if="loading" class="point">|</span>
    </div>
    <div class="meta">
      <span class="tip">此内容根据文章生成，并经过人工审核，仅用于文章内容的解释与总结</span>
    </div>
  </div>
</template>

<script setup>
const { theme } = useData();
const router = useRouter();

// 摘要数据
const loading = ref(true);
const waitTimeOut = ref(null);
const abstractData = ref("");
const showIndex = ref(0);
const showType = ref(false);
const summary = ref('')

async function summarizer(input) {
  const response = await fetch(
    theme.value.postsummary.cfapi,
    {
      headers: {'Content-Type':'application/json'},
      method: 'POST',
      body: JSON.stringify(input)
    }
  );
  const result = await response.json()
  return result
}

function htmlFilter(html) {
  // clone for editing
  const tempElement = html.cloneNode(true);
  // remove class language-* elements
  const langElements = tempElement.querySelectorAll("[class^='language-']")
  langElements.forEach(el => el.parentNode?.removeChild(el))
  
  // remove class footnotes elements
  const footnotes = tempElement.querySelectorAll('.footnotes')
  footnotes.forEach(el => el.parentNode?.removeChild(el))

  // remove class footnote elements
  const footnote = tempElement.querySelectorAll('.footnote')
  footnote.forEach(el => el.parentNode?.removeChild(el))
  
  return tempElement.innerText
}

function run(){
  const articleElement = document.querySelector('.markdown-main-style');
  if (!articleElement) return
  
  loading.value = true
  const articleText = htmlFilter(articleElement)
  summarizer({message: articleText}).then((res) => {
    summary.value = res['response']['result']['response']
    loading.value = false
  })
}

// 输出摘要
const typeWriter = (text = null) => {
  try {
    const data = text || summary.value;
    if (!data) return false;
    if (showIndex.value < data.length) {
      abstractData.value += data.charAt(showIndex.value++);
      // 生成字符延迟
      const delay = Math.random() * (150 - 30) + 30;
      setTimeout(() => {
        typeWriter(text);
      }, delay);
    } else {
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    abstractData.value = "摘要生成失败";
    $message.error("摘要生成失败，请重试");
    console.error("摘要生成失败：", error);
  }
};

// 初始化摘要
const initAbstract = () => {
  abstractData.value = "";
  run();
  waitTimeOut.value = setTimeout(
    () => {
      typeWriter();
    },
    Math.random() * (3800 - 2500) + 2500,
  );
};

// 输出摘要介绍
const showOther = () => {
  if (loading.value) return false;
  const text =
    "我是汐塔魔法屋的摘要生成助理 CloudFlareGPT，如你所见，所有文本皆源于CloudFlare AI Worker生成的内容。";
  showIndex.value = 0;
  loading.value = true;
  abstractData.value = "";
  if (!showType.value) {
    showType.value = true;
    typeWriter(text);
  } else {
    typeWriter();
    showType.value = false;
  }
};

onMounted(() => {
  initAbstract()
});

onBeforeUnmount(() => {
  clearTimeout(waitTimeOut.value);
});
</script>

<style lang="scss" scoped>
.article-gpt {
  margin-top: 1.2rem;
  background-color: var(--main-card-second-background);
  user-select: none;
  cursor: auto;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    padding: 0 8px;
    .name {
      display: flex;
      align-items: center;
      color: var(--main-color);
      font-weight: bold;
      cursor: pointer;
      .icon-robot {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: normal;
        width: 26px;
        height: 26px;
        color: var(--main-card-background);
        background-color: var(--main-color);
        border-radius: 50%;
        margin-right: 8px;
      }
      .icon-up {
        font-weight: normal;
        font-size: 12px;
        margin-left: 6px;
        opacity: 0.6;
        color: var(--main-color);
        transform: rotate(90deg);
      }
    }
    .logo {
      padding: 4px 10px;
      font-size: 12px;
      color: var(--main-card-background);
      background-color: var(--main-color);
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      &.loading {
        animation: loading 1s infinite;
        cursor: not-allowed;
      }
    }
  }
  .content {
    cursor: auto;
    .point {
      color: var(--main-color);
      font-weight: bold;
      margin-left: 4px;
      animation: loading 0.8s infinite;
    }
  }
  .meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0 8px;
    font-size: 12px;

    .tip {
      opacity: 0.6;
    }
    .report {
      white-space: nowrap;
      margin-left: 12px;
      opacity: 0.8;
    }
  }
}
</style>
