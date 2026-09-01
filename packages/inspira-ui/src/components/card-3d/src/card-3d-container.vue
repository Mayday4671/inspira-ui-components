<script lang="ts" setup>
import { cn } from '../../../utils'
import { provide, useTemplateRef } from 'vue'
import { CARD_3D_KEY, useCard3DMouseState } from './context'
import type { Card3DContainerProps } from './card-3d-types'

defineOptions({ name: 'IuCard3DContainer' })

const props = defineProps<Card3DContainerProps>()

const containerRef = useTemplateRef<HTMLDivElement>('containerRef')

const mouseState = useCard3DMouseState()
provide(CARD_3D_KEY, mouseState)

function handleMouseMove(e: MouseEvent) {
  if (!containerRef.value) return
  const { left, top, width, height } = containerRef.value.getBoundingClientRect()
  const x = (e.clientX - left - width / 2) / 25
  const y = (e.clientY - top - height / 2) / 25
  containerRef.value.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
}

function handleMouseEnter() {
  mouseState.setMouseEntered(true)
}

function handleMouseLeave() {
  if (!containerRef.value) return

  mouseState.setMouseEntered(false)
  containerRef.value.style.transform = `rotateY(0deg) rotateX(0deg)`
}
</script>

<template>
  <div
    style="perspective: 1000px"
    :class="cn(`flex items-center justify-center p-2`, props.containerClass)"
  >
    <div
      ref="containerRef"
      style="transform-style: preserve-3d"
      :class="
        cn(
          `relative flex items-center justify-center transition-all duration-200 ease-linear`,
          props.class,
        )
      "
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <slot />
    </div>
  </div>
</template>
