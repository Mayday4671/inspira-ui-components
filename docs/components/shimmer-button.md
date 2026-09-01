<script setup>
import Demo from '../examples/shimmer-button/basic.vue'
import DemoSource from '../examples/shimmer-button/basic.vue?raw'
</script>

# ShimmerButton 微光按钮

一道微光沿按钮边缘持续环绕滑动的按钮，适合 CTA 场景。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="按钮示例" />

## 属性

| 名称            | 说明                           | 类型     | 默认值              |
| --------------- | ------------------------------ | -------- | ------------------- |
| shimmerColor    | 微光颜色                       | `string` | `#ffffff`           |
| shimmerSize     | 微光切割尺寸（CSS 长度）       | `string` | `0.05em`            |
| borderRadius    | 圆角（CSS 长度）               | `string` | `100px`             |
| shimmerDuration | 微光周期（CSS 时间）           | `string` | `3s`                |
| background      | 按钮背景色                     | `string` | `rgba(0,0,0,1)`     |
| class           | 追加到根元素的类名（合并）     | `string` | —                   |

## 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮文本内容   |
