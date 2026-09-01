import { withInstall } from '../../utils'
import GradientButton from './src/gradient-button.vue'

export const IuGradientButton = withInstall(GradientButton)
export default IuGradientButton

export type { GradientButtonProps, GradientButtonVariant } from './src/gradient-button'
