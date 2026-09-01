<script setup lang="ts">
import { IuDialog, IuShimmerButton } from 'inspira-ui-components'
import { ref } from 'vue'

const show = ref(false)

// 传一个函数：loading 与关闭时机全自动
// 返回 false 或抛异常 → 弹窗保持打开；正常返回 → 自动关闭
async function submitOrder() {
  await new Promise((resolve) => setTimeout(resolve, 1500))
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
    <div style="border-radius: 8px; background: #f5f5f5; padding: 14px 16px; font-size: 14px">
      订单金额：<b>¥328.50</b>　·　支付方式：余额支付
    </div>
  </IuDialog>
</template>
