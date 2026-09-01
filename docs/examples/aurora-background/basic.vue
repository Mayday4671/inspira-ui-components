<script setup lang="ts">
import { IuAuroraBackground } from 'inspira-ui-components'
</script>

<template>
  <!-- 默认占满整屏（h-screen），这里用 style 覆盖为演示尺寸 -->
  <IuAuroraBackground style="height: 320px; border-radius: 14px">
    <h4 style="position: relative; z-index: 10; margin: 0; font-size: 22px; font-weight: 700">
      Aurora Background
    </h4>
    <p style="position: relative; z-index: 10; margin: 8px 0 0; font-size: 13px; opacity: 0.7">
      流动的极光渐变（亮 / 暗色下表现不同）
    </p>
  </IuAuroraBackground>
</template>
