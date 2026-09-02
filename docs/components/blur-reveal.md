<script setup>
import Demo from '../examples/blur-reveal/basic.vue'
import DemoSource from '../examples/blur-reveal/basic.vue?raw'
</script>

# BlurReveal 模糊揭示

子元素在进入视口时按序从模糊偏移状态清晰浮现的容器。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="模糊揭示示例" />

## 属性

| 名称     | 说明                           | 类型     | 默认值  |
| -------- | ------------------------------ | -------- | ------- |
| duration | 单个子元素动画时长（秒）      | `number` | `1`     |
| delay    | 相邻子元素的 stagger 系数（秒）| `number` | `2`     |
| blur     | 初始模糊半径                   | `string` | `20px`  |
| yOffset  | 初始 Y 轴偏移（px）            | `number` | `20`    |
| class    | 根元素类名（合并）             | `string` | —       |
| reducedMotion | 减少动效策略               | `'system' \| 'always' \| 'never'` | `system` |

## 实例方法

`restart()` 重新播放揭示动画。

::: tip
每个直接子元素会依次延迟 `delay × 索引` 秒出现，形成错落揭示节奏。
:::
