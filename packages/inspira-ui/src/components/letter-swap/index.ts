import { withInstall } from '../../utils'
import Comp from './src/LetterSwap.vue'

export const IuLetterSwap = withInstall(Comp)
export default IuLetterSwap

export type { AnimationMode, StaggerOrigin as LetterSwapStaggerOrigin, Props as LetterSwapProps } from './src/LetterSwap.vue'
