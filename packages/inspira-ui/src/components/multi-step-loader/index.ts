import { withInstall } from '../../utils'
import Comp from './src/MultiStepLoader.vue'

export const IuMultiStepLoader = withInstall(Comp)
export default IuMultiStepLoader

export type { Step, Props as MultiStepLoaderProps } from './src/MultiStepLoader.vue'
