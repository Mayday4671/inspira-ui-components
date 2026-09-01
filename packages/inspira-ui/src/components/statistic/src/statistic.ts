import type { HTMLAttributes } from 'vue'

export interface StatisticProps {
  /** 指标名称 */
  label?: string
  /** 指标数值（进入视口时滚动） */
  value: number
  /** 数值前缀，如 ¥ */
  prefix?: string
  /** 数值后缀，如 %、万 */
  suffix?: string
  /** 小数位数 */
  decimals?: number
  /** 滚动动画时长（毫秒） */
  duration?: number
  /** 同比/环比涨跌幅（百分比数值，正数绿色▲、负数红色▼） */
  trend?: number
  /** 涨跌幅说明文字 */
  trendLabel?: string
  class?: HTMLAttributes['class']
}
