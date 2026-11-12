<script setup lang="ts">
import { inject } from 'vue'
import { cn } from '../../../utils';
import { ORIENTATION_INJECTION_KEY } from "./injectionKeys";
defineOptions({ name: 'IuDockSeparator' })

const orientation = inject(ORIENTATION_INJECTION_KEY, "vertical");
</script>

<template>
  <div
    :class="
      cn(`bg-secondary relative block`, orientation === 'vertical' ? 'h-0.5 w-4/5' : 'h-4/5 w-0.5')
    "
  />
</template>
