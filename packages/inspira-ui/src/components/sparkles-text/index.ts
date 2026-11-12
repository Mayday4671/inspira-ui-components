import { withInstall } from '../../utils'
import Comp from './src/SparklesText.vue'

export const IuSparklesText = withInstall(Comp)
export default IuSparklesText

export type { Sparkle, Props as SparklesTextProps } from './src/SparklesText.vue'
