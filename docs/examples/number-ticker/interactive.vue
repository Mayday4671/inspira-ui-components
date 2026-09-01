<script setup lang="ts">
import { ref } from 'vue'
import { IuNumberTicker } from 'inspira-ui-components'

const value = ref(98765)
</script>

<template>
  <span class="demo-num"><IuNumberTicker :value="value" :decimal-places="0" :duration="1500" /></span>
  <button class="demo-btn" type="button" @click="value += 1379">value + 1379</button>
</template>

<style scoped>
.demo-num {
  font-size: 36px;
  font-weight: 700;
}

.demo-btn {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: transparent;
  cursor: pointer;
}
</style>
