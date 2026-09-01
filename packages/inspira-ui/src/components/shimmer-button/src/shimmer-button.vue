<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed } from 'vue'
import { iuButtonSizeClass, iuButtonStateClass } from '../../button-shared'
import type { ShimmerButtonProps } from './shimmer-button'

defineOptions({ name: 'IuShimmerButton' })

const props = withDefaults(defineProps<ShimmerButtonProps>(), {
  variant: 'dark',
  shimmerColor: undefined,
  shimmerSize: '0.05em',
  borderRadius: undefined,
  shimmerDuration: '3s',
  background: undefined,
  size: 'default',
})

const isLight = computed(() => props.variant === 'light')

const resolved = computed(() => ({
  shimmerColor: props.shimmerColor ?? (isLight.value ? '#0ea5e9' : '#ffffff'),
  background: props.background ?? (isLight.value ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,1)'),
  radius: props.borderRadius ?? (isLight.value ? '12px' : '100px'),
  textColor: isLight.value
    ? 'text-slate-900 border-slate-900/10'
    : 'text-white border-white/10 dark:text-black',
}))
</script>

<template>
  <button
    :disabled="disabled || loading"
    :style="{
      '--spread': '90deg',
      '--shimmer-color': resolved.shimmerColor,
      '--radius': resolved.radius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': resolved.background,
    }"
    :class="
      cn(
        `group relative z-0 flex transform-gpu cursor-pointer items-center justify-center overflow-hidden border [border-radius:var(--radius)] whitespace-nowrap transition-transform duration-300 ease-in-out [background:var(--bg)] active:translate-y-px`,
        resolved.textColor,
        iuButtonSizeClass(size),
        iuButtonStateClass,
        block && 'flex w-full',
        $props.class,
      )
    "
  >
    <div class="@container-[size] absolute inset-0 -z-30 overflow-visible blur-[2px]">
      <div
        class="animate-shimmer-btn-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]"
      >
        <div
          class="animate-shimmer-btn-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]"
        />
      </div>
    </div>
    <span v-if="loading" class="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot />

    <div
      class="insert-0 absolute size-full transform-gpu rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
    />

    <div
      class="absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
    />
  </button>
</template>

<style scoped>
@keyframes shimmer-btn-shimmer-slide {
  to {
    transform: translate(calc(100cqw - 100%), 0);
  }
}

@keyframes shimmer-btn-spin-around {
  0% {
    transform: translateZ(0) rotate(0);
  }
  15%,
  35% {
    transform: translateZ(0) rotate(90deg);
  }
  65%,
  85% {
    transform: translateZ(0) rotate(270deg);
  }
  100% {
    transform: translateZ(0) rotate(360deg);
  }
}

.animate-shimmer-btn-shimmer-slide {
  animation: shimmer-btn-shimmer-slide var(--speed) ease-in-out infinite alternate;
}

.animate-shimmer-btn-spin-around {
  animation: shimmer-btn-spin-around calc(var(--speed) * 2) infinite linear;
}
</style>
