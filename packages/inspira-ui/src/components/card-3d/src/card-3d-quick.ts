import type { HTMLAttributes } from 'vue'

/**
 * IuCard3D 快捷模式 props：
 * 一行代码出一张 3D 卡片；需要逐元素控制变换时改用
 * IuCard3DContainer / IuCard3DBody / IuCard3DItem 三件套。
 */
export interface Card3DProps {
  /** 标题 */
  title?: string
  /** 描述文字 */
  description?: string
  /** 背景图地址（自动铺满） */
  image?: string
  /** 背景图替代文本 */
  imageAlt?: string
  /** 底部胶囊按钮文案 */
  cta?: string
  /** 点击行动区跳转地址 */
  href?: string
  /** 链接打开目标 */
  target?: string
  /** 禁止行动区跳转 */
  disabled?: boolean
  class?: HTMLAttributes['class']
}
