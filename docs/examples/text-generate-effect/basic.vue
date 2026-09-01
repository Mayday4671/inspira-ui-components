<script setup lang="ts">
import { IuTextGenerateEffect } from 'inspira-ui-components'
</script>

<template>
  <IuTextGenerateEffect
    words="Inspira UI 风格组件库，参考 Element Plus 的架构模式打造，开箱即用。"
    :duration="0.6"
    class="demo-text"
  />
</template>

<style scoped>
.demo-text {
  font-size: 17px;
  font-weight: 500;
}
</style>
