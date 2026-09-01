import { withInstall } from '../../utils'
import FlipCard from './src/flip-card.vue'

export const IuFlipCard = withInstall(FlipCard)
export default IuFlipCard

export type { FlipCardProps } from './src/flip-card'
