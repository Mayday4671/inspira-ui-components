<script setup>
import Demo from '../examples/gradient-button/basic.vue'
import DemoSource from '../examples/gradient-button/basic.vue?raw'
</script>

# GradientButton 流光按钮

conic-gradient 彩色流光沿边框旋转的按钮。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="按钮示例" />

## 属性

| 名称         | 说明                          | 类型       | 默认值（彩虹七色） |
| ------------ | ----------------------------- | ---------- | ------------------ |
| colors       | conic-gradient 颜色序列       | `string[]` | 见下               |
| duration     | 旋转一个周期时长（毫秒）      | `number`   | `2500`             |
| borderWidth  | 流光边框宽度（px）            | `number`   | `2`                |
| borderRadius | 圆角（px）                    | `number`   | `8`                |
| blur         | 边框光晕模糊（px）            | `number`   | `4`                |
| bgColor      | 内容区背景色                  | `string`   | `#000`             |
| class        | 追加到根元素的类名（合并）    | `string`   | —                  |

默认颜色：

```ts
['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE', '#FF0000']
```

## 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮文本内容   |
