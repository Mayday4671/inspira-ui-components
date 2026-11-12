import { withInstall } from '../../utils'
import Comp0 from './src/LogoOrigami.vue'
import Comp1 from './src/LogoOrigamiItem.vue'

export const IuLogoOrigami = withInstall(Comp0)
export default IuLogoOrigami
export const IuLogoOrigamiItem = withInstall(Comp1)

export type { LogoOrigamiProps } from './src/LogoOrigami.vue'
