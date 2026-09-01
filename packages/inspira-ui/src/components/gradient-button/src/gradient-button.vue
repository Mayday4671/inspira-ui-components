<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed } from 'vue'
import { iuButtonSizeClass, iuButtonStateClass } from '../../button-shared'
import { GRADIENT_PRESETS, type GradientButtonProps } from './gradient-button'

defineOptions({ name: 'IuGradientButton' })

const props = withDefaults(defineProps<GradientButtonProps>(), {
  variant: 'rainbow',
  duration: 2500,
  borderWidth: 2,
  borderRadius: 8,
  blur: 4,
  size: 'default',
})

const preset = GRADIENT_PRESETS[props.variant]

const allColors = (props.colors ?? preset.colors).join(', ')
const bgColor = props.bgColor ?? preset.bgColor
const durationInMilliseconds = `${props.duration}ms`
const borderWidthInPx = `${props.borderWidth}px`
const borderRadiusInPx = `${props.borderRadius}px`
const blurPx = `${props.blur}px`

/** 按背景色亮度自动选择黑/白文字，用户无需再写文字颜色 */
const contentColor = computed(() => textColorFor(bgColor))
</script>

<script lang="ts">
function textColorFor(bg: string): string {
  const hex = bg.trim().replace('#', '')
  if (!/^[0-9a-f]{3,8}$/i.test(hex)) return '#ffffff'
  const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex.slice(0, 6)
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#0f172a' : '#ffffff'
}
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="
      cn(
        `animate-rainbow rainbow-btn relative flex cursor-pointer items-center justify-center overflow-hidden before:absolute before:-inset-[200%]`,
        iuButtonSizeClass(size),
        iuButtonStateClass,
        block && 'flex w-full',
        props.class,
      )
    "
  >
    <span class="btn-content inline-flex size-full items-center justify-center px-4 py-2">
      <span v-if="loading" class="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
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
  color: v-bind(contentColor);
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
