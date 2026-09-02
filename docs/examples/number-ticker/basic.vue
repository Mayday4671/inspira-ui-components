<script setup lang="ts">
import { IuNumberTicker } from 'inspira-ui-components'
</script>

<template>
  <IuNumberTicker :value="98765" :decimal-places="0" />
  <IuNumberTicker :value="328.5" :decimal-places="1" prefix="¥" suffix="万" />
  <IuNumberTicker :value="98.7" suffix="%" />
</template>
