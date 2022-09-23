import { ReactNode } from 'react'

export interface Route {
  path: string
  title: string
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
