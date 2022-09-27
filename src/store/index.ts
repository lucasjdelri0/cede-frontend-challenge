import { configureStore } from '@reduxjs/toolkit'
import wishlistSlice from './wishlist'

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
