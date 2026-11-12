import { withInstall } from '../../utils'
import Comp0 from './src/InfiniteGrid.vue'

export const IuInfiniteGrid = withInstall(Comp0)
export default IuInfiniteGrid

export type { DisposableHost } from './src/DisposalManager'
export type { EventHandlerHost } from './src/EventHandler'
export type { GridManagerHost } from './src/GridManager'
export type { Props as InfiniteGridProps } from './src/InfiniteGrid.vue'
export type { CardData, PostProcessParams, InfiniteGridOptions, Position2D, ScrollState, TileGroupData, TileUserData, TileClickEventDetail, CardTexturePair, Viewport as InfiniteGridViewport } from './src/types'
