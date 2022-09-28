/* eslint-disable @typescript-eslint/naming-convention */
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import { initialNfts, renderWithProviders } from 'utils/testUtils'
import WishlistDrawer from '.'

test('Wishlist should be empty', () => {
  const emptyLabel = 'No items in wishlist'
  renderWithProviders(<WishlistDrawer open={true} emptyState={emptyLabel} />)
  expect(screen.getByText(emptyLabel)).toBeInTheDocument()
})

test('Wishlist should contain NFTs', () => {
  renderWithProviders(<WishlistDrawer open={true} nfts={initialNfts} />)
  for (const nft of initialNfts) {
    expect(
      screen.getByText(`${nft.name} (#${nft.token_id})`)
    ).toBeInTheDocument()
  }
})
