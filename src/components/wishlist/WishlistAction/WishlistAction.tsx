/* eslint-disable @typescript-eslint/naming-convention */
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useAppDispatch } from 'store/hooks'
import { addToWishlist, removeFromWishlist } from 'store/wishlist'
import { WishlistActionProps } from './WishlistAction.props'

export const WishlistAction = ({
  nft,
  isInWishlist,
}: WishlistActionProps): JSX.Element => {
  const { image, name, token_address, token_id, token_uri } = nft
  const dispatch = useAppDispatch()

  return !isInWishlist ? (
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
}
