import { withInstall } from '../../utils'
import Comp from './src/UnderlineText.vue'

export const IuUnderlineText = withInstall(Comp)
export default IuUnderlineText

export type { Props as UnderlineTextProps, UnderlineTextVariant, UnderlineTextDirection } from './src/UnderlineText.vue'
