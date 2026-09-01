<script setup lang="ts">
import { ref, watch } from 'vue'
import ButtonsDemo from './demos/buttons-demo.vue'
import CardsDemo from './demos/cards-demo.vue'
import TextDemo from './demos/text-demo.vue'
import MiscDemo from './demos/misc-demo.vue'
import BackgroundsDemo from './demos/backgrounds-demo.vue'

const isDark = ref(false)

watch(
  isDark,
  (dark) => {
    document.documentElement.classList.toggle('dark', dark)
  },
  { immediate: true },
)

const isDist = import.meta.env.MODE === 'dist'

const nav = [
  { id: 'buttons', label: '按钮 Buttons' },
  { id: 'cards', label: '卡片 Cards' },
  { id: 'text', label: '文本动画 Text' },
  { id: 'misc', label: '交互 Misc' },
  { id: 'backgrounds', label: '背景 Backgrounds' },
]
</script>

<template>
  <aside class="pg-sidebar">
    <h1 class="pg-logo">inspira-ui-components</h1>
    <p class="pg-logo-sub">v0.1.0 · 20 components</p>
    <nav class="pg-nav">
      <div v-for="item in nav" :key="item.id" class="pg-nav-group">
        <p class="pg-nav-title">{{ item.label }}</p>
        <a :href="`#${item.id}`">{{ item.label }}</a>
      </div>
    </nav>
  </aside>

  <main class="pg-main">
    <header class="pg-header">
      <h2 class="pg-header-title">Playground</h2>
      <div class="pg-header-actions">
        <span class="pg-mode-badge" :class="{ 'is-dist': isDist }">
          {{ isDist ? '产物模式（模拟 npm 使用方）' : '源码模式' }}
        </span>
        <button class="pg-btn" type="button" @click="isDark = !isDark">
          {{ isDark ? '☀️ 亮色' : '🌙 暗色' }}
        </button>
      </div>
    </header>

    <div class="pg-content">
      <ButtonsDemo />
      <CardsDemo />
      <TextDemo />
      <MiscDemo />
      <BackgroundsDemo />
    </div>
  </main>
</template>
