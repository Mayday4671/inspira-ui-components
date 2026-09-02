<script setup>
import Demo from '../examples/marquee/basic.vue'
import DemoSource from '../examples/marquee/basic.vue?raw'
</script>

# Marquee 跑马灯

内容无缝循环滚动的跑马灯容器，支持横向 / 纵向与悬停暂停。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="跑马灯示例" />

## 属性

| 名称         | 说明                                 | 类型      | 默认值 |
| ------------ | ------------------------------------ | --------- | ------ |
| speed        | 一圈滚动时长（秒）                   | `number`  | `40`   |
| gap          | 相邻内容间距（CSS 长度）             | `string`  | `1rem` |
| reverse      | 反向滚动                             | `boolean` | `false` |
| pauseOnHover | 悬停时暂停                           | `boolean` | `false` |
| vertical     | 纵向滚动                             | `boolean` | `false` |
| repeat       | 内容重复次数（需足够覆盖滚动区域）   | `number`  | `4`    |
| class        | 根元素类名（合并）                   | `string`  | —      |
| items        | 字符串或 `{ key, label }` 列表；默认插槽优先 | `MarqueeItem[]` | — |

## 插槽

| 名称 | 说明 |
| --- | --- |
| default | 自定义滚动内容，优先于 `items` |
