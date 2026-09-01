export interface AnimatedTooltipItem {
  id: number
  /** 成员名称 */
  name: string
  /** 职位/描述 */
  designation: string
  /** 头像图片地址 */
  image: string
}

export interface AnimatedTooltipProps {
  items: AnimatedTooltipItem[]
}
