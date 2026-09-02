<script setup lang="ts">
import {
  IuPatternBackground,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from 'inspira-ui-components'
</script>

<template>
  <IuPatternBackground
    :variant="PATTERN_BACKGROUND_VARIANT.Grid"
    :speed="PATTERN_BACKGROUND_SPEED.Slow"
    animate
    centered
    height="200px"
    rounded="14px"
  >
    Grid 图案 · 缓慢滚动
  </IuPatternBackground>
</template>
