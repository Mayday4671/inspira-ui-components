import { withInstall } from '../../utils'
import Comp from './src/MorphingText.vue'

export const IuMorphingText = withInstall(Comp)
export default IuMorphingText

export type { Props as MorphingTextProps } from './src/MorphingText.vue'
