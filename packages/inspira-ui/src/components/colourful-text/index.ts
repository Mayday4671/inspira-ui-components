import { withInstall } from '../../utils'
import Comp from './src/ColourfulText.vue'

export const IuColourfulText = withInstall(Comp)
export default IuColourfulText

export type { Props as ColourfulTextProps } from './src/ColourfulText.vue'
