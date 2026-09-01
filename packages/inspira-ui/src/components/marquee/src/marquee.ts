import type { HTMLAttributes } from 'vue'

export interface MarqueeProps {
  class?: HTMLAttributes['class']
  /** 反向滚动 */
  reverse?: boolean
  /** 悬停时暂停 */
  pauseOnHover?: boolean
  /** 纵向滚动 */
  vertical?: boolean
  /** 内容重复次数（需覆盖宽度/高度以实现无缝滚动） */
  repeat?: number
}
