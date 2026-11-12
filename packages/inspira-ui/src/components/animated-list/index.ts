import { withInstall } from '../../utils'
import Comp from './src/AnimatedList.vue'

export const IuAnimatedList = withInstall(Comp)
export default IuAnimatedList

export type { Props as AnimatedListProps } from './src/AnimatedList.vue'
