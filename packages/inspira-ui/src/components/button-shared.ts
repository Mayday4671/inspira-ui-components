import { computed, ref } from 'vue'
import type { ButtonHTMLAttributes, Component, HTMLAttributes } from 'vue'

/** 全部按钮组件统一的尺寸标识 */
export type IuButtonSize = 'small' | 'default' | 'large' | 'xl'

/** 按钮通用 props：所有 Iu 按钮保持同一套使用习惯 */
export interface IuButtonBaseProps {
  /** 统一尺寸 */
  size?: IuButtonSize
  /** 加载中（自动禁用并显示转圈） */
  loading?: boolean
  /** 禁用 */
  disabled?: boolean
  /** 占满一行 */
  block?: boolean
  /** 渲染标签或组件，默认 button */
  tag?: string | Component
  /** button 标签的原生 type */
  nativeType?: ButtonHTMLAttributes['type']
  /** 是否自动聚焦 */
  autofocus?: boolean
  /** loading 时替代默认内容的文案 */
  loadingText?: string
  /** 可访问名称 */
  ariaLabel?: string
  class?: HTMLAttributes['class']
}

export interface IuButtonExposes {
  ref: HTMLElement | null
  focus: () => void
  blur: () => void
}

export function useIuButton(
  props: IuButtonBaseProps,
  emit: (event: 'click', value: MouseEvent) => void,
  legacyTag?: () => string | Component | undefined,
) {
  const rootRef = ref<HTMLElement | null>(null)
  const resolvedTag = computed(() => legacyTag?.() ?? props.tag ?? 'button')
  const unavailable = computed(() => Boolean(props.disabled || props.loading))
  const rootAttrs = computed(() => {
    const common = {
      autofocus: props.autofocus || undefined,
      'aria-label': props.ariaLabel,
      'aria-busy': props.loading ? 'true' : undefined,
      'aria-disabled': unavailable.value ? 'true' : undefined,
    }
    return resolvedTag.value === 'button'
      ? { ...common, type: props.nativeType ?? 'button', disabled: unavailable.value }
      : { ...common, tabindex: unavailable.value ? -1 : undefined }
  })

  function handleClick(event: MouseEvent) {
    if (unavailable.value) {
      event.preventDefault()
      event.stopImmediatePropagation()
      return
    }
    emit('click', event)
  }

  function focus() {
    rootRef.value?.focus()
  }

  function blur() {
    rootRef.value?.blur()
  }

  return { rootRef, resolvedTag, rootAttrs, handleClick, focus, blur }
}

const SIZE_CLASSES: Record<IuButtonSize, string> = {
  small: 'h-8 px-3 text-xs',
  default: 'h-10 px-5 text-sm',
  large: 'h-12 px-7 text-base',
  xl: 'h-14 px-9 text-lg',
}

export function iuButtonSizeClass(size: IuButtonSize = 'default'): string {
  return SIZE_CLASSES[size]
}

export const iuButtonStateClass =
  'cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
