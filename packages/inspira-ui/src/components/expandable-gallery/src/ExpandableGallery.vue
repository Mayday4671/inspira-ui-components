<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface Props {
  images: string[];
  class?: HTMLAttributes["class"];
}
</script>

<script lang="ts" setup>
import { cn } from '../../../utils';
defineOptions({ name: 'IuExpandableGallery' })


const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(`flex h-96 w-full gap-2`, props.class)">
    <div
      v-for="image in images"
      :key="image"
      class="relative flex h-full flex-1 cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:flex-3"
    >
      <img
        class="relative h-full object-cover"
        :src="image"
        :alt="image"
      />
    </div>
  </div>
</template>
