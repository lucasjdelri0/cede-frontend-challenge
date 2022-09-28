/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Drawer } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useAppDispatch } from 'store/hooks'
import { removeFromWishlist } from 'store/wishlist'
import { WishlistDrawerProps } from './WishlistDrawer.props'

export const WishlistDrawer = ({
  title = 'My Wishlist',
  open,
  nfts,
  onClose,
}: WishlistDrawerProps): JSX.Element => {
  const dispatch = useAppDispatch()
  return (
    <Drawer title={title} onClose={onClose} open={open}>
      {nfts?.length ? (
        nfts.map(({ name, token_address, token_id }) => (
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
  )
}
