<script setup lang="ts">
import { IuNumberTicker } from 'inspira-ui-components'
</script>

<template>
  <span style="font-size: 32px; font-weight: 700">
    <IuNumberTicker :value="98765" :decimal-places="0" />
  </span>
  <span style="font-size: 26px; font-weight: 700; color: #059669">
    <IuNumberTicker :value="328.5" :decimal-places="1" prefix="¥" suffix="万" />
  </span>
  <span style="font-size: 26px; font-weight: 700; color: #2563eb">
    <IuNumberTicker :value="98.7" suffix="%" />
  </span>
</template>
