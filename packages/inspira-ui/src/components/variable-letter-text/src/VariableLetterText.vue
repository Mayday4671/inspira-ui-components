<script lang="ts">
import type { Transition } from "motion-v";
import type { HTMLAttributes } from "vue";

export type StaggerOrigin = "first" | "last" | "center" | number;

export interface Props {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  transition?: Transition;
  staggerDuration?: number;
  staggerFrom?: StaggerOrigin;
  class?: HTMLAttributes["class"];
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { cn } from '../../../utils';
import { stagger, useAnimate } from "motion-v";



defineOptions({ name: 'IuVariableLetterText', inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  fromFontVariationSettings: "'wght' 400",
  toFontVariationSettings: "'wght' 900",
  transition: () => ({ type: "spring", duration: 0.7 }),
  staggerDuration: 0.03,
  staggerFrom: "first" as StaggerOrigin,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const [, animate] = useAnimate();
const isHovered = ref(false);
const letters = computed(() => [...props.label]);

function transitionWithStagger(): Transition {
  return {
    ...props.transition,
    delay: stagger(props.staggerDuration, { from: props.staggerFrom as never }) as never,
  };
}

function animateLetters(fontVariationSettings: string) {
  return animate(".variable-letter", { fontVariationSettings }, transitionWithStagger());
}

function handleMouseEnter() {
  if (isHovered.value) return;

  isHovered.value = true;
  animateLetters(props.toFontVariationSettings);
}

function handleMouseLeave() {
  if (!isHovered.value) return;

  isHovered.value = false;
  animateLetters(props.fromFontVariationSettings);
}
</script>

<template>
  <span
    ref="scope"
    v-bind="$attrs"
    :class="cn(props.class)"
    :data-text="props.label"
    @click="emit('click', $event)"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="sr-only">{{ props.label }}</span>

    <span
      v-for="(letter, index) in letters"
      :key="`${index}-${letter}`"
      class="variable-letter inline-block whitespace-pre"
      :style="{ fontVariationSettings: props.fromFontVariationSettings }"
      aria-hidden="true"
      v-text="letter"
    />
  </span>
</template>
