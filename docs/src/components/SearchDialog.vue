<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import UiIcon from './UiIcon.vue'
import { COMPONENTS, getComponent, type ComponentMeta } from '../data/registry'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const router = useRouter()
const query = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)

interface ResultItem {
  name: string
  slug: string
  category: string
}

const shortcuts: ResultItem[] = [
  { name: '快速开始', slug: '/guide', category: '指南' },
  { name: '组件总览', slug: '/components', category: '目录' },
  { name: '主题定制', slug: '/themes', category: '指南' },
]

const results = computed<ResultItem[]>(() => {
  const q = query.value.toLowerCase().trim()
  const items: ResultItem[] = [
    ...shortcuts,
    ...COMPONENTS.map((x) => ({ name: `${x.name} · ${x.zh}`, slug: `/component/${x.slug}`, category: x.category })),
  ]
  return items.filter((x) => `${x.name} ${x.category}`.toLowerCase().includes(q)).slice(0, 12)
})

watch(
  () => props.open,
  (open) => {
    if (open) {
      query.value = ''
      selectedIndex.value = 0
      requestAnimationFrame(() => inputEl.value?.focus())
    }
  },
)

watch(results, () => {
  selectedIndex.value = 0
})

function go(item: ResultItem) {
  emit('close')
  router.push(item.slug)
}

function onKeydown(e: KeyboardEvent) {
  const arr = results.value
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const delta = e.key === 'ArrowDown' ? 1 : -1
    selectedIndex.value = (selectedIndex.value + delta + arr.length) % Math.max(arr.length, 1)
  } else if (e.key === 'Enter' && arr.length) {
    e.preventDefault()
    go(arr[selectedIndex.value] ?? arr[0]!)
  }
}

function iconFor(item: ResultItem) {
  if (item.category === '指南') return 'book'
  if (item.category === '目录') return 'grid'
  return 'spark'
}

void getComponent
type ComponentMetaUnused = ComponentMeta
void (0 as unknown as ComponentMetaUnused)
</script>

<template>
  <Teleport to="#portal">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <div class="search-dialog" role="dialog" aria-modal="true" aria-label="搜索组件">
        <div class="dialog-search">
          <UiIcon name="search" />
          <input
            id="globalSearch"
            ref="inputEl"
            v-model="query"
            type="search"
            placeholder="搜索组件、指南…"
            aria-label="搜索关键字"
            @keydown="onKeydown"
          />
          <kbd class="kbd">ESC</kbd>
        </div>
        <div class="dialog-results">
          <div class="dialog-caption">{{ query ? '搜索结果' : '快捷入口 · 组件' }}</div>
          <template v-if="results.length">
            <a
              v-for="(item, i) in results"
              :key="item.slug"
              class="dialog-result"
              :class="{ selected: i === selectedIndex }"
              :href="`#${item.slug}`"
              @click.prevent="go(item)"
              @mouseenter="selectedIndex = i"
            >
              <UiIcon :name="iconFor(item)" small />
              <span>{{ item.name }}</span>
              <small>{{ item.category }}</small>
            </a>
          </template>
          <div v-else class="empty-state" style="border: 0; padding: 32px">未找到匹配的组件</div>
        </div>
        <div class="dialog-foot">↑ ↓ 浏览　·　Enter 跳转　·　ESC 关闭</div>
      </div>
    </div>
  </Teleport>
</template>
