import { withInstall } from '../../utils'
import Comp from './src/EncryptedText.vue'

export const IuEncryptedText = withInstall(Comp)
export default IuEncryptedText

export type { Props as EncryptedTextProps } from './src/EncryptedText.vue'
