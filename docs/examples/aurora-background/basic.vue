<script setup lang="ts">
import { IuAuroraBackground } from 'inspira-ui-components'
</script>

<template>
  <!-- 前景内容自动位于极光之上；局部使用传 height / rounded 即可 -->
  <IuAuroraBackground height="320px" rounded="14px">
    <h4 class="demo-title">Aurora Background</h4>
    <p class="demo-desc">流动的极光渐变（亮 / 暗色下表现不同）</p>
  </IuAuroraBackground>
</template>

<style scoped>
.demo-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.demo-desc {
  margin: 8px 0 0;
  font-size: 13px;
  opacity: 0.7;
}
</style>
