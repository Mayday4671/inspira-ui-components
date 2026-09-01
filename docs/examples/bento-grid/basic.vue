<script setup lang="ts">
import { IuBentoGrid, IuBentoGridItem } from 'inspira-ui-components'
</script>

<template>
  <IuBentoGrid>
    <IuBentoGridItem>
      <template #header>
        <div class="bento-icon">🧩</div>
      </template>
      <template #title>20 个精选组件</template>
      <template #description>
        按钮 / 卡片 / 文本动画 / 交互 / 背景五大类，全部轻量无 WebGL 依赖。
      </template>
    </IuBentoGridItem>

    <IuBentoGridItem>
      <template #header>
        <div class="bento-icon bento-icon-2">📦</div>
      </template>
      <template #title>npm 包直接调用</template>
      <template #description>
        app.use() 全量注册或具名导入按需使用，tree-shaking 友好。
      </template>
    </IuBentoGridItem>

    <IuBentoGridItem>
      <template #header>
        <div class="bento-icon bento-icon-3">🎨</div>
      </template>
      <template #title>CSS 变量主题</template>
      <template #description>
        覆盖 --iu-* 变量即可换肤，暗色模式加 .dark 类即启用。
      </template>
    </IuBentoGridItem>
  </IuBentoGrid>
</template>

<style scoped>
.bento-icon {
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.1);
  font-size: 32px;
}

.bento-icon-2 {
  background: rgba(16, 185, 129, 0.1);
}

.bento-icon-3 {
  background: rgba(245, 158, 11, 0.1);
}
</style>
