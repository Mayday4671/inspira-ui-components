<script setup lang="ts">
import { IuNumberTicker } from 'inspira-ui-components'
</script>

<template>
  <span class="demo-num"><IuNumberTicker :value="98765" :decimal-places="0" /></span>
  <span class="demo-num demo-num-money"><IuNumberTicker :value="328.5" :decimal-places="1" prefix="¥" suffix="万" /></span>
  <span class="demo-num demo-num-blue"><IuNumberTicker :value="98.7" suffix="%" /></span>
</template>

<style scoped>
.demo-num {
  font-size: 32px;
  font-weight: 700;
}

.demo-num-money {
  font-size: 26px;
  color: #059669;
}

.demo-num-blue {
  font-size: 26px;
  color: #2563eb;
}
</style>
