import { withInstall } from '../../utils'
import AnimatedTooltip from './src/animated-tooltip.vue'

export const IuAnimatedTooltip = withInstall(AnimatedTooltip)
export default IuAnimatedTooltip

export type { AnimatedTooltipProps, AnimatedTooltipItem } from './src/animated-tooltip'
