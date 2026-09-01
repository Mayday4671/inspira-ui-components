import type { HTMLAttributes } from 'vue'

export interface AuroraBackgroundProps {
  /** 是否启用右上角径向遮罩 */
  radialGradient?: boolean
  /** 容器高度（CSS 长度，默认整屏） */
  height?: string
  /** 容器圆角（CSS 长度，如 '14px'） */
  rounded?: string
  class?: HTMLAttributes['class']
}
