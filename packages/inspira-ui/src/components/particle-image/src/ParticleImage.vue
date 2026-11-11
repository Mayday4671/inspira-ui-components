<script lang="ts">
import type { InspiraImageParticle as ImageParticle } from "./inspiraImageParticles";

export interface ParticleImageProps {
  imageSrc: string;
  class?: string;
  canvasWidth?: string;
  canvasHeight?: string;
  gravity?: string;
  particleSize?: string;
  particleGap?: string;
  mouseForce?: string;
  renderer?: "default" | "webgl";
  color?: string;
  colorArr?: number[];
  initPosition?: "random" | "top" | "left" | "bottom" | "right" | "misplaced" | "none";
  initDirection?: "random" | "top" | "left" | "bottom" | "right" | "none";
  fadePosition?: "explode" | "top" | "left" | "bottom" | "right" | "random" | "none";
  fadeDirection?: "random" | "top" | "left" | "bottom" | "right" | "none";
  noise?: number;
  responsiveWidth?: boolean;
}
</script>

<script lang="ts" setup>
import { cn } from '../../../utils';
import { onMounted, ref } from "vue";
import { inspiraImageParticles } from "./inspiraImageParticles";


defineProps<ParticleImageProps>();

let _particles: ImageParticle | null = null;
const imageParticleRef = ref<HTMLImageElement>();

onMounted(() => {
  const { InspiraImageParticle } = inspiraImageParticles();
  _particles = new InspiraImageParticle(imageParticleRef.value); void _particles;
});
</script>

<template>
  <img
    ref="imageParticleRef"
    :src="imageSrc"
    :data-particle-gap="particleGap"
    :data-width="canvasWidth"
    :data-height="canvasHeight"
    :data-gravity="gravity"
    :data-particle-size="particleSize"
    :data-mouse-force="mouseForce"
    :data-renderer="renderer"
    :data-color="color"
    :data-color-arr="colorArr"
    :data-init-position="initPosition"
    :data-init-direction="initDirection"
    :data-fade-position="fadePosition"
    :data-fade-direction="fadeDirection"
    :data-noise="noise"
    :data-responsive-width="responsiveWidth"
    :class="cn(`hidden h-32 w-32`, $props.class)"
  />
</template>
