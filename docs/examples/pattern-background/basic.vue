<script setup lang="ts">
import {
  IuPatternBackground,
  PATTERN_BACKGROUND_VARIANT,
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
} from 'inspira-ui-components'
</script>

<template>
  <IuPatternBackground
    class="demo-bg"
    :variant="PATTERN_BACKGROUND_VARIANT.Grid"
    :animate="true"
    :direction="PATTERN_BACKGROUND_DIRECTION.Top"
    :speed="PATTERN_BACKGROUND_SPEED.Slow"
  >
    <p class="demo-label">Grid 图案 · 缓慢滚动</p>
  </IuPatternBackground>

  <IuPatternBackground
    class="demo-bg"
    :variant="PATTERN_BACKGROUND_VARIANT.BigDot"
    :animate="false"
  >
    <p class="demo-label">BigDot 图案 · 静止</p>
  </IuPatternBackground>
</template>

<style scoped>
.demo-bg {
  height: 200px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-label {
  position: relative;
  z-index: 10;
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}
</style>
