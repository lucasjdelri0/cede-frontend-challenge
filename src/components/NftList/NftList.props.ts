import { NftMetadata } from 'store/types'

export interface NftListProps {
  nfts: NftMetadata[]
  wishlist: NftMetadata[]
  loading?: boolean
}
