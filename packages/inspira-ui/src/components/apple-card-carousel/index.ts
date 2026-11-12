import { withInstall } from '../../utils'
import Comp0 from './src/AppleCardCarousel.vue'
import Comp1 from './src/AppleCarouselItem.vue'
import Comp2 from './src/AppleCard.vue'
import Comp3 from './src/AppleBlurImage.vue'

export const IuAppleCardCarousel = withInstall(Comp0)
export default IuAppleCardCarousel
export const IuAppleCarouselItem = withInstall(Comp1)
export const IuAppleCard = withInstall(Comp2)
export const IuAppleBlurImage = withInstall(Comp3)

export type { Props as AppleBlurImageProps } from './src/AppleBlurImage.vue'
export type { Card, Props as AppleCardProps } from './src/AppleCard.vue'
export type { Props as AppleCardCarouselProps } from './src/AppleCardCarousel.vue'
export type { CarouselContextType } from './src/AppleCarouselContext.ts'
export type { Props as AppleCarouselItemProps } from './src/AppleCarouselItem.vue'
