import React from 'react'
import { Input } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'

const SearchInput = ({
  placeholder,
  onChange,
  isLoading = false,
}: {
  placeholder?: string
  onChange: (value?: string) => void
  isLoading: boolean
}): JSX.Element => {
  const handleChange = (search: string): void => {
    onChange(search)
  }

  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      prefix={isLoading ? <LoadingOutlined /> : <SearchOutlined />}
      allowClear
    />
  )
}

export default SearchInput
