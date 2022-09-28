import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import { initialNfts, renderWithProviders } from 'utils/testUtils'
import NftList from '.'

test('NftList empty state', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
  renderWithProviders(<NftList nfts={[]} wishlist={[]} />)
  expect(screen.getByText('No Data')).toBeInTheDocument()
  expect(screen.getByText('0-0 of 0')).toBeInTheDocument()
})

test('NftList should contain NFTs', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
  const total = initialNfts.length
  const component = renderWithProviders(
    <NftList nfts={initialNfts} wishlist={[]} />
  )
  expect(component.container.querySelectorAll('img').length).toBe(
    initialNfts.length
  )
  expect(screen.getByText(`1-${total} of ${total}`)).toBeInTheDocument()
})
