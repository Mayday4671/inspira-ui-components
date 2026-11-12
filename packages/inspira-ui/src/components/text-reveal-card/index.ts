import { withInstall } from '../../utils'
import Comp0 from './src/TextRevealCard.vue'
import Comp1 from './src/TextRevealStars.vue'

export const IuTextRevealCard = withInstall(Comp0)
export default IuTextRevealCard
export const IuTextRevealStars = withInstall(Comp1)

export type { Props as TextRevealCardProps } from './src/TextRevealCard.vue'
export type { Props as TextRevealStarsProps } from './src/TextRevealStars.vue'
