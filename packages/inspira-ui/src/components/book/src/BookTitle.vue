<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface BookTitleProps {
  class?: HTMLAttributes["class"];
}
</script>

<script lang="ts" setup>
import { cn } from '../../../utils';
defineOptions({ name: 'IuBookTitle' })


defineProps<BookTitleProps>();
</script>

<template>
  <h1 :class="cn(`mt-3 mb-1 font-bold text-balance select-none`, $props.class)">
    <slot />
  </h1>
</template>
