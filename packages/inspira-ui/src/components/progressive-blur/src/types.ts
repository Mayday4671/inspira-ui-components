import type { MotionProps } from 'motion-v'

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const

export type ProgressiveBlurDirection = keyof typeof GRADIENT_ANGLES

export type ProgressiveBlurProps = {
  direction?: ProgressiveBlurDirection
  blurLayers?: number
  class?: string
  blurIntensity?: number
} & MotionProps<'div'>

export { GRADIENT_ANGLES }
