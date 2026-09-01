<script setup>
import Demo from '../examples/flip-card/basic.vue'
import DemoSource from '../examples/flip-card/basic.vue?raw'
</script>

# FlipCard 翻转卡片

悬停时 3D 翻转、移开翻回的双面卡片。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="翻转卡片示例" />

## 属性

| 名称            | 说明                                    | 类型             | 默认值 |
| --------------- | --------------------------------------- | ---------------- | ------ |
| rotate          | 翻转轴：x 上下 / y 左右                 | `'x' \| 'y'`     | `y`    |
| image           | 正面背景图地址（有默认插槽时忽略）      | `string`         | —      |
| backTitle       | 背面标题（有 back 插槽时忽略）          | `string`         | —      |
| backDescription | 背面描述                                | `string`         | —      |
| class           | 根元素类名（合并）                      | `string`         | —      |

## 插槽

| 名称    | 说明         |
| ------- | ------------ |
| default | 正面内容     |
| back    | 背面内容     |
