<script setup>
import Demo from '../examples/number-ticker/basic.vue'
import DemoSource from '../examples/number-ticker/basic.vue?raw'
</script>

# NumberTicker 数字滚动

数字从 0（或目标值）平滑滚动到目标值的动效组件，进入视口时触发。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="数字滚动示例" />

## 属性

| 名称          | 说明                                        | 类型     | 默认值         |
| ------------- | ------------------------------------------- | -------- | -------------- |
| value         | 目标数值                                    | `number` | `0`            |
| direction     | 滚动方向：`up` 从 0 滚到目标值 / `down` 反向 | `string` | `up`           |
| duration      | 动画时长（毫秒）                            | `number` | `1000`         |
| delay         | 动画延迟（毫秒）                            | `number` | `0`            |
| decimalPlaces | 小数位数                                    | `number` | `2`            |
| transition    | 缓动曲线（@vueuse TransitionPresets 键名）  | `string` | `easeOutCubic` |
| class         | 根元素类名（合并）                          | `string` | —              |

可用缓动包括：`linear`、`easeOut`、`easeInOut`、`easeOutCubic`、`easeOutExpo`、`easeOutBack`、`circOut` 等。
