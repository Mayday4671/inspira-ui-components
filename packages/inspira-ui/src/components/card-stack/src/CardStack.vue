<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useScroll } from 'motion-v'
import type { UseScrollOptions } from "motion-v";
import type { HTMLAttributes } from "vue";
import { cn } from '../../../utils';
import { CardStackKey } from "./CardStackContext";

export interface Props {
  totalCards: number;
  scaleMultiplier?: number;
  scrollOptions?: UseScrollOptions;
  class?: HTMLAttributes["class"];
}

defineOptions({ name: 'IuCardStack', inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  scaleMultiplier: 0.03,
});

const targetRef = ref<HTMLElement | null>(null);
const scrollOptions = computed<UseScrollOptions>(() => ({
  offset: ["start start", "end end"],
  ...props.scrollOptions,
  target: targetRef,
}));

const { scrollYProgress } = useScroll(scrollOptions);

provide(CardStackKey, {
  progress: scrollYProgress,
  scaleMultiplier: props.scaleMultiplier,
  totalCards: Math.max(props.totalCards, 1),
});
</script>

<template>
  <div
    ref="targetRef"
    v-bind="$attrs"
    :class="cn(props.class)"
  >
    <slot />
  </div>
</template>
