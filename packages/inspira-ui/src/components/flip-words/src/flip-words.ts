import type { HTMLAttributes } from 'vue'
import type { ReducedMotionMode } from '../../motion-shared'

export interface FlipWordsProps {
  /** 轮播的词组 */
  words: string[]
  /** 每个词停留时长（毫秒） */
  duration?: number
  class?: HTMLAttributes['class']
  reducedMotion?: ReducedMotionMode
}
