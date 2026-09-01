<script lang="ts" setup>
import { cn } from '../../../utils'
import type { GradientButtonProps } from './gradient-button'

defineOptions({ name: 'IuGradientButton' })

const props = withDefaults(defineProps<GradientButtonProps>(), {
  colors: () => [
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#008000',
    '#0000FF',
    '#4B0082',
    '#EE82EE',
    '#FF0000',
  ],
  duration: 2500,
  borderWidth: 2,
  borderRadius: 8,
  blur: 4,
  bgColor: '#000',
})

const durationInMilliseconds = `${props.duration}ms`
const allColors = props.colors.join(', ')
const borderWidthInPx = `${props.borderWidth}px`
const borderRadiusInPx = `${props.borderRadius}px`
const blurPx = `${props.blur}px`
</script>

<template>
  <button
    :class="
      cn(
        `animate-rainbow rainbow-btn relative flex min-h-10 min-w-28 cursor-pointer items-center justify-center overflow-hidden before:absolute before:-inset-[200%]`,
        props.class,
      )
    "
  >
    <span class="btn-content inline-flex size-full items-center justify-center px-4 py-2">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.animate-rainbow::before {
  content: '';
  background: conic-gradient(v-bind(allColors));
  animation: rotate-rainbow v-bind(durationInMilliseconds) linear infinite;
  filter: blur(v-bind(blurPx));
  padding: v-bind(borderWidthInPx);
}

.rainbow-btn {
  padding: v-bind(borderWidthInPx);
  border-radius: v-bind(borderRadiusInPx);
}

.btn-content {
  border-radius: v-bind(borderRadiusInPx);
  background-color: v-bind(bgColor);
  z-index: 0;
}

@keyframes rotate-rainbow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
