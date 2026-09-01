import type { HTMLAttributes } from 'vue'

export interface GradientButtonProps {
  /** 流光边框宽度（px） */
  borderWidth?: number
  /** conic-gradient 的颜色序列 */
  colors?: string[]
  /** 一圈动画时长（毫秒） */
  duration?: number
  /** 圆角（px） */
  borderRadius?: number
  /** 边框光晕模糊（px） */
  blur?: number
  class?: HTMLAttributes['class']
  /** 内容区背景色 */
  bgColor?: string
}
