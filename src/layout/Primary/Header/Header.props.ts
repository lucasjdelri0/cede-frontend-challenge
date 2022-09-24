import { ReactNode } from 'react'

export interface Route {
  path: string
  heading: string
  title: string
  icon: ReactNode
}

export type MyRoutes = Route[]

export interface HeaderProps {
  backgroundColor?: string
  tabColor?: string
  repoHref?: string
  selectedKeys?: string[]
  routes?: MyRoutes
  badgeCount?: number
  badgeIcon?: ReactNode
  avatarImageSrc?: string
}
