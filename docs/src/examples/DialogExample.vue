<script setup lang="ts">
import { ref } from 'vue'
import { IuDialog } from 'inspira-ui-components/components/dialog'
import 'inspira-ui-components/dist/index.css'

const demoTitle = '确认提交订单'
const demoDanger = false
const demoShowClose = true

const props = defineProps<{
  title?: string
  danger?: boolean
  showClose?: boolean
}>()

const show = ref(false)

async function submitOrder() {
  await new Promise<void>((resolve) => setTimeout(resolve, 600))
}
</script>

<template>
  <button class="btn" type="button" @click="show = true">打开弹窗</button>
  <IuDialog
    v-model="show"
    :title="props.title ?? demoTitle"
    :danger="props.danger ?? demoDanger"
    :show-close="props.showClose ?? demoShowClose"
    :confirm="submitOrder"
    width="420px"
    description="核对订单内容后提交。"
  >
    确认后，按钮会在等待提交结果时显示加载状态。
  </IuDialog>
</template>
