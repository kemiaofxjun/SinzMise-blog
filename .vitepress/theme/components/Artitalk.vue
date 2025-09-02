<template>
  <div class="moments-container">
    <!-- 这里放你原来的 template 内容 -->
  </div>
</template>

<script setup lang="ts">
// 1. 移除 Nuxt 特有 API
//    - useAppConfig()
//    - useLayoutStore()
//    - useSeoMeta()
//    - useState() → 用 ref() 替代

import { ref, computed, onMounted } from 'vue'

// 2. 模拟状态
const talksState = ref({
  talks: [] as TalkItem[],
  loading: true,
  error: false,
  lastFetchTime: 0,
})

// 3. 模拟 API 请求
const API_CONFIG = {
  MEMO_API: 'https://moment.051531.xyz/api/memo/list',
  PAGE_SIZE: 30,
}

// 4. 原有逻辑基本不变
async function fetchTalks() {
  const now = Date.now()
  if (now - talksState.value.lastFetchTime < 30 * 60 * 1000) return

  try {
    talksState.value.loading = true
    talksState.value.error = false

    const res = await fetch(API_CONFIG.MEMO_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ size: API_CONFIG.PAGE_SIZE }),
    })

    const data = await res.json()
    if (data.code === 0 && data.data?.list) {
      talksState.value.talks = data.data.list.map(formatTalk)
      talksState.value.lastFetchTime = now
    }
  } catch (e) {
    talksState.value.error = true
  } finally {
    talksState.value.loading = false
  }
}

// 5. 格式化函数（简化）
function formatTalk(item: any): TalkItem {
  // 你可以保留原来的 formatContent 逻辑
  return {
    content: {
      text: item.content,
      images: item.imgs?.split(',') || [],
    },
    user: {
      username: item.user.username,
      nickname: item.user.nickname,
      avatarUrl: item.user.avatarUrl,
    },
    date: item.createdAt,
    location: item.location || '',
    tags: Array.isArray(item.tags) ? item.tags : item.tags?.split(',') || ['无标签'],
  }
}

onMounted(() => {
  fetchTalks()
})
</script>

<style lang="scss" scoped>
// stats 区域
.essay-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: .1rem;
    color: #eee;
    text-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
    font-family: var(--font-monospace);
    opacity: 0.7;

    .powered-by {
        font-size: .7rem;
    }

    .essay-more {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: .8rem;
        opacity: .8;
        transition: all 0.2s;

        &:hover {
            color: #fff;
            opacity: 1;
        }
    }
}

.page-essay {
    margin: 1rem;
    animation: float-in 0.2s backwards;

    .talk-item {
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 0 0 1px var(--c-bg-soft);
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        animation: float-in 0.3s backwards;
        animation-delay: var(--delay);
    }

    .talk-meta {
        display: flex;
        align-items: center;
        gap: 10px;

        .avatar {
            width: 3em;
            border-radius: 2em;
            box-shadow: 2px 4px 1rem var(--ld-shadow);
        }

        .info {
            .talk-nick {
                display: flex;
                align-items: center;
                gap: 5px;

                .verified {
                    color: var(--c-primary);
                    font-size: 16px;
                }
            }

            .talk-date {
                font-size: 0.8rem;
                color: var(--c-text-3);
                font-family: var(--font-monospace);
            }
        }
    }

    .talk-content {
        line-height: 1.6;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        color: var(--c-text-2);

        :deep(.talk_content_link) {
            margin: 0 -0.1em;
            padding: 0 0.1em;
            background: linear-gradient(var(--c-primary-soft), var(--c-primary-soft)) no-repeat center bottom / 100% 0.1em;
            color: var(--c-primary);
            text-decoration: none;
            transition: all 0.2s;

            &:hover {
                border-radius: 0.3em;
                background-size: 100% 100%;
            }
        }

        :deep(.zone_imgbox) {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;

            .img-item {
                position: relative;
                padding-bottom: 100%;
                border-radius: 8px;
                overflow: hidden;

                img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    cursor: zoom-in;
                    transition: transform .3s;

                    &:hover {
                        transform: scale(1.05);
                    }
                }
            }
        }

        .video-container {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%;
            border-radius: 8px;
            overflow: hidden;

            iframe,
            video {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
            }

            .online-video {
                object-fit: cover;
            }
        }

        .douban-card {
            display: flex;
            overflow: hidden;
            text-decoration: none;
            background-color: var(--c-bg-2);
            box-shadow: 0 0 0 1px var(--c-bg-soft);
            position: relative;
            height: 100px;

            .douban-card-bgimg {
                position: absolute;
                inset: 0;
                filter: blur(15px);
                opacity: 0.3;
                background-size: cover;
                background-position: center;
            }

            .douban-card-left {
                flex: 0 0 80px;
                padding: 10px;
                position: relative;

                .douban-card-img {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    border-radius: 8px;
                }
            }

            .douban-card-right {
                flex: 1;
                padding: 10px;
                position: relative;

                .douban-card-item {
                    color: var(--c-text);
                    font-size: 0.8rem;
                }
            }
        }

        .external-link {
            overflow: hidden;
            background-color: var(--c-bg-2);
            box-shadow: 0 0 0 1px var(--c-bg-soft);
            transition: all .2s;

            a {
                display: flex;
                text-decoration: none;
                height: 60px;
                align-items: center;
                gap: 12px;
                padding: 8px;

                .link-left {
                    width: 44px;
                    height: 44px;
                    overflow: hidden;
                    flex-shrink: 0;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        border-radius: 8px;
                        transition: transform .3s;
                    }
                }

                .link-right {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 6px;

                    .link-title {
                        color: var(--c-text-2);
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        font-size: 0.95rem;
                        transition: all .2s;
                    }

                    .icon {
                        color: var(--c-text-3);
                        transition: transform 0.2s ease;
                    }
                }

                &:hover {
                    .link-left img {
                        transform: scale(1.05);
                    }

                    .icon {
                        transform: translateX(4px) scale(1.6);
                    }
                }
            }
        }
    }

    .talk-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--c-text-3);

        .talk-tags {
            display: flex;
            gap: 4px;
            font-size: .7rem;

            .tag,
            .location {
                background-color: var(--c-bg-2);
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                padding: 2px 4px;
                transition: all .2s;

                &:hover {
                    opacity: 0.8;
                }
            }

            .location {
                color: var(--c-primary);
            }
        }
    }

    .loading-container,
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 500px;
        color: var(--c-text-2);
        gap: 12px;

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--c-bg-3);
            border-top: 3px solid var(--c-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        .error-icon {
            font-size: 4rem;
            color: var(--c-danger);
        }
    }

    .talks-footer {
        text-align: center;
        padding: 2rem 0;
        color: var(--c-text-3);
        font-size: 0.9rem;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>