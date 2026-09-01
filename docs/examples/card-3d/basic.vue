<script setup lang="ts">
import { IuCard3DContainer, IuCard3DBody, IuCard3DItem } from 'inspira-ui-components'
</script>

<template>
  <IuCard3DContainer>
    <IuCard3DBody>
      <IuCard3DItem :translate-z="200" style="font-size: 24px; font-weight: 700">
        3D Card
      </IuCard3DItem>
      <IuCard3DItem as="p" :translate-z="100" style="margin: 8px 0 0; max-width: 24rem; font-size: 14px; opacity: 0.7">
        悬停时整卡跟随鼠标旋转，内部元素沿 Z 轴分层抬升，形成景深效果。
      </IuCard3DItem>
      <IuCard3DItem :translate-z="150" style="margin-top: 16px">
        <div style="width: 256px; height: 140px; border-radius: 10px; overflow: hidden">
          <div class="card-art" />
        </div>
      </IuCard3DItem>
      <IuCard3DItem
        :translate-z="60"
        style="margin-top: 16px; display: inline-flex; padding: 8px 16px; border-radius: 999px; background: #18181b; color: #fafafa; font-size: 12px"
      >
        Try Me
      </IuCard3DItem>
    </IuCard3DBody>
  </IuCard3DContainer>
</template>

<style scoped>
.card-art {
  width: 100%;
  height: 100%;
  background:
    radial-gradient(80% 60% at 20% 10%, #60a5fa 0%, transparent 60%),
    radial-gradient(70% 70% at 85% 30%, #c084fc 0%, transparent 55%),
    radial-gradient(90% 90% at 50% 100%, #34d399 0%, transparent 60%),
    #0f172a;
}
</style>
