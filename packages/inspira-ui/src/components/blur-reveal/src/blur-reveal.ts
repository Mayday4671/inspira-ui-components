import type { HTMLAttributes } from 'vue'

export interface BlurRevealProps {
  /** 单个子元素动画时长（秒） */
  duration?: number
  /** 相邻子元素的 stagger 延迟系数（秒） */
  delay?: number
  /** 初始模糊半径 */
  blur?: string
  /** 初始 Y 轴偏移（px） */
  yOffset?: number
  class?: HTMLAttributes['class']
}
