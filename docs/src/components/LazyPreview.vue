<script setup lang="ts">
/**
 * 目录/首页预览的懒挂载容器。
 * 组件接近视口（±300px）才渲染真实组件，远离视口即卸载。
 *
 * 必要性：全站 159 个目录卡片若全部实时渲染，WebGL 上下文数量
 * 远超浏览器上限（Chrome ~16），超限组件 context lost 后每帧抛错，
 * unhandledrejection 风暴会饿死 Vue 的微任务调度（点击/路由无响应）。
 * 懒挂载后同屏 WebGL 实例恒为个位数，顺带消除整页满载渲染的性能问题。
 *
 * 实现说明：优先 IntersectionObserver；若宿主环境 IO 不触发
 * （部分内嵌 webview 的已知怪癖），自动降级为 scroll + rAF 节流的
 * getBoundingClientRect 检测，保证任何环境可用。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CatalogPreview from './CatalogPreview.vue'
import type { PreviewKind } from '../data/registry'

defineProps<{ kind: PreviewKind }>()

const host = ref<HTMLElement | null>(null)
const visible = ref(false)

const MARGIN = 300

let io: IntersectionObserver | null = null
let ioFired = false
let rafId = 0
let ticking = false

function inViewport(): boolean {
  const el = host.value
  if (!el) return false
  const rect = el.getBoundingClientRect()
  return rect.bottom > -MARGIN && rect.top < window.innerHeight + MARGIN
}

function check() {
  visible.value = inViewport()
}

function onScroll() {
  if (ticking) return
  ticking = true
  rafId = requestAnimationFrame(() => {
    ticking = false
    check()
  })
}

onMounted(() => {
  check()
  if (typeof IntersectionObserver === 'function') {
    io = new IntersectionObserver(
      (entries) => {
        ioFired = true
        for (const entry of entries) visible.value = entry.isIntersecting
      },
      { rootMargin: `${MARGIN}px 0px` },
    )
    io.observe(host.value!)
  }
  // 兜底：IO 两条路径之外，任何滚动/尺寸变化都用 rect 复核
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  // 若 IO 迟迟未回调（宿主怪癖），降级为滚动检测驱动
  setTimeout(() => {
    if (!ioFired) {
      io?.disconnect()
      io = null
      onScroll()
    }
  }, 300)
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div ref="host" class="lazy-preview">
    <CatalogPreview v-if="visible" :kind="kind" />
  </div>
</template>

<style scoped>
.lazy-preview {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-height: 120px;
}
</style>
