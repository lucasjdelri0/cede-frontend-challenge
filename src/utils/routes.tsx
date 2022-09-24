import { HomeOutlined, WalletOutlined } from '@ant-design/icons'
import { MyRoutes } from 'layout/Primary/Header/Header.props'

export const routes: MyRoutes = [
  { path: '/', heading: 'My Home', title: 'Home', icon: <HomeOutlined /> },
  {
    path: '/explore',
    heading: 'My Explore',
    title: 'Explore',
    icon: <WalletOutlined />,
  },
]
