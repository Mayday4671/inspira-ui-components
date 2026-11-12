import { withInstall } from '../../utils'
import Comp from './src/DirectionAwareHover.vue'

export const IuDirectionAwareHover = withInstall(Comp)
export default IuDirectionAwareHover

export type { Props as DirectionAwareHoverProps } from './src/DirectionAwareHover.vue'
