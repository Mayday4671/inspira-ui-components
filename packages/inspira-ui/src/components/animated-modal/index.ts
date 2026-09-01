import { withInstall, withInstallCompound } from '../../utils'
import AnimatedModal from './src/animated-modal.vue'
import AnimatedModalBody from './src/animated-modal-body.vue'
import AnimatedModalContent from './src/animated-modal-content.vue'
import AnimatedModalFooter from './src/animated-modal-footer.vue'
import AnimatedModalTrigger from './src/animated-modal-trigger.vue'

/** 单独 use 时会同时注册 Trigger / Body / Content / Footer 子组件 */
export const IuAnimatedModal = withInstallCompound(
  AnimatedModal,
  AnimatedModalTrigger,
  AnimatedModalBody,
  AnimatedModalContent,
  AnimatedModalFooter,
)
export const IuAnimatedModalTrigger = withInstall(AnimatedModalTrigger)
export const IuAnimatedModalBody = withInstall(AnimatedModalBody)
export const IuAnimatedModalContent = withInstall(AnimatedModalContent)
export const IuAnimatedModalFooter = withInstall(AnimatedModalFooter)

export { useAnimatedModal } from './use-animated-modal'
export type { AnimatedModalContext } from './src/context'
export type {
  AnimatedModalProps,
  AnimatedModalBodyProps,
  AnimatedModalContentProps,
  AnimatedModalFooterProps,
  AnimatedModalTriggerProps,
} from './src/modal-types'
