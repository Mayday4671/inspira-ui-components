<script setup lang="ts">
import { IuCard3DContainer, IuCard3DBody, IuCard3DItem } from 'inspira-ui-components'
</script>

<template>
  <IuCard3DContainer>
    <IuCard3DBody>
      <IuCard3DItem :translate-z="200" class="demo-title"> 3D Card </IuCard3DItem>
      <IuCard3DItem as="p" :translate-z="100" class="demo-desc">
        悬停时整卡跟随鼠标旋转，元素沿 Z 轴分层抬升，形成景深效果。
      </IuCard3DItem>
      <IuCard3DItem :translate-z="150" class="demo-art-wrap">
        <div class="demo-art" />
      </IuCard3DItem>
    </IuCard3DBody>
  </IuCard3DContainer>
</template>

<style scoped>
.demo-title {
  font-size: 24px;
  font-weight: 700;
}

.demo-desc {
  margin: 8px 0 0;
  max-width: 24rem;
  font-size: 14px;
  opacity: 0.7;
}

.demo-art-wrap {
  margin-top: 16px;
}

.demo-art {
  width: 256px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  background:
    radial-gradient(80% 60% at 20% 10%, #60a5fa 0%, transparent 60%),
    radial-gradient(70% 70% at 85% 30%, #c084fc 0%, transparent 55%),
    radial-gradient(90% 90% at 50% 100%, #34d399 0%, transparent 60%),
    #0f172a;
}
</style>
