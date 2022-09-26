import { configureStore } from '@reduxjs/toolkit'
import wishlistSlice from './wishlist'

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
  },
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
