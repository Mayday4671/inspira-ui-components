import { withInstall } from '../../utils'
import Comp0 from './src/FeyCards.vue'

export const IuFeyCards = withInstall(Comp0)
export default IuFeyCards

export type { HeroCard, SpringConfig as FeyCardsSpringConfig, Props as FeyCardsProps } from './src/FeyCards.vue'
