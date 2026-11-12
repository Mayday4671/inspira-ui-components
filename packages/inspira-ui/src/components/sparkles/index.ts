import { withInstall } from '../../utils'
import Comp from './src/Sparkles.vue'

export const IuSparkles = withInstall(Comp)
export default IuSparkles

export type { Props as SparklesProps } from './src/Sparkles.vue'
