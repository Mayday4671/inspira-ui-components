import type { HTMLAttributes } from 'vue'
import type { IuButtonBaseProps } from '../../button-shared'

export interface InteractiveHoverButtonProps extends IuButtonBaseProps {
  /** 按钮文本，也可通过默认插槽覆盖 */
  text?: string
  class?: HTMLAttributes['class']
}
