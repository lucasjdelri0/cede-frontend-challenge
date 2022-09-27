/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { NftMetadata, NftTokenInfo, WishlistState } from './types'

const initialState: WishlistState = {
  nfts: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<NftMetadata>) {
      state.nfts = [...state.nfts, action.payload]
    },
    removeFromWishlist(state, action: PayloadAction<NftTokenInfo>) {
      const filtered = state.nfts.filter(
        ({ token_address, token_id }) =>
          token_address !== action.payload.token_address ||
          token_id !== action.payload.token_id
      )
      state.nfts = filtered
    },
  },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions

export const selectWishlistNfts = (state: RootState): NftMetadata[] =>
  state.wishlist.nfts

export default wishlistSlice.reducer
