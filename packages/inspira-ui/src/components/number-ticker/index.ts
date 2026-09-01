import { withInstall } from '../../utils'
import NumberTicker from './src/number-ticker.vue'

export const IuNumberTicker = withInstall(NumberTicker)
export default IuNumberTicker

export type { NumberTickerProps, TransitionPresetKey } from './src/number-ticker'
