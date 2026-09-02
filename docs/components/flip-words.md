<script setup>
import Demo from '../examples/flip-words/basic.vue'
import DemoSource from '../examples/flip-words/basic.vue?raw'
</script>

# FlipWords 词语轮播

按字/词模糊展开又聚合切换的词语轮播组件。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="词语轮播示例" />

## 属性

| 名称     | 说明                       | 类型       | 默认值  |
| -------- | -------------------------- | ---------- | ------- |
| words    | 轮播的词组                 | `string[]` | —       |
| duration | 每个词停留时长（毫秒）     | `number`   | `3000`  |
| class    | 根元素类名（合并）         | `string`   | —       |
| reducedMotion | 减少动效策略           | `'system' \| 'always' \| 'never'` | `system` |

## 实例方法

`play()`、`pause()`、`restart()` 用于控制轮播。

## 事件

| 名称             | 说明               |
| ---------------- | ------------------ |
| animationStart   | 词进入动画完成后触发 |
| animationComplete | 词离场动画完成后触发 |
