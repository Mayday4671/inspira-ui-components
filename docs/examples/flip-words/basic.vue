<script setup lang="ts">
import { IuFlipWords } from 'inspira-ui-components'
</script>

<template>
  <p>
    一次引入，
    <IuFlipWords :words="['全局注册', '按需引入', 'npm 包调用']" />
    任意组件
  </p>
</template>
