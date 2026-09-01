import { withInstall, withInstallCompound } from '../../utils'
import Card3D from './src/card-3d.vue'
import Card3DBody from './src/card-3d-body.vue'
import Card3DContainer from './src/card-3d-container.vue'
import Card3DItem from './src/card-3d-item.vue'

/** 快捷模式：一行代码出一张 3D 卡片 */
export const IuCard3D = withInstall(Card3D)

/** 高级模式三件套：单独 use 时会同时注册 Body / Item */
export const IuCard3DContainer = withInstallCompound(Card3DContainer, Card3DBody, Card3DItem)
export const IuCard3DBody = withInstall(Card3DBody)
export const IuCard3DItem = withInstall(Card3DItem)

export { CARD_3D_KEY, useCard3D, type Card3DContext } from './src/context'
export type {
  Card3DProps,
  Card3DContainerProps,
  Card3DBodyProps,
  Card3DItemProps,
} from './src/card-3d-types'
