import { withInstall } from '../../utils'
import FlipWords from './src/flip-words.vue'

export const IuFlipWords = withInstall(FlipWords)
export default IuFlipWords

export type { FlipWordsProps } from './src/flip-words'
