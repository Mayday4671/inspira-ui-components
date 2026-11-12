import { withInstall } from '../../utils'
import Comp0 from './src/GithubGlobe.vue'

export const IuGithubGlobe = withInstall(Comp0)
export default IuGithubGlobe

export type { Position as GithubGlobePosition, GlobeData, GlobeConfig, Props as GithubGlobeProps } from './src/GithubGlobe.vue'
