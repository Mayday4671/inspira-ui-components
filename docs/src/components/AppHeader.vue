<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UiIcon from './UiIcon.vue'
import { version as packageVersion } from 'inspira-ui-components/package.json'
import { componentCount, REPO_URL } from '../data/registry'
import { toggleTheme, useTheme } from '../composables/theme'

const emit = defineEmits<{ (e: 'open-search'): void; (e: 'toggle-sidebar'): void }>()

const route = useRoute()
const theme = useTheme()

const activeNav = computed(() => {
  const name = route.name as string
  if (name === 'component' || name === 'components') return 'components'
  return name === 'guide' || name === 'themes' ? name : 'home'
})
</script>

<template>
  <header class="site-header">
    <div class="top-inner">
      <button
        class="icon-btn menu-button"
        aria-label="展开导航"
        title="展开导航"
        @click="emit('toggle-sidebar')"
      >
        <UiIcon name="menu" />
      </button>

      <router-link class="brand" to="/home" aria-label="Inspira UI 首页">
        <span class="logo">∿</span> Inspira UI <em>组件库</em>
      </router-link>

      <nav class="nav-top" aria-label="主导航">
        <router-link to="/home" :class="{ active: activeNav === 'home' }">首页</router-link>
        <router-link to="/guide" :class="{ active: activeNav === 'guide' }">指南</router-link>
        <router-link to="/components" :class="{ active: activeNav === 'components' }">组件</router-link>
        <router-link to="/themes" :class="{ active: activeNav === 'themes' }">主题</router-link>
      </nav>

      <div class="top-actions">
        <button class="search-trigger" aria-label="搜索组件" @click="emit('open-search')">
          <UiIcon name="search" small />
          <span>搜索组件、指南...</span>
          <kbd class="kbd">Ctrl K</kbd>
        </button>
        <button
          class="icon-btn"
          :title="theme === 'dark' ? '切换亮色' : '切换暗色'"
          :aria-label="theme === 'dark' ? '切换亮色' : '切换暗色'"
          @click="toggleTheme()"
        >
          <UiIcon :name="theme === 'dark' ? 'sun' : 'moon'" />
        </button>
        <span class="divider-v"></span>
        <span class="version">v{{ packageVersion }}</span>
        <a
          class="icon-btn github-btn"
          :href="REPO_URL"
          title="项目 GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <UiIcon name="github" />
        </a>
      </div>
    </div>
  </header>
  <span class="screen-reader-only">{{ componentCount }}</span>
</template>
