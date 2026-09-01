<script setup lang="ts">
import { IuFlipCard } from 'inspira-ui-components'
</script>

<template>
  <IuFlipCard>
    <div class="flip-art" />
    <template #back>
      <div style="display: flex; height: 100%; flex-direction: column; justify-content: center">
        <p style="margin: 0; font-size: 16px; font-weight: 600">背面内容</p>
        <p style="margin: 8px 0 0; font-size: 12px; opacity: 0.7">鼠标移开自动翻回正面。</p>
      </div>
    </template>
  </IuFlipCard>

  <IuFlipCard rotate="x">
    <div class="flip-art" />
    <template #back>
      <div style="display: flex; height: 100%; flex-direction: column; justify-content: center">
        <p style="margin: 0; font-size: 16px; font-weight: 600">上下翻转（rotate="x"）</p>
      </div>
    </template>
  </IuFlipCard>
</template>

<style scoped>
.flip-art {
  width: 100%;
  height: 100%;
  background:
    radial-gradient(80% 60% at 20% 10%, #60a5fa 0%, transparent 60%),
    radial-gradient(70% 70% at 85% 30%, #c084fc 0%, transparent 55%),
    radial-gradient(90% 90% at 50% 100%, #34d399 0%, transparent 60%),
    #0f172a;
}
</style>
