/* eslint-disable @typescript-eslint/naming-convention */
import { Card, Space, Typography } from 'antd'
import WishlistAction from 'components/wishlist/WishlistAction'
import { shortenAddress } from 'utils'
import { NftCardProps } from './NftCard.props'

const { Text, Link } = Typography
const { Meta } = Card

const NO_IMAGE = 'images/no-img.png'

export const NftCard = ({
  nft,
  inWishlist = false,
}: NftCardProps): JSX.Element => {
  const { image, name, token_address, token_id } = nft
  const shortAddress = shortenAddress(token_address)

  return (
    <Card
      className='my-card'
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
        <WishlistAction nft={nft} isInWishlist={inWishlist} key='wishlist' />,
      ]}
    >
      <Meta
        title={name ?? 'Unnamed'}
        description={
          <Space direction='vertical'>
            <Text>{`Token ID: #${token_id}`}</Text>
            <Link
              href={`https://etherscan.io/address/${token_address}`}
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
  )
}
