import { withInstall } from '../../utils'
import Comp0 from './src/Tetris.vue'

export const IuTetris = withInstall(Comp0)
export default IuTetris

export type { Props as TetrisProps } from './src/Tetris.vue'
