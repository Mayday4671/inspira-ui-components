import type { HTMLAttributes } from 'vue'
import type { IuButtonBaseProps } from '../../button-shared'

/** 内置配色预设 */
export type GradientButtonVariant = 'rainbow' | 'ocean' | 'sunset' | 'candy'

export interface GradientButtonProps extends IuButtonBaseProps {
  /** 配色预设，会被显式传入的 colors / bgColor 覆盖 */
  variant?: GradientButtonVariant
  /** conic-gradient 的颜色序列 */
  colors?: string[]
  /** 一圈动画时长（毫秒） */
  duration?: number
  /** 流光边框宽度（px） */
  borderWidth?: number
  /** 圆角（px） */
  borderRadius?: number
  /** 边框光晕模糊（px） */
  blur?: number
  /** 内容区背景色 */
  bgColor?: string
  class?: HTMLAttributes['class']
}

export const GRADIENT_PRESETS: Record<
  GradientButtonVariant,
  { colors: string[]; bgColor: string }
> = {
  rainbow: {
    colors: [
      '#FF0000',
      '#FFA500',
      '#FFFF00',
      '#008000',
      '#0000FF',
      '#4B0082',
      '#EE82EE',
      '#FF0000',
    ],
    bgColor: '#000000',
  },
  ocean: {
    colors: ['#22d3ee', '#3b82f6', '#6366f1', '#22d3ee'],
    bgColor: '#0f172a',
  },
  sunset: {
    colors: ['#fb923c', '#ef4444', '#ec4899', '#fb923c'],
    bgColor: '#1c1917',
  },
  candy: {
    colors: ['#ec4899', '#8b5cf6', '#22d3ee', '#ec4899'],
    bgColor: '#18181b',
  },
}
