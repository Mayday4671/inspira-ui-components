import { withInstall } from '../../utils'
import GlareCard from './src/glare-card.vue'

export const IuGlareCard = withInstall(GlareCard)
export default IuGlareCard

export type { GlareCardProps } from './src/glare-card'
