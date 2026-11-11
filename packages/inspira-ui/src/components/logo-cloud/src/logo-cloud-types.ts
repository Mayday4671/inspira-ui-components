import type { HTMLAttributes } from 'vue'

export interface Logo {
  name: string
  path: string
}
export interface AnimateLogoCloudProps {
  class?: HTMLAttributes['class']
  title?: string
  logos?: Logo[]
}
