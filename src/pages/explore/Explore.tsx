/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react'
import {
  HeartOutlined,
  HeartFilled,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { Button, Card, Drawer, List, Space, Typography } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { ethers } from 'ethers'
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlistNfts,
} from 'store/wishlist'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { shortenAddress } from 'utils'
import minAbi from 'utils/minAbi.json'
import InputSearch from 'components/InputSearch'
import Page from 'components/Page'
import './Explore.css'

const { Text, Link } = Typography
const { Meta } = Card

const MORALIS_API_BASE_URL = 'https://deep-index.moralis.io/api/v2'
const NO_IMAGE = 'images/no-img.png'

export const Explore = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [nftData, setNftData] = useState([])

  const wishlist = useAppSelector(selectWishlistNfts)
  const dispatch = useAppDispatch()

  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(ethereum)

  const checkInWishlist = (tokenAddress: string, tokenId: string): boolean => {
    return wishlist.some(
      ({ token_address, token_id }) =>
        token_address === tokenAddress && token_id === tokenId
    )
  }

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

  const showDrawer = (): void => {
    setOpen(true)
  }

  const onClose = (): void => {
    setOpen(false)
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <InputSearch
            placeholder='Type a wallet, contract address, or collection name'
            onChange={(searchValue) => setSearch(searchValue ?? '')}
            isLoading={loading}
          />
          <Button
            type='primary'
            onClick={showDrawer}
            style={{ marginLeft: 24 }}
          >
            Wishlist <HeartOutlined />
          </Button>
        </div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            xl: 4,
          }}
          dataSource={search ? nftData : undefined}
          renderItem={({ image, name, token_address, token_id, token_uri }) => {
            const shortAddress = shortenAddress(token_address)
            const isInWishlist = checkInWishlist(token_address, token_id)
            const wishlistAction = !isInWishlist ? (
              <HeartOutlined
                key='add'
                onClick={() =>
                  dispatch(
                    addToWishlist({
                      image,
                      name,
                      token_address,
                      token_id,
                      token_uri,
                    })
                  )
                }
              />
            ) : (
              <HeartFilled
                key='remove'
                style={{ color: 'red' }}
                onClick={() =>
                  dispatch(
                    removeFromWishlist({
                      token_address,
                      token_id,
                    })
                  )
                }
              />
            )
            return (
              <List.Item>
                <Card
                  style={{
                    width: 200,
                    overflow: 'hidden',
                    border: '1px solid lightgrey',
                    borderRadius: 16,
                  }}
                  cover={
                    <img
                      alt={image ? 'image' : 'no_image'}
                      src={image ?? NO_IMAGE}
                      style={{ height: 200 }}
                    />
                  }
                  hoverable
                  actions={[
                    // <GlobalOutlined
                    //   onClick={() => window.open(token_uri, '_blank')}
                    //   key='website'
                    // />,
                    wishlistAction,
                  ]}
                >
                  <Meta
                    title={name ?? 'Unnamed'}
                    description={
                      <Space direction='vertical'>
                        <Text>{`Token ID: #${token_id as string}`}</Text>
                        <Link
                          href={`https://etherscan.io/address/${
                            token_address as string
                          }`}
                          target='_blank'
                          copyable={{ text: token_address }}
                        >
                          {shortAddress}
                        </Link>
                      </Space>
                    }
                    style={{ justifyContent: 'center' }}
                  />
                </Card>
              </List.Item>
            )
          }}
          style={{ flex: 1, marginTop: 16 }}
        />
      </div>
      <Drawer title='NFTs Wishlist' onClose={onClose} open={open}>
        {wishlist.length ? (
          wishlist.map(({ name, token_address, token_id }) => (
            <div
              key={`${token_address}/${token_id}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <span>{`${name} (#${token_id})`}</span>
              <Button
                type='text'
                icon={<CloseCircleOutlined />}
                onClick={() =>
                  dispatch(
                    removeFromWishlist({
                      token_address,
                      token_id,
                    })
                  )
                }
              />
            </div>
          ))
        ) : (
          <p>No items yet</p>
        )}
      </Drawer>
    </Page>
  )
}
