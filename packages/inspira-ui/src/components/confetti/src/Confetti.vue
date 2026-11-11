<script lang="ts">
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";

export interface Api {
  fire: (options?: ConfettiOptions) => void;
}

export interface ConfettiProps {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
  class?: string;
}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue'
import { create } from "canvas-confetti";


const props = defineProps<ConfettiProps>();

const instanceRef = ref<ConfettiInstance | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Confetti API
function fire(opts: ConfettiOptions = {}) {
  instanceRef.value?.({ ...props.options, ...opts });
}

const api: Api = { fire };

provide("ConfettiContext", api);

// Initialize confetti when mounted
onMounted(() => {
  if (canvasRef.value) {
    instanceRef.value = create(canvasRef.value, {
      ...props.globalOptions,
      resize: true,
    });

    if (!props.manualstart) {
      fire();
    }
  }
});

// Cleanup when unmounted
onUnmounted(() => {
  if (instanceRef.value) {
    instanceRef.value.reset();
    instanceRef.value = null;
  }
});

defineExpose({
  fire,
});
</script>

<template>
  <div>
    <canvas
      ref="canvasRef"
      :class="$props.class"
    />
    <slot />
  </div>
</template>
