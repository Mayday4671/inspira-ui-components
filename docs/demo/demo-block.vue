/**
 * Element Plus 官网同款演示块：
 * 上：真实渲染的示例；下：「显示代码」展开完整源码（语法高亮 + 复制）。
 * code 由外部以 `?raw` 方式导入，保证展示的源码与运行的示例永远一致。
 */
<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { useData } from 'vitepress'
import { codeToHtml } from 'shiki'
import type { Component } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  demo: Component
  code: string
  layout?: 'row' | 'column' | 'center' | 'grid'
  surface?: 'default' | 'light' | 'dark' | 'checker'
  minHeight?: number | string
}>(), {
  layout: 'row',
  surface: 'default',
  minHeight: undefined,
})

const expanded = ref(false)
const copied = ref(false)
const html = ref('')
const { isDark } = useData()
const sourceId = `demo-source-${useId()}`

const theme = computed(() => (isDark.value ? 'github-dark' : 'github-light'))
const stageStyle = computed(() => ({
  minHeight: typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight,
}))

async function highlight() {
  html.value = await codeToHtml(props.code, {
    lang: 'vue',
    theme: theme.value,
  })
}

watch(theme, highlight, { immediate: true })

function toggle() {
  expanded.value = !expanded.value
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {
    /* 浏览器不支持时忽略 */
  }
}
</script>

<template>
  <div class="demo-block">
    <p v-if="title" class="demo-block-title">{{ title }}</p>

    <div
      :class="['demo-block-stage', `is-${layout}`, `is-${surface}`]"
      :style="stageStyle"
    >
      <component :is="demo" />
    </div>

    <div class="demo-block-divider">
      <div class="demo-block-actions">
        <button type="button" class="demo-block-btn" aria-label="复制示例代码" @click="copy">
          {{ copied ? '✓ 已复制' : '复制代码' }}
        </button>
        <button
          type="button"
          class="demo-block-btn demo-block-btn-main"
          aria-label="切换示例代码"
          :aria-expanded="expanded"
          :aria-controls="sourceId"
          @click="toggle"
        >
          {{ expanded ? '隐藏代码' : '显示代码' }}
        </button>
      </div>
    </div>

    <div :id="sourceId" v-show="expanded" class="demo-block-source">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="html" class="demo-block-code" v-html="html" />
      <pre v-else class="demo-block-plain">{{ code }}</pre>
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  margin: 16px 0 22px;
  overflow: hidden;
}

.demo-block-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
  padding: 14px 20px 0;
}

.demo-block-stage {
  padding: 22px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
}

.demo-block-stage.col {
  flex-direction: column;
  align-items: stretch;
}

.demo-block-stage.is-column {
  flex-direction: column;
  align-items: stretch;
}

.demo-block-stage.is-center {
  justify-content: center;
}

.demo-block-stage.is-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.demo-block-stage.is-light {
  color: #18181b;
  background: #fff;
}

.demo-block-stage.is-dark {
  color: #fafafa;
  background: #18181b;
}

.demo-block-stage.is-checker {
  background-color: var(--vp-c-bg-soft);
  background-image:
    linear-gradient(45deg, var(--vp-c-divider) 25%, transparent 25%),
    linear-gradient(-45deg, var(--vp-c-divider) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--vp-c-divider) 75%),
    linear-gradient(-45deg, transparent 75%, var(--vp-c-divider) 75%);
  background-position: 0 0, 0 8px, 8px -8px, -8px 0;
  background-size: 16px 16px;
}

.demo-block-divider {
  border-top: 1px solid var(--vp-c-border);
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-block-actions {
  display: flex;
  gap: 8px;
}

.demo-block-btn {
  font-size: 13px;
  line-height: 1;
  padding: 7px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
}

.demo-block-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.demo-block-btn-main {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.demo-block-btn-main:hover {
  opacity: 0.85;
  color: #fff;
}

.demo-block-source {
  border-top: 1px solid var(--vp-c-border);
  overflow: auto;
}

.demo-block-code :deep(pre) {
  margin: 0;
  padding: 16px 20px;
  background: transparent !important;
}

.demo-block-plain {
  margin: 0;
  padding: 16px 20px;
  font-size: 13px;
  line-height: 1.6;
}
</style>
