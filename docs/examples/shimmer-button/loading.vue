<script setup lang="ts">
import { ref } from 'vue'
import { IuShimmerButton, IuRainbowButton, IuGradientButton } from 'inspira-ui-components'

const loading = ref(false)

function fakeSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <IuShimmerButton :loading="loading" @click="fakeSubmit">
    {{ loading ? '处理中…' : '提交订单' }}
  </IuShimmerButton>
  <IuRainbowButton loading>加载中</IuRainbowButton>
  <IuGradientButton disabled>禁用状态</IuGradientButton>
</template>
