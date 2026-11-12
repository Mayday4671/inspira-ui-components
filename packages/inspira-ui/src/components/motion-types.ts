import type { DOMKeyframesDefinition, MotionNodeOptions, MotionPath } from 'motion-dom'
import type { ComponentPublicInstance, MaybeRef, MaybeRefOrGetter } from 'vue'

export type MaybeComputedElementRef = MaybeRefOrGetter<
  HTMLElement | SVGElement | ComponentPublicInstance | null | undefined
>

type MarginValue = `${number}${'px' | '%'}`
type Margin = MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`

export interface UseInViewOptions {
  root?: MaybeRef<Element | Document>
  margin?: Margin
  amount?: 'some' | 'all' | number
  once?: boolean
}

type EdgeString = 'start' | 'end' | 'center' | `${number}${'px' | 'vw' | 'vh' | '%'}` | `${number}`

export interface UseScrollOptions {
  container?: MaybeComputedElementRef
  target?: MaybeComputedElementRef
  axis?: 'x' | 'y'
  offset?: (EdgeString | number | `${EdgeString} ${EdgeString}` | [number, number])[]
  trackContentSize?: boolean
}

type WithMotionPath<T> = T extends unknown ? Omit<T, 'path'> & { path?: MotionPath } : never
type VariantTransition = WithMotionPath<MotionNodeOptions['transition']>

export interface VariantType extends DOMKeyframesDefinition {
  transition?: VariantTransition & { layout?: VariantTransition }
  attrX?: DOMKeyframesDefinition['x']
  attrY?: DOMKeyframesDefinition['y']
  attrScale?: DOMKeyframesDefinition['scale']
}
