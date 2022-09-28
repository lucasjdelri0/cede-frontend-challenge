import { ReactNode } from 'react'
import { NftMetadata } from 'store/types'

export interface WishlistDrawerProps {
  title?: string
  emptyState?: ReactNode
  open?: boolean
  nfts?: NftMetadata[]
  onClose?: () => void
}
