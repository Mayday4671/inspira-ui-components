import type { HTMLAttributes } from 'vue'

export interface RippleButtonProps {
  class?: HTMLAttributes['class']
  /** 涟漪颜色 */
  rippleColor?: string
  /** 涟漪动画时长（毫秒） */
  duration?: number
}
