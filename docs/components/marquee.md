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
| reverse      | 反向滚动                             | `boolean` | `false` |
| pauseOnHover | 悬停时暂停                           | `boolean` | `false` |
| vertical     | 纵向滚动                             | `boolean` | `false` |
| repeat       | 内容重复次数（需足够覆盖滚动区域）   | `number`  | `4`    |
| class        | 根元素类名（合并）                   | `string`  | —      |

::: tip
通过 CSS 变量可控制速度与间距：根元素设置 `[--duration:20s]`、`[--gap:0.5rem]`（或 style）。
:::
