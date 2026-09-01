import type { HTMLAttributes } from 'vue'
import type { VariantType } from 'motion-v'

type VariantResolver = (custom: any) => VariantType

export interface TypewriterCursorAnimationVariants {
  [key: string]: VariantType | VariantResolver
  initial: VariantType
  animate: VariantType
}

export interface TypewriterTextProps {
  /** 要打出的文本；传数组则多段轮播 */
  text: string | string[]
  /** 渲染的标签 */
  as?: string
  /** 打字速度（毫秒/字符） */
  speed?: number
  /** 首次开始前延迟（毫秒） */
  initialDelay?: number
  /** 打完一段后的停留时间（毫秒） */
  waitTime?: number
  /** 删除速度（毫秒/字符） */
  deleteSpeed?: number
  /** 多段文本是否循环 */
  loop?: boolean
  /** 是否显示光标 */
  showCursor?: boolean
  /** 打字过程中是否隐藏光标 */
  hideCursorOnType?: boolean
  /** 光标字符 */
  cursorChar?: string
  /** 光标动画配置 */
  cursorAnimationVariants?: TypewriterCursorAnimationVariants
  cursorClass?: HTMLAttributes['class']
  class?: HTMLAttributes['class']
}
