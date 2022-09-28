import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SearchInput from '.'

const placeholder = 'Type a wallet, contract address, or collection name'

test('SearchInput default content', () => {
  const component = render(<SearchInput placeholder={placeholder} />)
  component.getByPlaceholderText(placeholder)
})

test('Typing in the input calls event handler once', () => {
  const mockHandler = jest.fn()
  const component = render(
    <SearchInput placeholder={placeholder} onChange={mockHandler} />
  )
  const input = component.getByPlaceholderText(placeholder)
  fireEvent.change(input, { target: { value: 'ab' } })
  expect(mockHandler.mock.calls).toHaveLength(1)
})
