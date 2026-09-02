<script setup lang="ts">
import { IuDialog, IuShimmerButton } from 'inspira-ui-components'
import { ref } from 'vue'

const show = ref(false)

async function submitOrder() {
  await new Promise((resolve) => setTimeout(resolve, 800))
}
</script>

<template>
  <IuShimmerButton @click="show = true">提交订单</IuShimmerButton>
  <IuDialog
    v-model="show"
    title="确认提交订单"
    description="提交后 30 分钟内可撤销，确认继续吗？"
    :confirm="submitOrder"
  >
    订单金额：¥328.50 · 支付方式：余额支付
  </IuDialog>
</template>
