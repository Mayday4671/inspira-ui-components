import { withInstall, withInstallCompound } from '../../utils'
import Card3DBody from './src/card-3d-body.vue'
import Card3DContainer from './src/card-3d-container.vue'
import Card3DItem from './src/card-3d-item.vue'

/** 单独 use 时会同时注册 Body / Item 两个子组件 */
export const IuCard3DContainer = withInstallCompound(Card3DContainer, Card3DBody, Card3DItem)
export const IuCard3DBody = withInstall(Card3DBody)
export const IuCard3DItem = withInstall(Card3DItem)

export { CARD_3D_KEY, useCard3D, type Card3DContext } from './src/context'
export type {
  Card3DContainerProps,
  Card3DBodyProps,
  Card3DItemProps,
} from './src/card-3d-types'
