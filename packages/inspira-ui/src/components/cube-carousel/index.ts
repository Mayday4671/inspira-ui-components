import { withInstall } from '../../utils'
import Comp0 from './src/CubeCarousel.vue'

export const IuCubeCarousel = withInstall(Comp0)
export default IuCubeCarousel

export type { CubeCarouselItem, CubeCarouselDirection, CubeCarouselSpringConfig, CubeCarouselRef, Props as CubeCarouselProps } from './src/CubeCarousel.vue'
