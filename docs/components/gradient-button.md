<script setup>
import Demo from '../examples/gradient-button/basic.vue'
import DemoSource from '../examples/gradient-button/basic.vue?raw'
</script>

# GradientButton 流光按钮

conic-gradient 彩色流光沿边框旋转的按钮。与其他 Iu 按钮共享
`size / loading / disabled / block` 统一 API。

## 配色预设

<DemoBlock :demo="Demo" :code="DemoSource" title="variant: rainbow / ocean / sunset / candy" />

## 属性

| 名称         | 说明                                        | 类型                          | 默认值     |
| ------------ | ------------------------------------------- | ----------------------------- | ---------- |
| variant      | 配色预设（被显式 colors / bgColor 覆盖）    | `'rainbow' \| 'ocean' \| 'sunset' \| 'candy'` | `rainbow` |
| size         | 统一尺寸                                    | `'small' \| 'default' \| 'large' \| 'xl'` | `default` |
| loading      | 加载中（自动禁用并转圈）                    | `boolean`                     | `false`    |
| disabled     | 禁用                                        | `boolean`                     | `false`    |
| block        | 占满一行                                    | `boolean`                     | `false`    |
| colors       | conic-gradient 颜色序列                     | `string[]`                    | —          |
| duration     | 旋转一个周期时长（毫秒）                    | `number`                      | `2500`     |
| borderWidth  | 流光边框宽度（px）                          | `number`                      | `2`        |
| borderRadius | 圆角（px）                                  | `number`                      | `8`        |
| blur         | 边框光晕模糊（px）                          | `number`                      | `4`        |
| bgColor      | 内容区背景色                                | `string`                      | —          |
| class        | 追加到根元素的类名（合并）                  | `string`                      | —          |

## 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮文本内容   |
