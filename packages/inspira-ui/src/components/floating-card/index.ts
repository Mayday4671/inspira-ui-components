import { withInstall } from '../../utils'
import Comp from './src/FloatingCard.vue'

export const IuFloatingCard = withInstall(Comp)
export default IuFloatingCard

export type { Props as FloatingCardProps } from './src/FloatingCard.vue'
