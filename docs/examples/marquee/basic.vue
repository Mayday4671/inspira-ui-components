<script setup lang="ts">
import { IuMarquee } from 'inspira-ui-components'

const items = ['Vue 3.5', 'TypeScript', 'Vite 7', 'Tailwind CSS', 'motion-v']
</script>

<template>
  <IuMarquee :items="items" pause-on-hover :speed="20" />
</template>
