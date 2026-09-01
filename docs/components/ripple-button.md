<script setup>
import Demo from '../examples/ripple-button/basic.vue'
import DemoSource from '../examples/ripple-button/basic.vue?raw'
</script>

# RippleButton 涟漪按钮

点击时从点击位置扩散 Material 风格涟漪的按钮。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="按钮示例" />

## 属性

| 名称         | 说明                       | 类型     | 默认值    |
| ------------ | -------------------------- | -------- | --------- |
| rippleColor  | 涟漪颜色（任意 CSS 颜色）  | `string` | `#ADD8E6` |
| duration     | 涟漪动画时长（毫秒）       | `number` | `600`     |
| class        | 追加到根元素的类名（合并） | `string` | —         |

## 事件

| 名称  | 说明                 | 参数                 |
| ----- | -------------------- | -------------------- |
| click | 按钮被点击时触发     | `event: MouseEvent`  |

## 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮文本内容   |
