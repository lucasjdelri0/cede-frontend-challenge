/* eslint-disable @typescript-eslint/naming-convention */
import Icon, { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useAppDispatch } from 'store/hooks'
import { addToWishlist, removeFromWishlist } from 'store/wishlist'
import { WishlistActionProps } from './WishlistAction.props'

export const WishlistAction = ({
  nft,
  isInWishlist = false,
}: WishlistActionProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const { image, name, token_address, token_id, token_uri } = nft
  const HeartIcon = !isInWishlist ? HeartOutlined : HeartFilled
  const iconColor = isInWishlist ? 'red' : ''

  return (
    <Icon
      aria-label={!isInWishlist ? 'Add to wishlist' : 'Remove from wishlist'}
      key={!isInWishlist ? 'add' : 'remove'}
      component={HeartIcon as React.ForwardRefExoticComponent<any>}
      style={{ color: iconColor }}
      onClick={() =>
        dispatch(
          !isInWishlist
            ? addToWishlist({
                image,
                name,
                token_address,
                token_id,
                token_uri,
              })
            : removeFromWishlist({
                token_address,
                token_id,
              })
        )
      }
    />
  )
}
