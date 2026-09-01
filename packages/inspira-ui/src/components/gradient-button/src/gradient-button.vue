<script lang="ts" setup>
import { cn } from '../../../utils'
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
