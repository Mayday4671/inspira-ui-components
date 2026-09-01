<script lang="ts" setup>
import { cn } from '../../../utils'
import type { Card3DBodyProps } from './card-3d-types'

defineOptions({ name: 'IuCard3DBody' })

const props = defineProps<Card3DBodyProps>()
</script>

<template>
  <div style="transform-style: preserve-3d" :class="cn(`h-96 w-96`, props.class)">
    <slot />
  </div>
</template>
