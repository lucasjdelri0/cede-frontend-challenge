import { ReactNode } from 'react'
import { AppRoutes } from 'utils/routes'

export interface HeaderProps {
  backgroundColor?: string
  tabColor?: string
  repoHref?: string
  selectedKeys?: string[]
  routes?: AppRoutes
  badgeCount?: number
  badgeIcon?: ReactNode
  avatarImageSrc?: string
}
