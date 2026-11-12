<script lang="ts">
import type { MaybeComputedElementRef } from "@vueuse/core";
import type {HTMLAttributes, MaybeRef, VNode } from "vue";

export type ScrollSwapTextOffset = [string, string];

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface Props {
  as?: string;
  containerRef: MaybeComputedElementRef;
  offset?: ScrollSwapTextOffset;
  class?: HTMLAttributes["class"];
  springConfig?: SpringConfig;
  text?: string;
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../../utils';
import { Motion, useScroll, useSpring, useTransform } from "motion-v";
import { ref, useSlots } from "vue";




defineOptions({ name: 'IuScrollSwapText', inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  as: "span",
  offset: () => ["0 0", "0 1"] as ScrollSwapTextOffset,
  springConfig: () => ({ stiffness: 200, damping: 30 }),
});

const slots = useSlots() as unknown as { default?: () => VNode[] };
const targetRef = ref<HTMLElement | null>(null);

function extractText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(extractText).join("");

  if (typeof value === "object" && "children" in value) {
    return extractText(value.children);
  }

  return "";
}

const text = computed(() => props.text ?? extractText(slots.default?.()));
const { scrollYProgress } = useScroll({
  container: props.containerRef,
  target: targetRef,
  offset: props.offset as never,
});
const springScrollYProgress = useSpring(
  scrollYProgress,
  props.springConfig as MaybeRef<SpringConfig>,
);
const top = useTransform(springScrollYProgress, [0, 1], ["0%", "-100%"]);
const bottom = useTransform(springScrollYProgress, [0, 1], ["100%", "0%"]);
</script>

<template>
  <component
    :is="props.as"
    ref="targetRef"
    v-bind="$attrs"
    :class="cn('relative flex items-center justify-center overflow-hidden p-0', props.class)"
  >
    <span
      class="relative text-transparent"
      aria-hidden="true"
    >
      {{ text }}
    </span>

    <Motion
      class="absolute"
      :style="{ top }"
    >
      {{ text }}
    </Motion>

    <Motion
      class="absolute"
      :style="{ top: bottom }"
      aria-hidden="true"
    >
      {{ text }}
    </Motion>
  </component>
</template>
