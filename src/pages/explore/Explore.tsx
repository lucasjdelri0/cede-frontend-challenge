import { HeartOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { ethers } from 'ethers'
import minAbi from 'utils/minAbi.json'
import InputSearch from 'components/InputSearch'
import Page from 'components/Page'
import { useEffect, useState } from 'react'
import './Explore.css'

const { Meta } = Card

const MORALIS_API_BASE_URL = 'https://deep-index.moralis.io/api/v2'
const NO_IMAGE = 'images/no-img.png'

export const Explore = (): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [nftData, setNftData] = useState([])

  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(ethereum)

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        const response = await fetchNfts(search)
        setNftData(response.data.result)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    const fetchNfts = async (
      searchValue: string
    ): Promise<AxiosResponse<any, any>> => {
      const config = {
        headers: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          'X-API-Key': `${process.env.REACT_APP_NFT_API}`,
        },
      }
      const FETCH_URL = await getUrl(searchValue)
      const response = await axios(FETCH_URL, config)
      for (const nft of response.data.result) {
        const metadata = JSON.parse(nft.metadata)
        nft.name = metadata?.name
        nft.image = metadata?.image
      }
      return response
    }

    if (search && search.length > 2) {
      setLoading(true)
      const timeoutId = setTimeout(fetch, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [search])

  const getUrl = async (searchValue: string): Promise<string> => {
    // getWalletNFTs
    const walletUrl = `${MORALIS_API_BASE_URL}/${searchValue}/nft?chain=eth&format=decimal`
    // getContractNFTs
    const contractUrl = `${MORALIS_API_BASE_URL}/nft/${searchValue}?chain=eth&format=decimal&limit=50`
    // searchNFTs
    const searchUrl = `${MORALIS_API_BASE_URL}/nft/search?chain=eth&format=decimal&q=${encodeURIComponent(
      searchValue
    )}&filter=global&limit=50`

    if (ethers.utils.isAddress(searchValue)) {
      const address = ethers.utils.getAddress(searchValue)
      let isContract = true
      try {
        const contract = new ethers.Contract(address, minAbi, provider)
        await contract.symbol()
      } catch {
        isContract = false
      }
      return isContract ? contractUrl : walletUrl
    } else {
      return searchUrl
    }
  }

  return (
    <Page>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '0 24px',
        }}
      >
        <span style={{ marginBottom: 16 }}>
          Search NFTs by wallet, contract address, or collection name
        </span>
        <InputSearch
          placeholder='Type a wallet, contract address, or collection name'
          onChange={(searchValue) => setSearch(searchValue ?? '')}
          isLoading={loading}
        />
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            xl: 4,
          }}
          dataSource={search ? nftData : undefined}
          // eslint-disable-next-line @typescript-eslint/naming-convention
          renderItem={({ name, token_id, token_uri, image }) => (
            <List.Item>
              <Card
                style={{ width: 200 }}
                cover={
                  <img
                    alt='example'
                    src={image ?? NO_IMAGE}
                    style={{ minHeight: 200 }}
                  />
                }
                hoverable
                actions={[
                  <HeartOutlined
                    key='add'
                    onClick={() => console.log('added to wishlist')}
                  />,
                ]}
              >
                <Meta title={name} description={`#${token_id as string}`} />
              </Card>
            </List.Item>
          )}
          style={{ marginTop: 16 }}
        />
      </div>
    </Page>
  )
}
