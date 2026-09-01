<script lang="ts" setup>
import { cn } from '../../../utils'
import type { AnimatedModalContentProps } from './modal-types'

defineOptions({ name: 'IuAnimatedModalContent' })

const props = withDefaults(defineProps<AnimatedModalContentProps>(), {
  class: '',
})
</script>

<template>
  <div :class="cn(`flex flex-1 flex-col p-8 md:p-10`, props.class)">
    <slot />
  </div>
</template>
