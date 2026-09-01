<script lang="ts" setup>
import { cn } from '../../../utils'
import type { BentoGridProps } from './bento-grid-types'

defineOptions({ name: 'IuBentoGrid' })

const props = defineProps<BentoGridProps>()
</script>

<template>
  <div
    :class="
      cn(
        `mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3`,
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
