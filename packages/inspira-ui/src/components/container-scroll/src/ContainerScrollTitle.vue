<script setup lang="ts">
defineOptions({ name: 'IuContainerScrollTitle' })
defineProps({
  translate: Number,
});
</script>

<template>
  <div
    :style="{ transform: `translateY(${translate}px)` }"
    class="mx-auto max-w-5xl text-center"
  >
    <slot />
  </div>
</template>
