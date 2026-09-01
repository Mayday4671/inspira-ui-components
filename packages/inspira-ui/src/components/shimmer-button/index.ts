import { withInstall } from '../../utils'
import ShimmerButton from './src/shimmer-button.vue'

export const IuShimmerButton = withInstall(ShimmerButton)
export default IuShimmerButton

export type { ShimmerButtonProps, ShimmerButtonVariant } from './src/shimmer-button'
