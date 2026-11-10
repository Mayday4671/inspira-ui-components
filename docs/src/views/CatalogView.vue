<script setup lang="ts">
import { computed, ref } from 'vue'
import UiIcon from '../components/UiIcon.vue'
import CatalogPreview from '../components/CatalogPreview.vue'
import DocsShell from '../components/DocsShell.vue'
import { CATEGORIES, COMPONENTS, componentCount } from '../data/registry'

const filter = ref<string>('全部')
const query = ref('')


const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return COMPONENTS.filter(
    (x) =>
      (filter.value === '全部' || x.category === filter.value) &&
      `${x.name} ${x.zh} ${x.desc}`.toLowerCase().includes(q),
  )
})

function clearFilters() {
  filter.value = '全部'
  query.value = ''
}
</script>

<template>
  <DocsShell active="components">

    <div class="catalog-head">
      <div class="catalog-search">
        <UiIcon name="search" small />
        <input
          v-model="query"
          type="search"
          autocomplete="off"
          aria-label="筛选组件"
          placeholder="搜索组件名称或关键词…"
        />
      </div>
      <div class="catalog-count">
        已展示 <b>{{ filtered.length }}</b> 个示例 · 当前站点标注 {{ componentCount }} 个组件
      </div>
    </div>

    <div class="catalog-filter">
      <button
        v-for="cat in CATEGORIES"
        :key="cat"
        class="filter-btn"
        :class="{ active: filter === cat }"
        type="button"
        @click="filter = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div style="height: 22px"></div>

    <div class="catalog-grid">
      <template v-if="filtered.length">
        <router-link
          v-for="c in filtered"
          :key="c.slug"
          class="catalog-card"
          :to="`/component/${c.slug}`"
        >
          <div class="catalog-visual">
            <CatalogPreview :kind="c.preview" />
          </div>
          <div class="catalog-info">
            <h3>{{ c.name }}</h3>
            <p>{{ c.zh }} · {{ c.desc }}</p>
          </div>
        </router-link>
      </template>
      <div v-else class="empty-state" style="grid-column: 1 / -1">
        <b>没有找到相关组件</b>
        <p>换个关键词或选择「全部」试试。</p>
        <button class="btn sm" type="button" @click="clearFilters">清空筛选</button>
      </div>
    </div>

  </DocsShell>
</template>
