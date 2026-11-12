import { withInstall } from '../../utils'
import Comp0 from './src/CardStack.vue'
import Comp1 from './src/CardStackItem.vue'

export const IuCardStack = withInstall(Comp0)
export default IuCardStack
export const IuCardStackItem = withInstall(Comp1)

export type { Props as CardStackProps } from './src/CardStack.vue'
export type { CardStackContext } from './src/CardStackContext'
export type { Props as CardStackItemProps } from './src/CardStackItem.vue'
