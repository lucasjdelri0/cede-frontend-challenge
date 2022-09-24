import { Breadcrumb, Layout } from 'antd'
import { BellOutlined, HomeOutlined } from '@ant-design/icons'
import Header from 'layout/Primary/Header'
import { PageProps } from './Page.props'
import './Page.css'

const { Content, Footer } = Layout

export const Page = (props: PageProps): JSX.Element => (
  <div className='site-layout-background' style={{ padding: 24 }}>
    {props.children}
  </div>
)
