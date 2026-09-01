import { createApp } from 'vue'
import App from './app.vue'
import './assets/layout.css'
import './assets/tw.css'

// 源码模式下组件库入口自带样式；产物模式（模拟使用方）显式引入 dist/index.css
if (import.meta.env.MODE === 'dist') {
  import('../../packages/inspira-ui/dist/index.css')
}

createApp(App).mount('#app')
