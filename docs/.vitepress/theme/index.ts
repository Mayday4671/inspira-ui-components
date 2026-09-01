import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import InspiraUI from 'inspira-ui-components'
// 文档站与真实使用方完全一致：显式引入组件库编译产物样式，自身零 Tailwind
import 'inspira-ui-components/dist/index.css'
import DemoBlock from '../../demo/demo-block.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 演示 Element Plus 同款的全量注册方式（所有 IuXxx 全局可用）
    app.use(InspiraUI)
    app.component('DemoBlock', DemoBlock)
  },
} satisfies Theme
