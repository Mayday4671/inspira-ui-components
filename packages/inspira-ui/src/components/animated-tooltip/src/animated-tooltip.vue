<script lang="ts" setup>
import { Motion } from 'motion-v'
import { computed, ref } from 'vue'
import type { AnimatedTooltipProps } from './animated-tooltip'

defineOptions({ name: 'IuAnimatedTooltip' })

defineProps<AnimatedTooltipProps>()

const hoveredIndex = ref<number | null>(null)
const mouseX = ref<number>(0)

// 根据鼠标位置计算旋转与平移
const rotation = computed<number>(() => {
  const x = mouseX.value
  return (x / 100) * 50
})

const translation = computed<number>(() => {
  const x = mouseX.value
  return (x / 100) * 50
})

function handleMouseEnter(event: MouseEvent, itemId: number) {
  hoveredIndex.value = itemId
  const rect = (event.currentTarget as HTMLElement)?.getBoundingClientRect()
  const halfWidth = rect.width / 2
  mouseX.value = event.clientX - rect.left - halfWidth
}

function handleMouseMove(event: MouseEvent) {
  const rect = (event.currentTarget as HTMLElement)?.getBoundingClientRect()
  const halfWidth = rect.width / 2
  mouseX.value = event.clientX - rect.left - halfWidth
}
</script>

<template>
  <div
    v-for="item in items"
    :key="item.id"
    class="group relative -mr-4"
    @mouseenter="(e) => handleMouseEnter(e, item.id)"
    @mouseleave="hoveredIndex = null"
    @mousemove="handleMouseMove"
  >
    <!-- Tooltip -->
    <Motion
      v-if="hoveredIndex === item.id"
      :initial="{
        opacity: 0,
        y: 20,
        scale: 0.6,
      }"
      :animate="{
        opacity: 1,
        y: 0,
        scale: 1,
      }"
      :transition="{
        type: 'spring',
        stiffness: 260,
        damping: 10,
      }"
      :exit="{
        opacity: 0,
        y: 20,
        scale: 0.6,
      }"
      :style="{
        translateX: `${translation}px`,
        rotate: `${rotation}deg`,
      }"
      class="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs whitespace-nowrap shadow-xl"
    >
      <div
        class="absolute right-1/2 -bottom-px z-30 me-1 h-px w-2/5 translate-x-1/2 bg-linear-to-r from-transparent via-emerald-500 to-transparent"
      />
      <div
        class="absolute -bottom-px left-1/2 z-30 ms-1 h-px w-2/5 -translate-x-1/2 bg-linear-to-r from-transparent via-sky-500 to-transparent"
      />
      <div class="relative z-30 text-base font-bold text-white">
        {{ item.name }}
      </div>
      <div class="text-xs text-white">{{ item.designation }}</div>
    </Motion>

    <!-- 头像 -->
    <img
      :src="item.image"
      :alt="item.name"
      class="relative m-0! size-14 rounded-full border-2 border-white object-cover object-top p-0! transition duration-500 group-hover:z-30 group-hover:scale-105"
    />
  </div>
</template>
