<script lang="ts">


export type VariantType = "type1" | "type2" | "type3" | "type4" | "type5" | "type6" | "type7";

export interface Props {
  images?: string[];
  variant?: VariantType;
}
</script>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import { variantMap } from "./trail-variants";
defineOptions({ name: 'IuImageTrailCursor' })



const { images = [], variant = "type1" } = defineProps<Props>();

const containerRef = useTemplateRef("containerRef");

let currentInstance: InstanceType<(typeof variantMap)[string]> | undefined;

function initializeVariant() {
  currentInstance?.destroy();
  currentInstance = undefined;
  if (!containerRef.value || !images.length) return;
  const Variant = variantMap[variant] ?? variantMap.type1;
  currentInstance = new Variant(containerRef.value);
}

onMounted(initializeVariant);
watch([() => variant, () => images.slice()], initializeVariant, { flush: "post" });

onBeforeUnmount(() => currentInstance?.destroy());
</script>

<template>
  <div
    ref="containerRef"
    class="relative z-100 h-full w-full overflow-visible rounded-lg bg-transparent"
  >
    <div
      v-for="(image, i) in images"
      :key="variant + i"
      class="content__img absolute top-0 left-0 aspect-[1.1] w-[190px] overflow-hidden rounded-[15px] opacity-0 will-change-[transform,filter]"
    >
      <div
        class="content__img-inner absolute top-[-10px] left-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] bg-cover bg-center"
        :style="`background-image: url(${image})`"
      />
    </div>
  </div>
</template>
