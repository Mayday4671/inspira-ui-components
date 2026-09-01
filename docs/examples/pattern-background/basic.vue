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
    style="height: 200px; border-radius: 14px; display: flex; align-items: center; justify-content: center"
    :variant="PATTERN_BACKGROUND_VARIANT.Grid"
    :animate="true"
    :direction="PATTERN_BACKGROUND_DIRECTION.Top"
    :speed="PATTERN_BACKGROUND_SPEED.Slow"
  >
    <p style="position: relative; z-index: 10; margin: 0; font-size: 16px; font-weight: 700">
      Grid 图案 · 缓慢滚动
    </p>
  </IuPatternBackground>

  <IuPatternBackground
    style="height: 200px; border-radius: 14px; display: flex; align-items: center; justify-content: center"
    :variant="PATTERN_BACKGROUND_VARIANT.BigDot"
    :animate="false"
  >
    <p style="position: relative; z-index: 10; margin: 0; font-size: 16px; font-weight: 700">
      BigDot 图案 · 静止
    </p>
  </IuPatternBackground>
</template>
