import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

type ObjectValues<T> = T[keyof T]

export const PATTERN_BACKGROUND_DIRECTION = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  TopLeft: 'top-left',
  TopRight: 'top-right',
  BottomLeft: 'bottom-left',
  BottomRight: 'bottom-right',
} as const

export type PatternBackgroundDirection = ObjectValues<typeof PATTERN_BACKGROUND_DIRECTION>

export const PATTERN_BACKGROUND_VARIANT = {
  Grid: 'grid',
  Dot: 'dot',
  BigDot: 'big-dot',
} as const

export const PATTERN_BACKGROUND_SPEED = {
  Default: 10000,
  Slow: 25000,
  Fast: 5000,
} as const

export const PATTERN_BACKGROUND_MASK = {
  Ellipse: 'ellipse',
  EllipseTop: 'ellipse-top',
} as const

export interface PatternBackgroundProps {
  class?: HTMLAttributes['class']
  /** 是否启用滚动动画 */
  animate?: boolean
  /** 动画方向 */
  direction?: PatternBackgroundDirection
  /** 图案类型 */
  variant?: PatternBackgroundVariants['variant']
  /** 图案尺寸 */
  size?: PatternBackgroundVariants['size']
  /** 图案遮罩 */
  mask?: PatternBackgroundMaskVariants['mask']
  /** 动画速度（毫秒/周期） */
  speed?: ObjectValues<typeof PATTERN_BACKGROUND_SPEED>
}

export const patternBackgroundVariants = cva('relative text-clip', {
  variants: {
    variant: {
      [PATTERN_BACKGROUND_VARIANT.Grid]:
        'bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
      [PATTERN_BACKGROUND_VARIANT.Dot]:
        'bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] dark:bg-[radial-gradient(#404040_1px,transparent_1px)]',
      [PATTERN_BACKGROUND_VARIANT.BigDot]:
        'bg-[radial-gradient(#d4d4d4_3px,transparent_3px)] dark:bg-[radial-gradient(#404040_3px,transparent_3px)]',
    },
    size: {
      xs: 'bg-size-[8px_8px]',
      sm: 'bg-size-[16px_16px]',
      md: 'bg-size-[24px_24px]',
      lg: 'bg-size-[32px_32px]',
      xl: 'bg-size-[40px_40px]',
    },
  },
  defaultVariants: {
    variant: 'grid',
    size: 'md',
  },
})

export type PatternBackgroundVariants = VariantProps<typeof patternBackgroundVariants>

export const patternBackgroundMaskVariants = cva('bg-background', {
  variants: {
    mask: {
      [PATTERN_BACKGROUND_MASK.Ellipse]:
        'mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]',
      [PATTERN_BACKGROUND_MASK.EllipseTop]:
        'mask-[radial-gradient(ellipse_at_top,transparent_20%,black)]',
    },
  },
  defaultVariants: {
    mask: 'ellipse',
  },
})

export type PatternBackgroundMaskVariants = VariantProps<typeof patternBackgroundMaskVariants>
