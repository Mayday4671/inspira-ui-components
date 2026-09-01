<script setup lang="ts">
import {
  IuAnimatedModal,
  IuAnimatedModalTrigger,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedModalFooter,
} from 'inspira-ui-components'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <IuAnimatedModal v-model:open="open">
    <IuAnimatedModalTrigger class="demo-trigger">受控模态框</IuAnimatedModalTrigger>

    <IuAnimatedModalBody>
      <IuAnimatedModalContent>
        <h4 class="demo-title">受控模态框</h4>
        <p class="demo-desc">
          通过 v-model:open 双向绑定；支持 Esc 关闭、点击遮罩关闭、滚动锁定与焦点管理。
        </p>
      </IuAnimatedModalContent>
      <IuAnimatedModalFooter>
        <button class="demo-btn" type="button" @click="open = false">取消</button>
        <button class="demo-btn demo-btn-primary" type="button" @click="open = false">确定</button>
      </IuAnimatedModalFooter>
    </IuAnimatedModalBody>
  </IuAnimatedModal>
</template>

<style scoped>
.demo-trigger {
  border-radius: 10px;
  background: #18181b;
  color: #fafafa;
  padding: 10px 18px;
  font-size: 14px;
}

.demo-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.demo-desc {
  margin: 12px 0 0;
  font-size: 14px;
  opacity: 0.65;
}

.demo-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: transparent;
  cursor: pointer;
}

.demo-btn-primary {
  border: none;
  background: #18181b;
  color: #fff;
}
</style>
