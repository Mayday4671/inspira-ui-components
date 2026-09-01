<script setup lang="ts">
import { IuMarquee } from 'inspira-ui-components'

const items = ['Vue 3.5', 'TypeScript', 'Vite 7', 'Tailwind v4 编译', 'motion-v', '零依赖接入']
</script>

<template>
  <IuMarquee pause-on-hover :speed="20" gap="0.5rem" class="demo-marquee">
    <span v-for="item in items" :key="item" class="demo-pill">{{ item }}</span>
  </IuMarquee>
</template>

<style scoped>
.demo-marquee {
  border: 1px solid var(--iu-border, #e4e4e7);
  border-radius: 12px;
}

.demo-pill {
  margin: 0 8px;
  border: 1px solid var(--iu-border, #e4e4e7);
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 14px;
  white-space: nowrap;
}
</style>
