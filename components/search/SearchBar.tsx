'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function SearchBar({
  placeholder = 'Search hotel, restaurant, company...',
  size = 'lg',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/find?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const sizeClasses = {
    sm: 'py-2 text-sm placeholder:text-xs',
    md: 'py-3 text-base placeholder:text-sm',
    lg: 'py-4 text-base placeholder:text-sm',
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${sizeClasses[size]} pl-4 pr-4 rounded-full focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all bg-white border-4 border-gray-300 placeholder-gray-300`}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-full font-semibold transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  )
}
