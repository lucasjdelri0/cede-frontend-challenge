import { ReactNode } from 'react'
import { HomeOutlined, SearchOutlined } from '@ant-design/icons'

export interface Route {
  path: string
  title: string
  icon: ReactNode
}

export type AppRoutes = Route[]

export const routes: AppRoutes = [
  { path: '/', title: 'Home', icon: <HomeOutlined /> },
  {
    path: '/explore',
    title: 'Explore',
    icon: <SearchOutlined />,
  },
]
