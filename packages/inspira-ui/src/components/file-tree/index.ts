import { withInstall } from '../../utils'
import Comp0 from './src/Tree.vue'
import Comp1 from './src/Folder.vue'
import Comp2 from './src/File.vue'
import Comp3 from './src/TreeIndicator.vue'

export const IuTree = withInstall(Comp0)
export default IuTree
export const IuFolder = withInstall(Comp1)
export const IuFile = withInstall(Comp2)
export const IuTreeIndicator = withInstall(Comp3)

export type { TreeViewElement, TreeProps, TreeContextProps, BaseItemProps, FolderProps, FileProps } from './src/tree-context.ts'
