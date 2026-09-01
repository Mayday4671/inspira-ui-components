<script setup>
import Demo from '../examples/rainbow-button/basic.vue'
import DemoSource from '../examples/rainbow-button/basic.vue?raw'
</script>

# RainbowButton 彩虹按钮

彩虹渐变沿边框与底部光晕持续流动的按钮。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="按钮示例" />

## 属性

| 名称     | 说明                                        | 类型                                      | 默认值    |
| -------- | ------------------------------------------- | ----------------------------------------- | --------- |
| is       | 渲染的标签名，如 `button`、`a`              | `string`                                  | `button`  |
| speed    | 彩虹流动一个周期的时长（秒）                | `number`                                  | `2`       |
| size     | 统一尺寸                                    | `'small' \| 'default' \| 'large' \| 'xl'` | `default` |
| loading  | 加载中（自动禁用并转圈）                    | `boolean`                                 | `false`   |
| disabled | 禁用                                        | `boolean`                                 | `false`   |
| block    | 占满一行                                    | `boolean`                                 | `false`   |
| class    | 追加到根元素的类名（合并）                  | `string`                                  | —         |

## 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮文本内容   |
