<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed } from 'vue'
import { shouldReduceMotion } from '../../motion-shared'
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
  patternBackgroundMaskVariants,
  patternBackgroundVariants,
  type PatternBackgroundProps,
} from './pattern-background'

defineOptions({ name: 'IuPatternBackground' })

const props = withDefaults(defineProps<PatternBackgroundProps>(), {
  direction: () => PATTERN_BACKGROUND_DIRECTION.Top,
  variant: () => PATTERN_BACKGROUND_VARIANT.Grid,
  speed: () => PATTERN_BACKGROUND_SPEED.Default,
  size: undefined,
  mask: undefined,
  height: undefined,
  rounded: undefined,
  centered: false,
  paused: false,
  reducedMotion: 'system',
})

const durationFromSpeed = computed(() => `${props.speed}ms`)
const animationPaused = computed(() => props.paused || shouldReduceMotion(props.reducedMotion))
const rootStyle = computed(() => ({
  height: props.height,
  borderRadius: props.rounded,
  animationPlayState: animationPaused.value ? 'paused' : 'running',
}))
</script>

<template>
  <div
    :style="rootStyle"
    :class="[
      patternBackgroundVariants({ variant, size }),
      ` ${animate ? `move move-${direction}` : ''} `,
      centered ? 'flex items-center justify-center overflow-hidden' : '',
      props.class,
    ]"
  >
    <div
      :class="
        cn(
          `pointer-events-none absolute inset-0 flex items-center justify-center`,
          patternBackgroundMaskVariants({ mask }),
        )
      "
    />
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes to-top {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-bottom {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}
@keyframes to-right {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}
@keyframes to-left {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-top-right {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 100% 0;
  }
}
@keyframes to-top-left {
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-bottom-right {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
@keyframes to-bottom-left {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 100%;
  }
}

.move {
  animation-duration: v-bind(durationFromSpeed);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.move-top {
  animation-name: to-top;
}
.move-bottom {
  animation-name: to-bottom;
}
.move-right {
  animation-name: to-right;
}
.move-left {
  animation-name: to-left;
}
.move-top-right {
  animation-name: to-top-right;
}
.move-top-left {
  animation-name: to-top-left;
}
.move-bottom-right {
  animation-name: to-bottom-right;
}
.move-bottom-left {
  animation-name: to-bottom-left;
}
</style>
