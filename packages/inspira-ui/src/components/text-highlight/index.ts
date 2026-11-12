import { withInstall } from '../../utils'
import Comp from './src/TextHighlight.vue'

export const IuTextHighlight = withInstall(Comp)
export default IuTextHighlight

export type { Props as TextHighlightProps } from './src/TextHighlight.vue'
