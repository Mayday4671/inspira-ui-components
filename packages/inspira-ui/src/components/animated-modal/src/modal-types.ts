export interface AnimatedModalProps {
  /** 受控打开状态（配合 v-model:open） */
  open?: boolean
  /** 非受控模式的初始打开状态 */
  defaultOpen?: boolean
  /** 按 Esc 关闭 */
  closeOnEsc?: boolean
}

export interface AnimatedModalBodyProps {
  class?: string
  /** 遮罩层类名 */
  overlayClass?: string
  /** 内容包裹层类名 */
  contentClass?: string
  /** 弹层宽度（CSS 宽度，如 '460px'、'80%'） */
  width?: string
  /** 是否显示右上角关闭按钮 */
  showClose?: boolean
  /** 禁用右上角关闭按钮 */
  disableClose?: boolean
  /** 离场结束后卸载内容 */
  destroyOnClose?: boolean
  /** 点击遮罩关闭 */
  closeOnOutside?: boolean
  /** 打开时锁定滚动 */
  lockScroll?: boolean
  /** 弹层 z-index */
  zIndex?: number
  /** Teleport 目标 */
  teleportTo?: string | HTMLElement
  ariaLabelledby?: string
  ariaDescribedby?: string
}

export interface AnimatedModalContentProps {
  class?: string
}

export interface AnimatedModalFooterProps {
  class?: string
}

export interface AnimatedModalTriggerProps {
  /** 渲染的标签，默认 button */
  as?: string
  disabled?: boolean
}
