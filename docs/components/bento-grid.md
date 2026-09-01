<script setup>
import Demo from '../examples/bento-grid/basic.vue'
import DemoSource from '../examples/bento-grid/basic.vue?raw'
</script>

# BentoGrid Bento 网格

苹果发布会风格的 Bento 卡片网格，提供两套卡片组件。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="Bento 网格示例" />

## 组件

| 组件               | 职责                                       |
| ------------------ | ------------------------------------------ |
| `IuBentoGrid`      | 网格容器（1 列 → 3 列响应式）              |
| `IuBentoGridItem`  | 基础卡片（header / icon / title / description 插槽） |
| `IuBentoGridCard`  | 大卡片（悬停上浮 + 行动链接）              |

## IuBentoGridItem 插槽

| 名称         | 说明           |
| ------------ | -------------- |
| header       | 顶部区域       |
| icon         | 图标           |
| title        | 标题           |
| description  | 描述           |

## IuBentoGridCard 属性

| 名称        | 说明               | 类型                 | 默认值 |
| ----------- | ------------------ | -------------------- | ------ |
| name        | 卡片标题           | `string`             | —      |
| description | 描述文本           | `string`             | —      |
| href        | 行动链接地址       | `string`             | —      |
| cta         | 行动文案           | `string`             | —      |
| icon        | 图标（组件/标签名）| `string \| Component` | —     |

## IuBentoGridCard 插槽

| 名称       | 说明                     |
| ---------- | ------------------------ |
| background | 背景层（悬停时显示渐变） |
