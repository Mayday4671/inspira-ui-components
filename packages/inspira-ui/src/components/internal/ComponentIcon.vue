<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  fallback?: string
}>(), { size: '1em' })

const paths: Record<string, string> = {
  'lucide:arrow-left': 'M19 12H5m7-7-7 7 7 7',
  'lucide:arrow-right': 'M5 12h14m-7-7 7 7-7 7',
  'tabler:arrow-narrow-left': 'M20 12H4m5-5-5 5 5 5',
  'tabler:arrow-narrow-right': 'M4 12h16m-5-5 5 5-5 5',
  'tabler:x': 'm6 6 12 12M6 18 18 6',
  'lucide:x': 'm6 6 12 12M6 18 18 6',
  'lucide:check': 'm5 12 5 5 9-10',
  'lucide:chevron-down': 'm6 9 6 6 6-6',
  'lucide:search': 'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-2 5 6 6',
  'lucide:calendar': 'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3-2v4m8-4v4M3 10h18',
  'lucide:folder': 'M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
  'lucide:folder-open': 'M3 18V7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v2M3 18l2-6a2 2 0 0 1 2-1h15l-2 7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
  'lucide:file': 'M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 0v5h5',
  'heroicons:arrow-up-tray-20-solid': 'M4 15v5h16v-5M12 16V4m-4 4 4-4 4 4',
  'heroicons:ellipsis-vertical': 'M12 5v.1m0 6.9v.1m0 6.9v.1',
}

const instance = getCurrentInstance()
const localPath = computed(() => Object.prototype.hasOwnProperty.call(paths, props.name) ? paths[props.name] : undefined)
const customIcon = computed(() => localPath.value ? undefined : instance?.appContext.app.component('Icon'))
const iconPath = computed(() => localPath.value ?? (props.fallback ? paths[props.fallback] : undefined))
</script>

<template>
  <component
    :is="customIcon"
    v-if="customIcon"
    :name="name"
    :size="size"
    aria-hidden="true"
  />
  <svg
    v-else
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="name.startsWith('heroicons:') ? 3 : 2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="iconPath" />
  </svg>
</template>
