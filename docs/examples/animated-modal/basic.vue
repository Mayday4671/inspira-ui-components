<script setup lang="ts">
import { ref } from 'vue'
import {
  IuAnimatedModal,
  IuAnimatedModalTrigger,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedModalFooter,
} from 'inspira-ui-components'

const open = ref(false)
</script>

<template>
  <IuAnimatedModal v-model:open="open">
    <IuAnimatedModalTrigger style="border-radius: 10px; background: #18181b; color: #fafafa; padding: 10px 18px; font-size: 14px">
      打开模态框
    </IuAnimatedModalTrigger>

    <IuAnimatedModalBody>
      <IuAnimatedModalContent>
        <h4 style="margin: 0; font-size: 20px; font-weight: 700">受控模态框</h4>
        <p style="margin: 12px 0 0; font-size: 14px; opacity: 0.65">
          通过 v-model:open 双向绑定；支持 Esc 关闭、点击遮罩关闭、滚动锁定与焦点管理。
        </p>
      </IuAnimatedModalContent>
      <IuAnimatedModalFooter>
        <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #ddd; background: transparent; cursor: pointer" @click="open = false">
          取消
        </button>
        <button style="padding: 8px 16px; border-radius: 8px; border: none; background: #18181b; color: #fff; cursor: pointer" @click="open = false">
          确定
        </button>
      </IuAnimatedModalFooter>
    </IuAnimatedModalBody>
  </IuAnimatedModal>
</template>
