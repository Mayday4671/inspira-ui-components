import { withInstall } from '../../utils'
import Comp0 from './src/AnimatedTabs.vue'
import Comp1 from './src/AnimatedTabsFadeInDiv.vue'

export const IuAnimatedTabs = withInstall(Comp0)
export default IuAnimatedTabs
export const IuAnimatedTabsFadeInDiv = withInstall(Comp1)

export type { AnimatedTab } from './src/types'
