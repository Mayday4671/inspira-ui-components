import { withInstall } from '../../utils'
import Comp from './src/ProgressiveBlur.vue'

export const IuProgressiveBlur = withInstall(Comp)
export default IuProgressiveBlur

export type { Props as ProgressiveBlurProps } from './src/ProgressiveBlur.vue'
export type { ProgressiveBlurDirection, ProgressiveBlurProps as ProgressiveBlurProgressiveBlurProps } from './src/types.ts'
