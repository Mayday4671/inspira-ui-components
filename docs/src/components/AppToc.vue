<script setup lang="ts">
import { ref } from 'vue'
// UiIcon 在 TOC 链接中未使用

const props = defineProps<{ links: Array<[string, string]> }>()

const active = ref(props.links[0]?.[0] ?? '')

function jump(e: Event, id: string) {
  e.preventDefault()
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  active.value = id
}

function onKeydown(e: KeyboardEvent, id: string) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    jump(e, id)
  }
}
</script>

<template>
  <aside class="toc" aria-label="本页目录">
    <div class="toc-title">本页目录</div>
    <a
      v-for="[id, label] in links"
      :key="id"
      :href="`#${id}`"
      :class="{ active: active === id }"
      @click="jump($event, id)"
      @keydown="onKeydown($event, id)"
    >
      {{ label }}
    </a>
  </aside>
</template>
