import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
// 使用库构建产出的样式，与使用方的导入方式一致。
import 'inspira-ui-components/dist/index.css'
import './styles/utilities.css'
import './styles/docs.css'

createApp(App).use(router).mount('#app')
