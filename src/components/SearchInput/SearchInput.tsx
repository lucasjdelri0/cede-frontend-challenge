import { Input } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import { SearchInputProps } from './SearchInput.props'

export const SearchInput = ({
  placeholder,
  onChange,
  loading = false,
}: SearchInputProps): JSX.Element => {
  const handleChange = (search: string): void => {
    onChange?.(search)
  }

  return (
    <Input
      aria-label={placeholder}
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      prefix={loading ? <LoadingOutlined /> : <SearchOutlined />}
      allowClear
      style={{ minWidth: 100, maxWidth: 400 }}
    />
  )
}
