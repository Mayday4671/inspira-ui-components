<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface Props {
  index: number;
  topPosition?: string;
  class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useTransform, Motion } from 'motion-v'
import { cn } from '../../../utils';
import { CardStackKey } from "./CardStackContext";


defineOptions({ inheritAttrs: false });

const props = defineProps<Props>();
const context = inject(CardStackKey, null);

if (!context) {
  throw new Error("CardStackItem must be used within <CardStack>");
}

const totalCards = Math.max(context.totalCards, 1);
const scaleTo = 1 - (totalCards - props.index) * (context.scaleMultiplier ?? 0.03);
const scale = useTransform(context.progress, [props.index / totalCards, 1], [1, scaleTo]);
const top = computed(() => props.topPosition ?? `${5 + props.index * 3}%`);
</script>

<template>
  <div
    v-bind="$attrs"
    :class="cn('sticky top-0 h-full', props.class)"
  >
    <Motion
      :style="{ top, scale }"
      class="relative h-full origin-top"
    >
      <slot />
    </Motion>
  </div>
</template>
