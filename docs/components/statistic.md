<script setup>
import Demo from '../examples/statistic/basic.vue'
import DemoSource from '../examples/statistic/basic.vue?raw'
</script>

# Statistic 指标卡

数字滚动动画 + 千分位 + 前后缀 + 涨跌幅徽标，一行配置出仪表盘指标。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="今日营收 / 新增用户 / 转化率" />

## 属性

| 名称        | 说明                                        | 类型     | 默认值  |
| ----------- | ------------------------------------------- | -------- | ------- |
| label       | 指标名称                                    | `string` | —       |
| value       | 指标数值（进入视口时滚动）                  | `number` | 必填    |
| prefix      | 数值前缀，如 ¥                              | `string` | —       |
| suffix      | 数值后缀，如 %、万                          | `string` | —       |
| decimals    | 小数位数                                    | `number` | `0`     |
| duration    | 滚动动画时长（毫秒）                        | `number` | `1200`  |
| trend       | 涨跌幅（百分比数值，正绿▲负红▼）            | `number` | —       |
| trend-label | 涨跌幅说明文字                              | `string` | —       |
| class       | 根元素类名（合并）                          | `string` | —       |
| reducedMotion | 减少动效策略                              | `'system' \| 'always' \| 'never'` | `system` |

## 实例方法

`restart()` 重新播放内部数字动画。

## 插槽

| 名称         | 说明                     |
| ------------ | ------------------------ |
| default      | 追加内容（如迷你图表）   |
| label-extra  | 标题行附加内容           |
