/* eslint-disable @typescript-eslint/naming-convention */
import { List } from 'antd'
import NftCard from 'components/NftCard'
import { NftListProps } from './NftList.props'

export const NftList = ({
  nfts,
  wishlist,
  loading = false,
}: NftListProps): JSX.Element => {
  const checkInWishlist = (tokenAddress: string, tokenId: string): boolean => {
    return wishlist.some(
      ({ token_address, token_id }) =>
        token_address === tokenAddress && token_id === tokenId
    )
  }

  return (
    <List
      grid={{
        gutter: 16,
      }}
      dataSource={nfts ?? undefined}
      // dataSource={search ? nftData : undefined}
      pagination={{
        pageSize: 24,
        position: 'bottom',
        style: {
          marginBottom: 16,
        },
        total: nfts.length,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        showSizeChanger: false,
      }}
      loading={loading}
      renderItem={(nft) => {
        const { token_address, token_id } = nft
        return (
          <List.Item>
            <NftCard
              nft={nft}
              inWishlist={checkInWishlist(token_address, token_id)}
            />
          </List.Item>
        )
      }}
      className='my-list'
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginTop: 16,
      }}
    />
  )
}
