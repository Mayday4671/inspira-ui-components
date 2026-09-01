import type { HTMLAttributes } from 'vue'
import type { IuButtonBaseProps } from '../../button-shared'

export interface RippleButtonProps extends IuButtonBaseProps {
  /** 涟漪颜色，缺省跟随主题主色 */
  rippleColor?: string
  /** 涟漪动画时长（毫秒） */
  duration?: number
  class?: HTMLAttributes['class']
}
