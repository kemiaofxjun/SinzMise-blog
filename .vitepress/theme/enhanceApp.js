import DefaultTheme from 'vitepress/theme'
import ArtitalkShuo from '../components/ArtitalkShuo.vue'   // 相对路径要对

export default {
  extends: DefaultTheme,   // ← 注意这里用 extends，而不是 DefaultTheme 的展开
  enhanceApp({ app }) {
    app.component('ArtitalkShuo', ArtitalkShuo)
  }
}