import type { HTMLAttributes } from 'vue'

export interface TextGenerateEffectProps {
  /** 要逐词显示的文本 */
  words: string
  /** 是否启用模糊过渡 */
  filter?: boolean
  /** 过渡时长（秒） */
  duration?: number
  /** 首个词出现前的延迟（毫秒） */
  delay?: number
  class?: HTMLAttributes['class']
}
