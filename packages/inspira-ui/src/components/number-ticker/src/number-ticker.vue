<script lang="ts" setup>
import { cn } from '../../../utils'
import { TransitionPresets, useElementVisibility, useTransition } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { nextTick } from 'vue'
import { shouldReduceMotion, type RestartableMotionExposes } from '../../motion-shared'
import type { NumberTickerProps } from './number-ticker'

defineOptions({ name: 'IuNumberTicker' })

const props = withDefaults(defineProps<NumberTickerProps>(), {
  value: 0,
  direction: 'up',
  delay: 0,
  duration: 1000,
  decimalPlaces: 2,
  prefix: '',
  suffix: '',
  transition: 'easeOutCubic',
  reducedMotion: 'system',
})

const reduceMotion = computed(() => shouldReduceMotion(props.reducedMotion))

const spanRef = ref<HTMLSpanElement>()

const transitionValue = ref(props.direction === 'down' ? props.value : 0)

const transitionOutput = useTransition(transitionValue, {
  delay: props.delay,
  duration: props.duration,
  transition: TransitionPresets[props.transition],
})

const output = computed(() => {
  const displayedValue = reduceMotion.value ? props.value : transitionOutput.value
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: props.decimalPlaces,
    maximumFractionDigits: props.decimalPlaces,
  }).format(Number(displayedValue.toFixed(props.decimalPlaces)))
})

const isInView = useElementVisibility(spanRef, {
  threshold: 0,
})

const hasBeenInView = ref(false)

const stopIsInViewWatcher = watch(
  isInView,
  (isVisible) => {
    if (isVisible && !hasBeenInView.value) {
      hasBeenInView.value = true
      transitionValue.value = props.direction === 'down' ? 0 : props.value
      stopIsInViewWatcher()
    }
  },
  { immediate: true },
)

watch(
  () => props.value,
  (newVal) => {
    if (hasBeenInView.value) {
      transitionValue.value = props.direction === 'down' ? 0 : newVal
    }
  },
)

function restart() {
  if (reduceMotion.value) return
  transitionValue.value = props.direction === 'down' ? props.value : 0
  void nextTick(() => {
    transitionValue.value = props.direction === 'down' ? 0 : props.value
  })
}

defineExpose<RestartableMotionExposes>({ restart })
</script>

<template>
  <span
    ref="spanRef"
    :class="
      cn(
        `inline-block tracking-wider text-black tabular-nums dark:text-white`,
        props.class,
      )
    "
  >
    <span v-if="prefix" class="mr-0.5 font-semibold">{{ prefix }}</span>
    {{ output }}
    <span v-if="suffix" class="ml-0.5 font-semibold">{{ suffix }}</span>
  </span>
</template>
