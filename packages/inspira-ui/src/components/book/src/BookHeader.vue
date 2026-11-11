<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface BookHeaderProps {
  class?: HTMLAttributes["class"];
}
</script>

<script lang="ts" setup>
import { cn } from '../../../utils';


defineProps<BookHeaderProps>();
</script>

<template>
  <div :class="cn(`flex flex-wrap gap-2`, $props.class)">
    <slot />
  </div>
</template>
