<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed, ref } from 'vue'
import { IuNumberTicker } from '../../number-ticker'
import type { RestartableMotionExposes } from '../../motion-shared'
import type { StatisticProps } from './statistic'

defineOptions({ name: 'IuStatistic' })

const props = withDefaults(defineProps<StatisticProps>(), {
  label: '',
  prefix: '',
  suffix: '',
  decimals: 0,
  duration: 1200,
  trend: undefined,
  trendLabel: '',
  reducedMotion: 'system',
})

const trendUp = computed(() => (props.trend ?? 0) >= 0)
const tickerRef = ref<RestartableMotionExposes>()

function restart() {
  tickerRef.value?.restart()
}

defineExpose<RestartableMotionExposes>({ restart })
</script>

<template>
  <div :class="cn(`flex flex-col gap-1`, props.class)">
    <p class="m-0 text-sm font-medium text-neutral-500 dark:text-neutral-400">
      {{ label }}
      <slot name="label-extra" />
    </p>

    <div class="flex items-baseline gap-2">
      <p class="m-0 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        <IuNumberTicker
          ref="tickerRef"
          :value="value"
          :decimal-places="decimals"
          :duration="duration"
          :prefix="prefix"
          :suffix="suffix"
          :reduced-motion="reducedMotion"
        />
      </p>

      <span
        v-if="trend !== undefined"
        :class="
          cn(
            'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
            trendUp
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-500/10 text-red-600 dark:text-red-400',
          )
        "
      >
        {{ trendUp ? '▲' : '▼' }} {{ Math.abs(trend ?? 0) }}%
      </span>
    </div>

    <p v-if="trendLabel" class="m-0 text-xs text-neutral-400 dark:text-neutral-500">
      {{ trendLabel }}
    </p>

    <slot />
  </div>
</template>
