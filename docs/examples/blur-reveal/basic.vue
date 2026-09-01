<script setup lang="ts">
import { IuBlurReveal } from 'inspira-ui-components'
</script>

<template>
  <IuBlurReveal :duration="0.8" :delay="0.3" class="demo-stack">
    <p class="demo-line-strong">第一行：进入视口时模糊淡入</p>
    <p class="demo-line">第二行：按 delay 系数依次错落出现</p>
    <p class="demo-line">第三行：形成 stagger 揭示节奏</p>
  </IuBlurReveal>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-line-strong {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.demo-line {
  margin: 0;
  font-size: 14px;
  opacity: 0.65;
}
</style>
