import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { setupStore, AppStore, RootState } from 'store'
import { NftMetadata } from 'store/types'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const initialNfts: NftMetadata[] = [
  {
    name: 'Stoic #3236',
    image:
      'https://thestoics.nftmoshpit.com/images/71fca38d6bd9d5d168971ff03cad2427762b0582830a0f4d9b9b2e6c3dff8749.jpg',
    token_address: '0x12632d6e11c6bbc0c53f3e281ea675e5899a5df5',
    token_id: '3236',
    token_uri:
      'https://thestoics.s3.us-east-2.amazonaws.com/reveal_for_real/3236',
  },
  {
    name: 'Stoic #2105',
    image:
      'https://thestoics.nftmoshpit.com/images/3fe3b5172a945db58e39568a691425a67ac8d30af885f00683ec2078645a22a0.jpg',
    token_address: '0x12632d6e11c6bbc0c53f3e281ea675e5899a5df5',
    token_id: '2105',
    token_uri:
      'https://thestoics.s3.us-east-2.amazonaws.com/reveal_for_real/2105',
  },
]
