<script lang="ts" setup>
import { cn } from '../../../utils'
import { ref, watchEffect } from 'vue'
import { iuButtonSizeClass, iuButtonStateClass } from '../../button-shared'
import type { RippleButtonProps } from './ripple-button'

defineOptions({ name: 'IuRippleButton' })

const props = withDefaults(defineProps<RippleButtonProps>(), {
  rippleColor: undefined,
  duration: 600,
  size: 'default',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const rippleButtonRef = ref<HTMLButtonElement | null>(null)
const buttonRipples = ref<Array<{ x: number; y: number; size: number; key: number }>>([])

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return
  createRipple(event)
  emit('click', event)
}

function createRipple(event: MouseEvent) {
  const button = rippleButtonRef.value
  if (!button) return

  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  const newRipple = { x, y, size, key: Date.now() }
  buttonRipples.value.push(newRipple)
}

watchEffect(() => {
  if (buttonRipples.value.length > 0) {
    const lastRipple = buttonRipples.value[buttonRipples.value.length - 1]!
    setTimeout(() => {
      buttonRipples.value = buttonRipples.value.filter((ripple) => ripple.key !== lastRipple.key)
    }, props.duration)
  }
})
</script>

<template>
  <button
    ref="rippleButtonRef"
    :disabled="disabled || loading"
    :style="{ '--duration': `${props.duration}ms` }"
    :class="
      cn(
        `bg-background text-primary border-border relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 text-center`,
        iuButtonSizeClass(size),
        iuButtonStateClass,
        block && 'flex w-full',
        props.class,
      )
    "
    @click="handleClick"
  >
    <div class="relative z-10 flex items-center">
      <span v-if="loading" class="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <slot />
    </div>

    <span class="pointer-events-none absolute inset-0">
      <span
        v-for="ripple in buttonRipples"
        :key="ripple.key"
        class="ripple-animation absolute rounded-full opacity-30"
        :style="{
          width: `${ripple.size}px`,
          height: `${ripple.size}px`,
          top: `${ripple.y}px`,
          left: `${ripple.x}px`,
          backgroundColor: rippleColor,
          transform: 'scale(0)',
          animationDuration: `${props.duration}ms`,
        }"
      />
    </span>
  </button>
</template>

<style scoped>
@keyframes rippling {
  0% {
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.ripple-animation {
  animation: rippling var(--duration) ease-out;
  background-color: var(--iu-primary, currentColor);
}
</style>
