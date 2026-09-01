import { withInstall } from '../../utils'
import Statistic from './src/statistic.vue'

export const IuStatistic = withInstall(Statistic)
export default IuStatistic

export type { StatisticProps } from './src/statistic'
