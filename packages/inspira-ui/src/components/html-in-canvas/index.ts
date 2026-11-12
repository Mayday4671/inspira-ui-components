import { withInstall } from '../../utils'
import Comp0 from './src/HtmlInCanvas.vue'

export const IuHtmlInCanvas = withInstall(Comp0)
export default IuHtmlInCanvas

export type { PaintableCanvas, ElementImageContext, SelectionRect, Props as HtmlInCanvasProps } from './src/HtmlInCanvas.vue'
export type { ShaderUniformValue as HtmlInCanvasShaderUniformValue, ShaderUniforms as HtmlInCanvasShaderUniforms } from './src/HtmlInCanvasRenderer'
