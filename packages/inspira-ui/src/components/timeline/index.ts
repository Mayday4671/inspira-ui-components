import { withInstall } from '../../utils'
import Comp from './src/Timeline.vue'

export const IuTimeline = withInstall(Comp)
export default IuTimeline

export type { Props as TimelineProps } from './src/Timeline.vue'
