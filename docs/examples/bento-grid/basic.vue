<script setup lang="ts">
import { IuBentoGrid, type BentoGridDataItem } from 'inspira-ui-components'

const items: BentoGridDataItem[] = [
  { key: 'components', name: '精选组件', description: '按钮、卡片、文本动画与背景组件。' },
  { key: 'package', name: 'npm 包调用', description: '支持全量注册和按需引入。' },
  { key: 'theme', name: '主题定制', description: '通过 CSS 变量统一换肤。' },
]
</script>

<template>
  <IuBentoGrid :items="items" />
</template>
