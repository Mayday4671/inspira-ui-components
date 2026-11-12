<script lang="ts">
import { GRADIENT_ANGLES, type ProgressiveBlurProps } from './types'

export interface Props extends ProgressiveBlurProps {
  direction?: ProgressiveBlurDirection
  blurLayers?: number
  class?: string
  blurIntensity?: number
}
</script>



<script lang="ts" setup>
// @ts-nocheck — 上游 Nuxt 源码忠实移植，motion-v 类型过严

import { Motion } from "motion-v";
import { computed, useAttrs } from "vue";
defineOptions({ name: 'IuProgressiveBlur' })

const props = withDefaults(defineProps<Props>(), {
  direction: "bottom",
  blurLayers: 8,
  blurIntensity: 0.25,
});

const attrs = useAttrs();

const layers = computed(() => Math.max(props.blurLayers, 2));
const segmentSize = computed(() => 1 / (props.blurLayers + 1));
const hasPositionClass = computed(
  () =>
    typeof props.class === "string" &&
    /\b(absolute|fixed|relative|sticky|static)\b/.test(props.class),
);

const getGradientStyle = (index: number) => {
  const gradientStops = [
    (index - 1) * segmentSize.value,
    index * segmentSize.value,
    (index + 1) * segmentSize.value,
    (index + 2) * segmentSize.value,
  ];
  const angle = GRADIENT_ANGLES[props.direction ?? "bottom"];

  return {
    backgroundImage: `linear-gradient(${angle}deg, transparent, rgba(0, 0, 0, 0.5), transparent)`,
    maskImage: `linear-gradient(${angle}deg, ${gradientStops
      .map((pos, idx) => (idx % 2 === 0 ? `black ${pos * 100}%` : `transparent ${pos * 100}%`))
      .join(", ")})`,
    webkitMaskImage: `linear-gradient(${angle}deg, ${gradientStops
      .map((pos, idx) => (idx % 2 === 0 ? `black ${pos * 100}%` : `transparent ${pos * 100}%`))
      .join(", ")})`,
    backdropFilter: `blur(${(index - 1) * props.blurIntensity}px)`,
  };
};
</script>

<template>
  <div
    :class="[!hasPositionClass && 'relative', props.class]"
    :style="{
      maskImage: getGradientStyle(layers),
      webkitMaskImage: getGradientStyle(layers),
      backdropFilter: `blur(${layers * props.blurIntensity}px)`,
    }"
    v-bind="attrs"
  >
    <Motion
      v-for="index in layers"
      :key="index"
      as="div"
      class="pointer-events-none absolute inset-0 rounded-[inherit]"
      :style="{
        maskImage: getGradientStyle(index),
        webkitMaskImage: getGradientStyle(index),
        backdropFilter: `blur(${(index - 1) * props.blurIntensity}px)`,
      }"
      v-bind="attrs"
    />
    <div
      class="pointer-events-none absolute inset-0 rounded-[inherit]"
      :style="{
        maskImage: getGradientStyle(layers),
        webkitMaskImage: getGradientStyle(layers),
        backdropFilter: `blur(${layers * props.blurIntensity}px)`,
      }"
    />
    <slot />
  </div>
</template>
