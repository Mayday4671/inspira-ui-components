import { withInstall } from '../../utils'
import Comp from './src/TextReveal.vue'

export const IuTextReveal = withInstall(Comp)
export default IuTextReveal

export type { Props as TextRevealProps } from './src/TextReveal.vue'
