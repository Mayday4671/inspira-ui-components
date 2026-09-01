import { withInstall } from '../../utils'
import PatternBackground from './src/pattern-background.vue'

export const IuPatternBackground = withInstall(PatternBackground)
export default IuPatternBackground

export {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_VARIANT,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_MASK,
  type PatternBackgroundDirection,
} from './src/pattern-background'

export type {
  PatternBackgroundProps,
  PatternBackgroundVariants,
  PatternBackgroundMaskVariants,
} from './src/pattern-background'
