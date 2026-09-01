import { inject, readonly, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export interface Card3DContext {
  isMouseEntered: Readonly<Ref<boolean>>
  setMouseEntered: (value: boolean) => void
}

export const CARD_3D_KEY: InjectionKey<Card3DContext> = Symbol('IuCard3D')

export function useCard3DMouseState(): Card3DContext {
  const isMouseEntered = ref(false)

  function setMouseEntered(value: boolean) {
    isMouseEntered.value = value
  }

  return {
    isMouseEntered: readonly(isMouseEntered),
    setMouseEntered,
  }
}

export function useCard3D(): Card3DContext {
  const ctx = inject(CARD_3D_KEY, null)
  if (!ctx) {
    throw new Error('IuCard3DItem 必须在 <IuCard3DContainer> 内使用')
  }
  return ctx
}
