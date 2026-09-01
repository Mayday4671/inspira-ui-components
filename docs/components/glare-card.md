<script setup>
import Demo from '../examples/glare-card/basic.vue'
import DemoSource from '../examples/glare-card/basic.vue?raw'
</script>

# GlareCard 眩光卡片

鼠标移动时呈现全息箔纸质感眩光与微旋转的卡片。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="眩光卡片示例" />

## 属性

| 名称   | 说明                              | 类型     | 默认值 |
| ------ | --------------------------------- | -------- | ------ |
| image  | 内容图地址（自动铺满）            | `string` | —      |
| width  | 卡片宽度（px）                    | `number` | `320`  |
| radius | 卡片圆角（px）                    | `number` | `48`   |
| class  | 内容层类名（默认底色 slate-950）  | `string` | —      |

## 插槽

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 卡片内容（建议铺满深色视觉元素） |
