<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed } from 'vue'
import type { MarqueeProps } from './marquee'

defineOptions({ name: 'IuMarquee' })

const props = withDefaults(defineProps<MarqueeProps>(), {
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
  speed: 40,
  gap: '1rem',
})

const rootStyle = computed(() => ({
  '--duration': `${props.speed}s`,
  '--gap': props.gap,
}))
</script>

<template>
  <div
    :style="rootStyle"
    :class="
      cn(
        `group flex gap-(--gap) overflow-hidden p-2`,
        vertical ? 'flex-col' : 'flex-row',
        props.class,
      )
    "
  >
    <div
      v-for="index in repeat"
      :key="index"
      :style="{
        animationDirection: reverse ? 'reverse' : 'normal',
      }"
      :class="
        cn(
          `flex shrink-0 justify-around gap-(--gap)`,
          vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '',
        )
      "
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee var(--duration) linear infinite;
  animation-direction: reverse;
}

.animate-marquee-vertical {
  animation: marquee-vertical var(--duration) linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
}
</style>
