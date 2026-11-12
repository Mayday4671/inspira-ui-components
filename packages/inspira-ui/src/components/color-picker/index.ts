import { withInstall } from '../../utils'
import Comp0 from './src/ColorPicker.vue'
import Comp1 from './src/ContrastRatio.vue'
import Comp2 from './src/ObjectColorInput.vue'

export const IuColorPicker = withInstall(Comp0)
export default IuColorPicker
export const IuContrastRatio = withInstall(Comp1)
export const IuObjectColorInput = withInstall(Comp2)

export type { ColorPickerValue, ColorPickerProps } from './src/ColorPicker.vue'
export type { ContrastRatioProps } from './src/ContrastRatio.vue'
export type { ObjectColorInputProps } from './src/ObjectColorInput.vue'
