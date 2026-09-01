<script setup lang="ts">
import { IuRippleButton } from 'inspira-ui-components'

function onClick() {
  console.log('ripple button clicked')
}
</script>

<template>
  <IuRippleButton @click="onClick">默认涟漪</IuRippleButton>
  <IuRippleButton ripple-color="#7c3aed" :duration="900">紫色涟漪（900ms）</IuRippleButton>
</template>
