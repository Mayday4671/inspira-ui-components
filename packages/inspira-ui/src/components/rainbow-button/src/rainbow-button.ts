import type { HTMLAttributes } from 'vue'
import type { IuButtonBaseProps } from '../../button-shared'

export interface RainbowButtonProps extends IuButtonBaseProps {
  /** 渲染的标签，默认 button，可传 a 等 */
  is?: string
  /** 彩虹流动速度（秒） */
  speed?: number
  class?: HTMLAttributes['class']
}
