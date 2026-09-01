<script lang="ts" setup>
import { cn } from '../../../utils'
import { iuButtonSizeClass, iuButtonStateClass } from '../../button-shared'
import type { RainbowButtonProps } from './rainbow-button'

defineOptions({ name: 'IuRainbowButton' })

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  speed: 2,
  is: 'button',
  size: 'default',
})

const speedInSeconds = `${props.speed}s`
</script>

<template>
  <component
    :is="is"
    :disabled="is === 'button' ? disabled || loading : undefined"
    :class="
      cn(
        `rainbow-button group text-primary-foreground focus-visible:ring-ring relative inline-flex cursor-pointer items-center justify-center rounded-xl border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] bg-size-[200%] [background-clip:padding-box,border-box,border-box] bg-origin-border font-medium transition-colors [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-size-[200%] before:filter-[blur(calc(0.8*1rem))] focus-visible:ring-1 focus-visible:outline-none dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]`,
        iuButtonSizeClass(size),
        iuButtonStateClass,
        block && 'flex w-full',
        props.class,
      )
    "
  >
    <span v-if="loading" class="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />
  </component>
</template>

<style scoped>
.rainbow-button {
  --color-1: hsl(0 100% 63%);
  --color-2: hsl(270 100% 63%);
  --color-3: hsl(210 100% 63%);
  --color-4: hsl(195 100% 63%);
  --color-5: hsl(90 100% 63%);
  --speed: v-bind(speedInSeconds);
  animation: rainbow var(--speed) infinite linear;
}

.rainbow-button:before {
  animation: rainbow var(--speed) infinite linear;
}

@keyframes rainbow {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}
</style>
