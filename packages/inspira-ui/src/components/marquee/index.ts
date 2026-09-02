import { withInstall } from '../../utils'
import Marquee from './src/marquee.vue'

export const IuMarquee = withInstall(Marquee)
export default IuMarquee

export type { MarqueeProps, MarqueeItem, MarqueeObjectItem } from './src/marquee'
