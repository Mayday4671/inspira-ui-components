<script setup>
import Basic from '../examples/shimmer-button/basic.vue'
import BasicSource from '../examples/shimmer-button/basic.vue?raw'
import Sizes from '../examples/shimmer-button/sizes.vue'
import SizesSource from '../examples/shimmer-button/sizes.vue?raw'
import Loading from '../examples/shimmer-button/loading.vue'
import LoadingSource from '../examples/shimmer-button/loading.vue?raw'
</script>

# ShimmerButton 微光按钮

一道微光沿按钮边缘持续环绕滑动的按钮，适合 CTA 场景。与其他 Iu 按钮共享
`size / loading / disabled / block` 统一 API。

## 主题预设

<DemoBlock :demo="Basic" :code="BasicSource" title="variant: dark（配亮色页面） / light（配暗色页面）" />

## 统一尺寸

<DemoBlock :demo="Sizes" :code="SizesSource" title="size: small / default / large / xl" />

## 加载与禁用

<DemoBlock :demo="Loading" :code="LoadingSource" title="loading 自动转圈防重复提交" />

## 属性

| 名称            | 说明                           | 类型                          | 默认值          |
| --------------- | ------------------------------ | ----------------------------- | --------------- |
| variant         | 主题预设                       | `'dark' \| 'light'`           | `dark`          |
| size            | 统一尺寸                       | `'small' \| 'default' \| 'large' \| 'xl'` | `default` |
| loading         | 加载中（自动禁用并转圈）       | `boolean`                     | `false`         |
| disabled        | 禁用                           | `boolean`                     | `false`         |
| block           | 占满一行                       | `boolean`                     | `false`         |
| shimmerColor    | 微光颜色（缺省跟随 variant）   | `string`                      | —               |
| shimmerSize     | 微光切割尺寸（CSS 长度）       | `string`                      | `0.05em`        |
| borderRadius    | 圆角（CSS 长度，缺省跟 variant）| `string`                     | —               |
| shimmerDuration | 微光周期（CSS 时间）           | `string`                      | `3s`            |
| background      | 按钮背景色（缺省跟 variant）   | `string`                      | —               |
| class           | 追加到根元素的类名（合并）     | `string`                      | —               |

## 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 按钮文本内容   |
