import { withInstall } from '../../utils'
import Dialog from './src/dialog.vue'

export const IuDialog = withInstall(Dialog)
export default IuDialog

export type {
  DialogProps,
  DialogConfirmHandler,
  DialogBeforeClose,
  DialogExposes,
} from './src/dialog-types'
