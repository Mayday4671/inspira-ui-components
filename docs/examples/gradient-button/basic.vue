<script setup lang="ts">
import { IuGradientButton } from 'inspira-ui-components'
</script>

<template>
  <IuGradientButton>
    <span style="color: #fff">Gradient Button</span>
  </IuGradientButton>

  <IuGradientButton
    :colors="['#22d3ee', '#818cf8', '#e879f9', '#22d3ee']"
    :duration="1500"
    bg-color="#0f172a"
  >
    <span style="color: #fff">赛博配色</span>
  </IuGradientButton>
</template>
