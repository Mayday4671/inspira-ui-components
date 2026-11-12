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
}

export { GRADIENT_ANGLES }
