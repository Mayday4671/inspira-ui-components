import { withInstall } from '../../utils'
import Comp from './src/Lens.vue'

export const IuLens = withInstall(Comp)
export default IuLens

export type { LensProps } from './src/Lens.vue'
