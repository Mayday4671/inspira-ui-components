<script setup lang="ts">
import { IuBlurReveal } from 'inspira-ui-components'
</script>

<template>
  <IuBlurReveal :duration="0.8" :delay="0.3">
    <strong>第一行：进入视口时模糊淡入</strong>
    <span>第二行：按 delay 系数依次出现</span>
    <span>第三行：形成错落的揭示节奏</span>
  </IuBlurReveal>
</template>
