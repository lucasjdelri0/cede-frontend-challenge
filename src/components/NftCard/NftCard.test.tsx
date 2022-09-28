import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import { initialNfts, renderWithProviders } from 'utils/testUtils'
import NftCard from '.'

test('NftCard renders NFT info', () => {
  const nft = initialNfts[0]
  const component = renderWithProviders(<NftCard nft={nft} />)
  expect(screen.getByText(nft.name)).toBeInTheDocument()
  expect(screen.getByText(`Token ID: #${nft.token_id}`)).toBeInTheDocument()
  expect(component.container.querySelector('img')).toBeInTheDocument()
  expect(component.container.querySelector('svg')).toBeInTheDocument()
})
