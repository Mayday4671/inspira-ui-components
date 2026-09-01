<script setup>
import Demo from '../examples/interactive-hover-button/basic.vue'
import DemoSource from '../examples/interactive-hover-button/basic.vue?raw'
</script>

# InteractiveHoverButton 悬停按钮

悬停时文字滑出、带箭头的副本滑入，带有轻微弹跳动效的按钮。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="按钮示例" />

点击「显示代码」可查看并复制完整源码（含 import 语句），粘贴到任何 Vue 3 项目即可运行。

## 全局使用

若已通过 `app.use(InspiraUI)` 全量注册，模板中直接使用，无需 import：

```vue
<template>
  <IuInteractiveHoverButton text="了解更多" />
</template>
```

## 属性

| 名称  | 说明                       | 类型     | 默认值    |
| ----- | -------------------------- | -------- | --------- |
| text  | 按钮文本                   | `string` | `Button`  |
| class | 追加到根元素的类名（合并） | `string` | —         |

## 插槽

| 名称    | 说明                                       |
| ------- | ------------------------------------------ |
| default | 自定义按钮内容，不传时回落到 `text` 属性文本 |
