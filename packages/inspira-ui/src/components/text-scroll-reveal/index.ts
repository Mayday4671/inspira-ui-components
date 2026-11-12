import { withInstall } from '../../utils'
import Comp0 from './src/TextScrollReveal.vue'
import Comp1 from './src/ScrollWord.vue'

export const IuTextScrollReveal = withInstall(Comp0)
export default IuTextScrollReveal
export const IuScrollWord = withInstall(Comp1)

export type { Props as ScrollWordProps } from './src/ScrollWord.vue'
export type { Props as TextScrollRevealProps } from './src/TextScrollReveal.vue'
