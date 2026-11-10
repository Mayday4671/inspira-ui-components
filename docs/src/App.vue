<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import SearchDialog from './components/SearchDialog.vue'
import { toast, useToasts } from './composables/toast'
import { bindThemeToaster } from './composables/theme'
import { useSidebar } from './composables/sidebar'

const router = useRouter()
const searchOpen = ref(false)
const toasts = useToasts()
const { open: sideOpen, close: closeSidebar } = useSidebar()

bindThemeToaster(toast)

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchOpen.value = true
  }
  if (e.key === 'Escape') {
    searchOpen.value = false
    closeSidebar()
  }
}

// 路由切换后关闭移动端抽屉
router.afterEach(() => closeSidebar())

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <!-- SVG 图标雪碧图（与原型一致的线型图标） -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none" aria-hidden="true"><defs>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="7"/><path d="m16 16 4.5 4.5"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20.7 13.1a8.8 8.8 0 0 1-9.8-9.8A8.9 8.9 0 1 0 20.7 13Z"/></symbol>
    <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h16m-7-7 7 7-7 7"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m4 12 5 5L20 6"/></symbol>
    <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
    <symbol id="i-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></symbol>
    <symbol id="i-spark" viewBox="0 0 24 24"><path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z"/></symbol>
    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></symbol>
    <symbol id="i-book" viewBox="0 0 24 24"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H20v16H5.5A2.5 2.5 0 0 0 3 21V5.5ZM3 20.5a2.5 2.5 0 0 1 2.5-2.5H20"/></symbol>
    <symbol id="i-bolt" viewBox="0 0 24 24"><path d="m13 2-9 11h7l-1 9 10-12h-7l0-8Z"/></symbol>
    <symbol id="i-code" viewBox="0 0 24 24"><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-4 4 2-10"/></symbol>
    <symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18h1.5c1.5 0 2.2-2 .9-3-.8-.7-.1-2 1-2H18a3 3 0 0 0 3-3c0-5.6-3.9-10-9-10Z"/><circle cx="7" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="16" cy="8" r="1"/></symbol>
    <symbol id="i-github" viewBox="0 0 24 24"><path d="M9 19c-4 1-4-2-6-2m13 4v-3.5a3 3 0 0 0-.9-2.3c3-.4 6.1-1.5 6.1-6.7a5 5 0 0 0-1.4-3.5 4.8 4.8 0 0 0-.1-3.5S18.5 1 16 3a14 14 0 0 0-8 0C5.5 1 4.3 1.5 4.3 1.5a4.8 4.8 0 0 0-.1 3.5A5 5 0 0 0 2.8 8.5c0 5.2 3.1 6.3 6.1 6.7a3 3 0 0 0-.9 2.3V21"/></symbol>
    <symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 2 10 6-10 6L2 8l10-6Zm-10 10 10 6 10-6M2 16l10 6 10-6"/></symbol>
    <symbol id="i-package" viewBox="0 0 24 24"><path d="m12 2 9 5-9 5-9-5 9-5ZM3 7v10l9 5 9-5V7M12 12v10"/></symbol>
    <symbol id="i-box" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 9v12"/></symbol>
    <symbol id="i-type" viewBox="0 0 24 24"><path d="M4 7V4h16v3M12 4v16m-5 0h10"/></symbol>
    <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V4M4 20h16M8 15l4-5 3 3 5-7"/></symbol>
    <symbol id="i-mouse" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 2v7"/></symbol>
    <symbol id="i-external" viewBox="0 0 24 24"><path d="M13 4h7v7m0-7L10 14M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></symbol>
    <symbol id="i-rotate" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 1 3 6.7M3 18v-6h6"/></symbol>
  </defs></svg>

  <AppHeader
    @open-search="searchOpen = true"
    @toggle-sidebar="sideOpen = !sideOpen"
  />

  <RouterView />

  <SearchDialog :open="searchOpen" @close="searchOpen = false" />

  <Teleport to="#portal">
    <div v-for="t in toasts" :key="t.id" class="toast">{{ t.msg }}</div>
  </Teleport>
</template>
