import { withInstall } from '../../utils'
import Comp0 from './src/ShaderToy.vue'

export const IuShaderToy = withInstall(Comp0)
export default IuShaderToy

export type { ShaderConfig, ShaderUniformValue as ShaderToyShaderUniformValue, ShaderUniforms as ShaderToyShaderUniforms, MouseState, HSVControls, MouseMode } from './src/InspiraShaderToy.ts'
export type { NoiseConfig, Props as ShaderToyProps } from './src/ShaderToy.vue'
