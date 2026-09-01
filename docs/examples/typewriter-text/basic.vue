<script setup lang="ts">
import { IuTypewriterText } from 'inspira-ui-components'
</script>

<template>
  <IuTypewriterText
    :text="['构建你自己的组件库', '像 Element Plus 一样使用', '通过 npm 包直接调用']"
    :speed="70"
    class="demo-text"
  />
</template>

<style scoped>
.demo-text {
  font-size: 20px;
  font-weight: 600;
}
</style>
