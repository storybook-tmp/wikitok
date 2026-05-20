import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

export const SearchInput = ({
  onSearch,
  placeholder = 'Search...',
  value: initialValue = '',
  disabled = false,
}: SearchInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
