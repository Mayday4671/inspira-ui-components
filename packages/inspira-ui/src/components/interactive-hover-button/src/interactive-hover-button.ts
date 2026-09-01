import type { HTMLAttributes } from 'vue'

export interface InteractiveHoverButtonProps {
  /** 按钮文本，也可通过默认插槽覆盖 */
  text?: string
  class?: HTMLAttributes['class']
}
