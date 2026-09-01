import type { HTMLAttributes } from 'vue'

export interface GlareCardProps {
  /** 内容图地址（自动铺满） */
  image?: string
  /** 卡片宽度（px） */
  width?: number
  /** 卡片圆角（px） */
  radius?: number
  class?: HTMLAttributes['class']
}
