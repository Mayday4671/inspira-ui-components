import type { HTMLAttributes } from 'vue'
import type { IuButtonBaseProps } from '../../button-shared'

/** 主题预设：dark 适合亮色页面，light 适合暗色页面 */
export type ShimmerButtonVariant = 'dark' | 'light'

export interface ShimmerButtonProps extends IuButtonBaseProps {
  variant?: ShimmerButtonVariant
  /** 微光颜色（缺省跟随 variant） */
  shimmerColor?: string
  /** 微光切割尺寸（CSS 长度） */
  shimmerSize?: string
  /** 圆角（CSS 长度，缺省跟随 variant） */
  borderRadius?: string
  /** 微光周期（CSS 时间） */
  shimmerDuration?: string
  /** 按钮背景色（缺省跟随 variant） */
  background?: string
  class?: HTMLAttributes['class']
}
