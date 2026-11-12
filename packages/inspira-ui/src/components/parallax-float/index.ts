import { withInstall } from '../../utils'
import Comp0 from './src/ParallaxFloat.vue'
import Comp1 from './src/ParallaxFloatElement.vue'

export const IuParallaxFloat = withInstall(Comp0)
export default IuParallaxFloat
export const IuParallaxFloatElement = withInstall(Comp1)

export type { Props as ParallaxFloatProps } from './src/ParallaxFloat.vue'
export type { ParallaxFloatContext } from './src/ParallaxFloatContext'
export type { Props as ParallaxFloatElementProps } from './src/ParallaxFloatElement.vue'
