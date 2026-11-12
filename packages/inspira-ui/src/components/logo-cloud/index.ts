import { withInstall } from '../../utils'
import Comp0 from './src/AnimatedLogoCloud.vue'
import Comp1 from './src/IconLogoCloud.vue'
import Comp2 from './src/StaticLogoCloud.vue'

export const IuAnimatedLogoCloud = withInstall(Comp0)
export default IuAnimatedLogoCloud
export const IuIconLogoCloud = withInstall(Comp1)
export const IuStaticLogoCloud = withInstall(Comp2)

export type { Logo, AnimateLogoCloudProps } from './src/logo-cloud-types'
