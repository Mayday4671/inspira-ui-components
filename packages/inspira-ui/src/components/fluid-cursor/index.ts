import { withInstall } from '../../utils'
import Comp0 from './src/FluidCursor.vue'

export const IuFluidCursor = withInstall(Comp0)
export default IuFluidCursor

export type { ColorRGB, Props as FluidCursorProps, Pointer, FBO, DoubleFBO } from './src/FluidCursor.vue'
