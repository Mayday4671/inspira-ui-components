import { withInstall } from '../../utils'
import Comp0 from './src/HighlightText.vue'

export const IuHighlightText = withInstall(Comp0)
export default IuHighlightText

export type { HighlightDirection, HighlightTrigger, Props as HighlightTextProps } from './src/HighlightText.vue'
