import type { Component, HTMLAttributes } from 'vue'

export interface BentoGridProps {
  class?: HTMLAttributes['class']
  /** 快捷模式数据；默认插槽存在时忽略 */
  items?: BentoGridDataItem[]
}

export interface BentoGridDataItem {
  key: string | number
  name: string
  description: string
  icon?: string | Component
  image?: string
  imageAlt?: string
  href?: string
  target?: string
  cta?: string
  disabled?: boolean
  colSpan?: number
  rowSpan?: number
  class?: HTMLAttributes['class']
}

export interface BentoGridItemProps {
  class?: HTMLAttributes['class']
}

export interface BentoGridCardProps {
  /** 卡片标题 */
  name: string
  class?: HTMLAttributes['class']
  /** 图标（组件名或组件） */
  icon?: string | Component
  /** 描述文本 */
  description: string
  /** 跳转链接 */
  href?: string
  /** 行动文案 */
  cta?: string
  image?: string
  imageAlt?: string
  target?: string
  disabled?: boolean
}
