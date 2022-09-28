import { NftMetadata } from 'store/types'

export interface WishlistDrawerProps {
  title?: string
  open?: boolean
  nfts?: NftMetadata[]
  onClose?: () => void
}
