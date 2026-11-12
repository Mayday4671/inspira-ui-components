import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { getComponent } from './data/registry'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: () => import('./views/HomeView.vue') },
  { path: '/guide', name: 'guide', component: () => import('./views/GuideView.vue') },
  { path: '/themes', name: 'themes', component: () => import('./views/ThemesView.vue') },
  { path: '/components', name: 'components', component: () => import('./views/CatalogView.vue') },
  {
    path: '/component/:slug',
    name: 'component',
    component: () => import('./views/ComponentView.vue'),
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
