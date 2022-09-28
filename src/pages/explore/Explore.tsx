/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import axios, { AxiosResponse } from 'axios'
import Page from 'components/Page'
import SearchInput from 'components/SearchInput'
import NftList from 'components/NftList'
import { WishlistDrawer } from 'components/wishlist/WishlistDrawer/WishlistDrawer'
import { selectWishlistNfts } from 'store/wishlist'
import { useAppSelector } from 'store/hooks'
import { NftMetadata } from 'store/types'
import { getFetchUrl } from 'utils/api'
import './Explore.css'

export const Explore = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [nfts, setNfts] = useState<NftMetadata[]>([])

  const wishlist = useAppSelector(selectWishlistNfts)

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        const response = await fetchNfts(search)
        setNfts(response.data.result)
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
      const FETCH_URL = await getFetchUrl(searchValue)
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

  const showDrawer = (): void => {
    setOpen(true)
  }

  const onCloseDrawer = (): void => {
    setOpen(false)
  }

  return (
    <Page>
      <div
        className='my-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '0 24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='primary'
            onClick={showDrawer}
            style={{ marginLeft: 24 }}
          >
            <HeartOutlined />
            Wishlist
          </Button>
        </div>
        <span style={{ margin: '16px 0' }}>
          Search NFTs by wallet, contract address, or collection name
        </span>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchInput
            placeholder='Type a wallet, contract address, or collection name'
            onChange={(searchValue) => setSearch(searchValue ?? '')}
            loading={loading}
          />
        </div>
        <NftList nfts={nfts} wishlist={wishlist} loading={loading} />
      </div>
      <WishlistDrawer
        title='My Favorite NFTs'
        open={open}
        nfts={wishlist}
        onClose={onCloseDrawer}
      />
    </Page>
  )
}
