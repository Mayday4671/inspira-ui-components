<script setup>
import Demo from '../examples/aurora-background/basic.vue'
import DemoSource from '../examples/aurora-background/basic.vue?raw'
</script>

# AuroraBackground 极光背景

流动极光渐变的整页背景容器。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="极光背景示例" />

## 属性

| 名称           | 说明                         | 类型      | 默认值   |
| -------------- | ---------------------------- | --------- | -------- |
| height         | 容器高度（CSS 长度）         | `string`  | `100vh`  |
| rounded        | 容器圆角（CSS 长度）         | `string`  | —        |
| radialGradient | 启用右上角径向遮罩           | `boolean` | `true`   |
| class          | 根元素类名（合并）           | `string`  | —        |
| paused         | 暂停背景动画                 | `boolean` | `false`  |
| reducedMotion  | 减少动效策略                 | `'system' \| 'always' \| 'never'` | `system` |

::: tip
组件默认渲染 `<main>` 并整屏居中，适合作为落地页根容器；
局部使用直接传 `height="320px"` 和 `rounded="14px"` 即可（上方示例代码）。
:::

## 插槽

| 名称    | 说明                          |
| ------- | ----------------------------- |
| default | 前景内容（置于极光之上）      |
