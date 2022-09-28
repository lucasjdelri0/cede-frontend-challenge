import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SearchInput from '.'

test('render content', () => {
  const component = render(<SearchInput placeholder='My search input' />)
  component.getByLabelText('search-input')
  component.getByPlaceholderText('My search input')
})

test('clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()
  const component = render(<SearchInput onChange={mockHandler} />)
  const input = component.getByLabelText('search-input')
  fireEvent.change(input, { target: { value: 'a' } })
  expect(mockHandler.mock.calls).toHaveLength(1)
})
