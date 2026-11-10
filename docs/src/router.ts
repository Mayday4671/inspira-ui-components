import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from './views/HomeView.vue'
import CatalogView from './views/CatalogView.vue'
import ComponentView from './views/ComponentView.vue'
import GuideView from './views/GuideView.vue'
import ThemesView from './views/ThemesView.vue'
import { getComponent } from './data/registry'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: HomeView },
  { path: '/guide', name: 'guide', component: GuideView },
  { path: '/themes', name: 'themes', component: ThemesView },
  { path: '/components', name: 'components', component: CatalogView },
  {
    path: '/component/:slug',
    name: 'component',
    component: ComponentView,
    beforeEnter: (to) => {
      // 未知 slug 一律回到组件总览，不渲染虚构页面
      if (!getComponent(to.params.slug as string)) return { path: '/components' }
      return true
    },
  },
  { path: '/:pathMatch(.*)*', redirect: '/home' },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 与原型一致：路由切换回到顶部；页内锚点由 TOC 自行 smooth 滚动
    return { top: 0, behavior: 'instant' }
  },
})
