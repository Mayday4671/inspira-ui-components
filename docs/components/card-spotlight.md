<script setup>
import Demo from '../examples/card-spotlight/basic.vue'
import DemoSource from '../examples/card-spotlight/basic.vue?raw'
</script>

# CardSpotlight 聚光灯卡片

鼠标移动时有聚光灯光斑跟随的卡片。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="聚光灯卡片示例" />

## 属性

| 名称            | 说明                                        | 类型      | 默认值    |
| --------------- | ------------------------------------------- | --------- | --------- |
| title           | 标题（快捷模式；有默认插槽时忽略）          | `string`  | —         |
| description     | 描述文字（快捷模式）                        | `string`  | —         |
| padded          | 快捷模式自带内边距                          | `boolean` | `true`    |
| gradientSize    | 光斑半径（px）                              | `number`  | `200`     |
| gradientColor   | 光斑颜色                                    | `string`  | `#262626` |
| gradientOpacity | 光斑不透明度                                | `number`  | `0.8`     |
| slotClass       | 内容区附加类名                              | `string`  | —         |
| class           | 根元素类名（合并）                          | `string`  | —         |

## 插槽

| 名称    | 说明         |
| ------- | ------------ |
| default | 卡片内容     |
