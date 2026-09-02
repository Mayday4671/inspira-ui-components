export type ReducedMotionMode = 'system' | 'always' | 'never'

export function shouldReduceMotion(mode: ReducedMotionMode = 'system'): boolean {
  if (mode === 'always') return true
  if (mode === 'never') return false
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export interface RestartableMotionExposes {
  restart: () => void
}

export interface PlayableMotionExposes extends RestartableMotionExposes {
  play: () => void
  pause: () => void
}
