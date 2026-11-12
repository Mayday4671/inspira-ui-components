import { withInstall } from '../../utils'
import Comp0 from './src/Book.vue'
import Comp1 from './src/BookDescription.vue'
import Comp2 from './src/BookHeader.vue'
import Comp3 from './src/BookTitle.vue'

export const IuBook = withInstall(Comp0)
export default IuBook
export const IuBookDescription = withInstall(Comp1)
export const IuBookHeader = withInstall(Comp2)
export const IuBookTitle = withInstall(Comp3)

export type { BookProps } from './src/Book.vue'
export type { BookDescriptionProps } from './src/BookDescription.vue'
export type { BookHeaderProps } from './src/BookHeader.vue'
export type { BookTitleProps } from './src/BookTitle.vue'
export type { BookColor, BookSize, BookRadius, BookShadowSize } from './src/book-maps'
