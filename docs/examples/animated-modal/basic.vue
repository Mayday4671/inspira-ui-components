<script setup lang="ts">
import {
  IuAnimatedModal,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedModalFooter,
  IuAnimatedModalTrigger,
} from 'inspira-ui-components'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <IuAnimatedModal v-model:open="open">
    <IuAnimatedModalTrigger>打开模态框</IuAnimatedModalTrigger>
    <IuAnimatedModalBody>
      <IuAnimatedModalContent>
        <h4>受控模态框</h4>
        <p>支持 Esc、遮罩关闭、滚动锁定与焦点恢复。</p>
      </IuAnimatedModalContent>
      <IuAnimatedModalFooter>
        <button type="button" @click="open = false">取消</button>
        <button type="button" @click="open = false">确定</button>
      </IuAnimatedModalFooter>
    </IuAnimatedModalBody>
  </IuAnimatedModal>
</template>
