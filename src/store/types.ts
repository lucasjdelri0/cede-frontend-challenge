export interface NftTokenInfo {
  token_address: string
  token_id: string
}

export interface NftMetadata {
  image: string
  name: string
  token_address: string
  token_id: string
  token_uri: string
}

export interface WishlistState {
  nfts: NftMetadata[]
}
