import { Button, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Page from 'components/Page'

const { Title, Link, Paragraph } = Typography

export const Home = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <Page>
      <Title level={2}>CEDE Labs Challenge</Title>
      <Paragraph>
        This project is intended to solve the{' '}
        <Link
          href='https://github.com/CeDe-Keyper/frontend-challenge'
          target='_blank'
        >
          frontend challenge
        </Link>{' '}
        proposed by CEDE Labs.
      </Paragraph>
      <Paragraph>
        You will be able to explore NFTs by wallet address, contract address, or
        even by typing collection names, and you can save them to your own
        wishlist.
      </Paragraph>
      <div>
        <img alt='home' src='images/home.png' style={{ width: 300 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button type='primary' onClick={() => navigate('/explore')}>
          <SearchOutlined /> Explore NFTs
        </Button>
      </div>
    </Page>
  )
}
