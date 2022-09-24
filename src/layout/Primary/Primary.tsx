import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Breadcrumb, Layout as AntLayout } from 'antd'
import { BellOutlined, HomeOutlined } from '@ant-design/icons'
import Header from 'layout/Primary/Header'
import './Primary.css'
import { routes } from 'utils/routes'

const { Content, Footer } = AntLayout

export const Primary = (): JSX.Element => {
  const location = useLocation()
  const current = routes.find(({ path }) => path === location.pathname)
  const breadcrumb = current?.title ?? 'Home'

  return (
    <AntLayout style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Header
        repoHref='https://github.com/lucasjdelri0/cede-frontend-challenge'
        avatarImageSrc='https://joeschmoe.io/api/v1/joe'
        badgeCount={7}
        badgeIcon={<BellOutlined />}
        routes={routes}
        selectedKeys={[current?.path ?? '/']}
        backgroundColor='white'
      />
      <Content
        className='site-layout'
        style={{ padding: '0 48px', display: 'flex', flexDirection: 'column' }}
      >
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            {current?.icon ?? <HomeOutlined />} {breadcrumb}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div
          className='site-layout-background'
          style={{ padding: 24, flex: 1 }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        CEDE Labs Frontend Challenge (2022)
      </Footer>
    </AntLayout>
  )
}
