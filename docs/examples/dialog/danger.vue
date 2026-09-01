<script setup lang="ts">
import { IuDialog, IuRippleButton } from 'inspira-ui-components'
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <IuRippleButton @click="show = true">删除记录</IuRippleButton>

  <!-- danger：确认按钮红色；不传 confirm 时点击确认仅关闭并触发事件 -->
  <IuDialog
    v-model="show"
    title="删除这条记录？"
    description="删除后无法恢复，请谨慎操作。"
    confirm-text="删 除"
    danger
    @confirm="console.log('deleted')"
  />
</template>
