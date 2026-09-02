import type { HTMLAttributes } from 'vue'

export interface MarqueeObjectItem {
  key: string | number
  label: string
}

export type MarqueeItem = string | MarqueeObjectItem

export interface MarqueeProps {
  class?: HTMLAttributes['class']
  /** 快捷模式内容；默认插槽存在时忽略 */
  items?: MarqueeItem[]
  /** 反向滚动 */
  reverse?: boolean
  /** 悬停时暂停 */
  pauseOnHover?: boolean
  /** 纵向滚动 */
  vertical?: boolean
  /** 内容重复次数（需覆盖宽度/高度以实现无缝滚动） */
  repeat?: number
  /** 一圈滚动时长（秒） */
  speed?: number
  /** 相邻内容间距（CSS 长度） */
  gap?: string
}
