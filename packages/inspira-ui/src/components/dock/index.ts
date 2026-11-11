import { withInstall } from '../../utils'
import Comp0 from './src/Dock.vue'
import Comp1 from './src/DockIcon.vue'
import Comp2 from './src/DockSeparator.vue'

export const IuDock = withInstall(Comp0)
export default IuDock
export const IuDockIcon = withInstall(Comp1)
export const IuDockSeparator = withInstall(Comp2)
