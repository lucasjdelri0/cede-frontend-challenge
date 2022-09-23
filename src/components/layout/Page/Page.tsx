import { Breadcrumb, Layout } from 'antd'
import { BellOutlined, HomeOutlined } from '@ant-design/icons'
import Header from 'components/layout/Header'
import { PageProps } from './Page.props'
import './Page.css'

const { Content, Footer } = Layout

export const Page = (props: PageProps): JSX.Element => (
  <Layout>
    <Header
      repoHref='https://github.com/lucasjdelri0/cede-frontend-challenge'
      avatarImageSrc='https://joeschmoe.io/api/v1/random'
      badgeCount={7}
      badgeIcon={<BellOutlined />}
    />
    <Content className='site-layout' style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <HomeOutlined /> <a href='/'>Home</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className='site-layout-background' style={{ padding: 24 }}>
        {props.children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      CEDE Labs Frontend Challenge (2022)
    </Footer>
  </Layout>
)
