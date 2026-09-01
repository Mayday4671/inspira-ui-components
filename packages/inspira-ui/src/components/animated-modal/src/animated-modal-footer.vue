<script lang="ts" setup>
import { cn } from '../../../utils'
import type { AnimatedModalFooterProps } from './modal-types'

defineOptions({ name: 'IuAnimatedModalFooter' })

const props = withDefaults(defineProps<AnimatedModalFooterProps>(), {
  class: '',
})
</script>

<template>
  <div :class="cn(`flex justify-end bg-gray-100 p-4 dark:bg-neutral-900`, props.class)">
    <slot />
  </div>
</template>
