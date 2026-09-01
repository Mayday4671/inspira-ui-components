<script setup>
import Demo from '../examples/aurora-background/basic.vue'
import DemoSource from '../examples/aurora-background/basic.vue?raw'
</script>

# AuroraBackground 极光背景

流动极光渐变的整页背景容器。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="极光背景示例" />

## 属性

| 名称           | 说明                     | 类型      | 默认值  |
| -------------- | ------------------------ | --------- | ------- |
| radialGradient | 启用右上角径向遮罩       | `boolean` | `true`  |
| class          | 根元素类名（合并）       | `string`  | —       |

::: tip
组件默认渲染 `<main>` 并占满整屏（`h-screen`）且内容居中，适合作为落地页根容器；
如需局部使用，可通过 class / style 覆盖高度（示例代码中演示了覆盖方式）。
:::

## 插槽

| 名称    | 说明                          |
| ------- | ----------------------------- |
| default | 前景内容（置于极光之上）      |
