<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import UiIcon from './UiIcon.vue'
import { CATEGORIES, componentCount, COMPONENTS } from '../data/registry'

const route = useRoute()

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const collapsed = reactive<Record<string, boolean>>({})
const ready = ref(false)

const categories = CATEGORIES.filter((c) => c !== '全部')

const activeSlug = computed(() => (route.name === 'component' ? (route.params.slug as string) : ''))

function toggle(cat: string) {
  collapsed[cat] = !collapsed[cat]
}

function onKeydown(e: KeyboardEvent, cat: string) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggle(cat)
  }
}

defineExpose({ ready })
void ready
void componentCount
void COMPONENTS
</script>

<template>
  <aside class="sidebar" :class="{ open }" aria-label="侧边导航">
    <p class="sidebar-title">开始使用</p>
    <router-link class="side-link" to="/guide" :class="{ active: route.name === 'guide' }" @click="emit('close')">
      <UiIcon name="book" /> 快速开始
    </router-link>
    <router-link class="side-link" to="/themes" :class="{ active: route.name === 'themes' }" @click="emit('close')">
      <UiIcon name="palette" /> 主题定制
    </router-link>

    <p class="sidebar-title" style="margin-top: 21px">组件文档</p>
    <router-link
      class="side-link"
      to="/components"
      :class="{ active: route.name === 'components' }"
      @click="emit('close')"
    >
      <UiIcon name="grid" /> 全部组件
      <span style="margin-left: auto; font-size: 10px; color: var(--weak)">{{ componentCount }}</span>
    </router-link>

    <div class="side-sub">
      <template v-for="cat in categories" :key="cat">
        <div
          class="side-category"
          :class="{ folded: collapsed[cat] }"
          role="button"
          tabindex="0"
          :aria-expanded="!collapsed[cat]"
          @click="toggle(cat)"
          @keydown="onKeydown($event, cat)"
        >
          <span>{{ cat }} · {{ cat === '交互' ? 'Interaction' : cat === '数据' ? 'Data' : cat === '背景' ? 'Backgrounds' : ({ 按钮: 'Buttons', 卡片: 'Cards', 文本: 'Text' } as any)[cat] }}</span>
          <UiIcon name="down" />
        </div>
        <div class="side-items" :class="{ folded: collapsed[cat] }">
          <router-link
            v-for="c in COMPONENTS.filter((x) => x.category === cat)"
            :key="c.slug"
            class="side-link"
            :to="`/component/${c.slug}`"
            :class="{ active: activeSlug === c.slug }"
            @click="emit('close')"
          >
            <span class="side-zh">{{ c.zh }}</span>
            <span class="side-en">{{ c.name }}</span>
            <span v-if="c.recommended" class="side-rec">荐</span>
          </router-link>
        </div>
      </template>
    </div>

    <div class="side-end">
      基于 Vue 3 · TypeScript<br />
      按需导入 · 轻量集成<br />
      <router-link to="/guide">查看使用指南</router-link>
    </div>
  </aside>
</template>
