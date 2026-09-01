import type { HTMLAttributes } from 'vue'

export interface CardSpotlightProps {
  class?: HTMLAttributes['class']
  /** 内容区附加类名 */
  slotClass?: HTMLAttributes['class']
  /** 跟随光斑半径（px） */
  gradientSize?: number
  /** 光斑颜色 */
  gradientColor?: string
  /** 光斑不透明度 */
  gradientOpacity?: number
}
