import { withInstall } from '../../utils'
import TypewriterText from './src/typewriter-text.vue'

export const IuTypewriterText = withInstall(TypewriterText)
export default IuTypewriterText

export type {
  TypewriterTextProps,
  TypewriterCursorAnimationVariants,
} from './src/typewriter-text'
