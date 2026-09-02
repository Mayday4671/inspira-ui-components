import type { HTMLAttributes } from 'vue'

export interface CardSpotlightProps {
  /** 标题（快捷模式；有默认插槽时忽略） */
  title?: string
  /** 描述文字（快捷模式） */
  description?: string
  /** 快捷模式图片 */
  image?: string
  /** 图片替代文本 */
  imageAlt?: string
  /** 行动文案 */
  cta?: string
  /** 行动链接 */
  href?: string
  /** 链接打开目标 */
  target?: string
  /** 禁止行动区跳转 */
  disabled?: boolean
  /** 自带内边距，快捷模式默认开启 */
  padded?: boolean
  class?: HTMLAttributes['class']
  /** 内容区附加类名 */
  slotClass?: HTMLAttributes['class']
  /** 跟随光斑半径（px） */
  gradientSize?: number
  /** 光斑颜色 */
  gradientColor?: string
  /** 光斑不透明度 */
  gradientOpacity?: number
}
