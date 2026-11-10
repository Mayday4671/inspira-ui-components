import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
// 全局注册兜底：显式 import 之外，任何模板引用的 Iu 组件均可解析
import InspiraUI from 'inspira-ui-components'
// 组件库样式：直接使用 dist 编译产物（库构建由独立 gen-css 管线产出，含暗色规则）
import 'inspira-ui-components/dist/index.css'
import './styles/docs.css'

createApp(App).use(router).use(InspiraUI).mount('#app')
