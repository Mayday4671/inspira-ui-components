<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from '../../../utils';

interface BookHeaderProps {
  class?: HTMLAttributes["class"];
}

defineProps<BookHeaderProps>();
</script>

<template>
  <div :class="cn(`flex flex-wrap gap-2`, $props.class)">
    <slot />
  </div>
</template>
