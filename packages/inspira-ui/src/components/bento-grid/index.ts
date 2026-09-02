import { withInstall, withInstallCompound } from '../../utils'
import BentoGrid from './src/bento-grid.vue'
import BentoGridCard from './src/bento-grid-card.vue'
import BentoGridItem from './src/bento-grid-item.vue'

/** 单独 use 时会同时注册 Item / Card 子组件 */
export const IuBentoGrid = withInstallCompound(BentoGrid, BentoGridItem, BentoGridCard)
export const IuBentoGridItem = withInstall(BentoGridItem)
export const IuBentoGridCard = withInstall(BentoGridCard)

export type {
  BentoGridProps,
  BentoGridDataItem,
  BentoGridItemProps,
  BentoGridCardProps,
} from './src/bento-grid-types'
