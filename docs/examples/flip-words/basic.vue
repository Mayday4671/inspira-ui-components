<script setup lang="ts">
import { IuFlipWords } from 'inspira-ui-components'
</script>

<template>
  <p class="demo-text">
    一次引入，
    <IuFlipWords :words="['全局注册', '按需引入', 'npm 包调用']" class="demo-accent" />
    任意组件
  </p>
</template>

<style scoped>
.demo-text {
  font-size: 20px;
  margin: 0;
}

.demo-accent {
  font-weight: 700;
  color: #3b82f6;
}
</style>
