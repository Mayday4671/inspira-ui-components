<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface BookDescriptionProps {
  class?: HTMLAttributes["class"];
}
</script>

<script lang="ts" setup>
import { cn } from '../../../utils';


defineProps<BookDescriptionProps>();
</script>

<template>
  <p :class="cn(`text-xs/relaxed select-none`, $props.class)">
    <slot />
  </p>
</template>
