<script setup>
import Demo from '../examples/animated-tooltip/basic.vue'
import DemoSource from '../examples/animated-tooltip/basic.vue?raw'
</script>

# AnimatedTooltip 悬浮名片

头像堆叠 + 悬停弹出跟随鼠标倾斜的成员名片。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="悬浮名片示例" />

## 属性

| 名称  | 说明           | 类型                    | 默认值 |
| ----- | -------------- | ----------------------- | ------ |
| items | 成员列表       | `AnimatedTooltipItem[]` | —      |

```ts
interface AnimatedTooltipItem {
  id: string | number
  name: string        // 成员名称
  designation: string // 职位 / 描述
  image: string       // 头像图片地址
}
```

## 事件

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| item-click | `(item, event)` | 点击或键盘激活成员时触发 |
