<script setup>
import Demo from '../examples/pattern-background/basic.vue'
import DemoSource from '../examples/pattern-background/basic.vue?raw'
</script>

# PatternBackground 图案背景

网格 / 圆点图案背景，支持八方向滚动动画与径向遮罩。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="图案背景示例" />

## 属性

| 名称      | 说明           | 类型     | 默认值  |
| --------- | -------------- | -------- | ------- |
| animate   | 启用滚动动画   | `boolean`| `false` |
| direction | 动画方向       | `PatternBackgroundDirection` | `top` |
| variant   | 图案类型       | `'grid' \| 'dot' \| 'big-dot'` | `grid` |
| size      | 图案尺寸       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| mask      | 遮罩           | `'ellipse' \| 'ellipse-top'` | `ellipse` |
| speed     | 动画速度（毫秒/周期） | `number` | `10000` |
| class     | 根元素类名（合并）| `string` | — |
| height / rounded | 容器高度 / 圆角 | `string` | — |
| centered  | 居中插槽内容 | `boolean` | `false` |
| paused    | 暂停背景动画 | `boolean` | `false` |
| reducedMotion | 减少动效策略 | `'system' \| 'always' \| 'never'` | `system` |

## 常量

组件同时导出枚举常量，类型安全地传参：

```ts
import {
  IuPatternBackground,
  PATTERN_BACKGROUND_VARIANT,   // Grid / Dot / BigDot
  PATTERN_BACKGROUND_DIRECTION, // Top / Bottom / Left / Right / TopLeft / ...
  PATTERN_BACKGROUND_SPEED,     // Fast / Default / Slow
  PATTERN_BACKGROUND_MASK,      // Ellipse / EllipseTop
} from 'inspira-ui-components'
```

## 插槽

| 名称    | 说明                          |
| ------- | ----------------------------- |
| default | 前景内容（置于图案之上）      |
