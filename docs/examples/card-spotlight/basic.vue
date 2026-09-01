<script setup lang="ts">
import { IuCardSpotlight } from 'inspira-ui-components'
</script>

<template>
  <IuCardSpotlight class="demo-card" :gradient-size="240">
    <h4 class="demo-title">Spotlight 卡片</h4>
    <p class="demo-desc">鼠标在卡片上移动，会有一道聚光灯跟随光斑。</p>
  </IuCardSpotlight>
</template>

<style scoped>
.demo-card {
  width: 100%;
  max-width: 420px;
  min-height: 220px;
  padding: 24px;
}

.demo-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.demo-desc {
  margin: 8px 0 0;
  font-size: 14px;
  opacity: 0.65;
}
</style>
