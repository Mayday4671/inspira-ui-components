import { withInstall } from '../../utils'
import Comp0 from './src/DitherShader.vue'

export const IuDitherShader = withInstall(Comp0)
export default IuDitherShader

export type { DitheringMode, ColorMode, Props as DitherShaderProps } from './src/DitherShader.vue'
