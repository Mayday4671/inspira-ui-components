<script setup lang="ts">
import {
  IuAnimatedModal,
  IuAnimatedModalTrigger,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedModalFooter,
} from 'inspira-ui-components'
</script>

<template>
  <!-- 不传 open 即为非受控模式，默认插槽提供 open / openModal / closeModal / toggle -->
  <IuAnimatedModal v-slot="{ closeModal }">
    <IuAnimatedModalTrigger style="border-radius: 10px; border: 1px dashed #999; padding: 10px 18px; font-size: 14px">
      非受控 + 插槽参数
    </IuAnimatedModalTrigger>

    <IuAnimatedModalBody>
      <IuAnimatedModalContent>
        <h4 style="margin: 0; font-size: 20px; font-weight: 700">作用域插槽</h4>
        <p style="margin: 12px 0 0; font-size: 14px; opacity: 0.65">
          默认插槽提供 open / openModal / closeModal / toggle，可自由控制开关。
        </p>
      </IuAnimatedModalContent>
      <IuAnimatedModalFooter>
        <button style="padding: 8px 16px; border-radius: 8px; border: 1px solid #ddd; background: transparent; cursor: pointer" @click="closeModal()">
          知道了
        </button>
      </IuAnimatedModalFooter>
    </IuAnimatedModalBody>
  </IuAnimatedModal>
</template>
