import type { HTMLAttributes } from 'vue'

export interface ShimmerButtonProps {
  /** 微光颜色 */
  shimmerColor?: string
  /** 微光切割尺寸（CSS 长度） */
  shimmerSize?: string
  /** 圆角（CSS 长度） */
  borderRadius?: string
  /** 微光周期（CSS 时间） */
  shimmerDuration?: string
  /** 按钮背景色 */
  background?: string
  class?: HTMLAttributes['class']
}
