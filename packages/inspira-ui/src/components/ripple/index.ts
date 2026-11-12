import { withInstall } from '../../utils'
import Comp from './src/Ripple.vue'

export const IuRipple = withInstall(Comp)
export default IuRipple

export type { Props as RippleProps } from './src/Ripple.vue'
