import { loadScript, loadCSS } from "./commonTools.mjs";

const initComments = async (themeConfig) => {
  try {
    // 必要数据
    const option = themeConfig.comment;
    const commentType = option.type;
    if (!option.enable) return false;
    switch (commentType) {
      case "artalk":
        const server = option[commentType].server;
        console.log("开始加载", commentType, server);
        // 引入资源
        await loadCSS(`${server}/dist/Artalk.css`);
        return await new Promise((resolve, reject) => {
          loadScript(`${server}/dist/Artalk.js`, {
            callback: () => {
              if (typeof Artalk === "object") {
                resolve(Artalk);
              } else {
                reject(new Error("Artalk 初始化失败"));
              }
            },
          });
        });
      case "twikoo":
        const envId = option[commentType].envId;
        console.log("开始加载", commentType, envId);
        // 引入资源
        return await new Promise((resolve, reject) => {
          loadScript(option[commentType].js, {
            callback: () => {
              if (typeof twikoo === "object") {
                resolve(twikoo);
              } else {
                reject(new Error("Twikoo 初始化失败"));
              }
            },
          });
        });
      case "waline":
        const serverURL = option[commentType].serverURL;
        console.log("开始加载", commentType, serverURL);
        // 引入资源
        await loadCSS(option[commentType].css);
        return await new Promise((resolve, reject) => {
          loadScript(option[commentType].js, {
            callback: () => {
              if (typeof Waline === "object") {
                resolve(Waline);
              } else {
                reject(new Error("Waline 初始化失败"));
              }
            },
          });
        });  
      default:
        return false;
    }
  } catch (error) {
    console.error(`${commentType} 初始化失败`, error);
    throw error;
  }
};

export default initComments;
