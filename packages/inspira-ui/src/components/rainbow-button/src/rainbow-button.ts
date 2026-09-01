import type { HTMLAttributes } from 'vue'

export interface RainbowButtonProps {
  class?: HTMLAttributes['class']
  /** 渲染的标签，默认 button，可传 a / nuxt-link 等 */
  is?: string
  /** 彩虹流动速度（秒） */
  speed?: number
}
