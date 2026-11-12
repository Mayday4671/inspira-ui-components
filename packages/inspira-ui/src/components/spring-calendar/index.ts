import { withInstall } from '../../utils'
import Comp0 from './src/SpringCalendar.vue'
import Comp1 from './src/TextMorph.vue'

export const IuSpringCalendar = withInstall(Comp0)
export default IuSpringCalendar
export const IuTextMorph = withInstall(Comp1)

export type { CalendarEvent, CalendarDay } from './src/SpringCalendar.vue'
export type { Props as TextMorphProps } from './src/TextMorph.vue'
