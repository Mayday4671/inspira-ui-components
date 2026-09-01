<script setup lang="ts">
import {
  IuAuroraBackground,
  IuPatternBackground,
  PATTERN_BACKGROUND_VARIANT,
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
} from 'inspira-ui-components'
</script>

<template>
  <section id="backgrounds" class="pg-category">
    <h3 class="pg-category-title">背景 Backgrounds</h3>
    <p class="pg-category-desc">极光与图案背景</p>

    <div class="pg-demo">
      <p class="pg-demo-title">IuAuroraBackground 极光背景</p>
      <p class="pg-demo-props">height · rounded —— 局部使用不再需要手写 style 覆盖</p>
      <div class="pg-demo-stage col">
        <IuAuroraBackground height="320px" rounded="14px">
          <h4 class="z-10 text-2xl font-bold m-0">Aurora Background</h4>
          <p class="z-10 mt-2 text-sm mb-0 opacity-70">流动的极光渐变（亮 / 暗色下表现不同）</p>
        </IuAuroraBackground>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuPatternBackground 图案背景</p>
      <p class="pg-demo-props">
        variant（grid / dot / big-dot）· size · animate · direction · speed · mask
      </p>
      <div class="pg-demo-stage col">
        <IuPatternBackground
          class="flex h-56 items-center justify-center rounded-xl"
          :variant="PATTERN_BACKGROUND_VARIANT.Grid"
          :animate="true"
          :direction="PATTERN_BACKGROUND_DIRECTION.Top"
          :speed="PATTERN_BACKGROUND_SPEED.Slow"
        >
          <p class="z-10 text-lg font-bold">Grid 图案 · 缓慢滚动</p>
        </IuPatternBackground>
        <IuPatternBackground
          class="flex h-56 items-center justify-center rounded-xl"
          :variant="PATTERN_BACKGROUND_VARIANT.BigDot"
          :animate="false"
        >
          <p class="z-10 text-lg font-bold">BigDot 图案 · 静止</p>
        </IuPatternBackground>
      </div>
    </div>
  </section>
</template>
