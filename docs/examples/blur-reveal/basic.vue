<script setup lang="ts">
import { IuBlurReveal } from 'inspira-ui-components'
</script>

<template>
  <IuBlurReveal :duration="0.8" :delay="0.3" style="display: flex; flex-direction: column; gap: 8px">
    <p style="margin: 0; font-size: 18px; font-weight: 700">第一行：进入视口时模糊淡入</p>
    <p style="margin: 0; font-size: 14px; opacity: 0.65">第二行：按 delay 系数依次错落出现</p>
    <p style="margin: 0; font-size: 14px; opacity: 0.65">第三行：形成 stagger 揭示节奏</p>
  </IuBlurReveal>
</template>
