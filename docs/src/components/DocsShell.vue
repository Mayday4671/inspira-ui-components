<script setup lang="ts">
/**
 * 文档页壳层：左侧栏 + 工作区（正文 + 可选右侧 TOC）。
 * 侧栏为 sticky + 隐藏滚动条，页面主体唯一纵向滚动条为浏览器主滚动条。
 */
import { computed } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppToc from './AppToc.vue'
import { useSidebar } from '../composables/sidebar'

const props = defineProps<{
  active: 'guide' | 'themes' | 'components'
  tocLinks?: Array<[string, string]>
}>()

const { open } = useSidebar()

const hasToc = computed(() => Boolean(props.tocLinks?.length))
</script>

<template>
  <div class="docs-shell">
    <div
      class="menu-backdrop"
      :class="{ show: open }"
      @click="open = false"
    ></div>
    <AppSidebar :open="open" @close="open = false" />
    <div class="docs-workspace">
      <div class="docs-grid" :class="{ 'no-toc': !hasToc }">
        <main class="doc-main">
          <slot />
        </main>
        <AppToc v-if="hasToc" :links="tocLinks!" />
      </div>
    </div>
  </div>
</template>
