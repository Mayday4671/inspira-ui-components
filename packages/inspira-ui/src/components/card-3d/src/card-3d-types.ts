import type { HTMLAttributes } from 'vue'

export interface Card3DContainerProps {
  class?: HTMLAttributes['class']
  /** 外层容器（perspective 容器）类名 */
  containerClass?: HTMLAttributes['class']
}

export interface Card3DBodyProps {
  class?: HTMLAttributes['class']
}

export interface Card3DItemProps {
  /** 渲染的标签 */
  as?: string
  class?: HTMLAttributes['class']

  translateX?: number
  translateY?: number
  translateZ?: number

  rotateX?: number
  rotateY?: number
  rotateZ?: number
}
