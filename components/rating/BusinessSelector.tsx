'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/client'

interface Business {
  id: string
  name: string
  category: string
  location: string | null
  overall_rating: number | null
  total_ratings: number
  is_gsi_member: boolean
}

interface BusinessSelectorProps {
  onSelect: (business: Business) => void
}

export default function BusinessSelector({ onSelect }: BusinessSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBusinesses = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('businesses')
        .select('id, name, category, location, overall_rating, total_ratings, is_gsi_member')
        .order('overall_rating', { ascending: false })

      if (error) {
        setError('Failed to load businesses')
        console.error(error)
      } else {
        setBusinesses(data || [])
        setFilteredBusinesses(data || [])
      }
      setLoading(false)
    }

    fetchBusinesses()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredBusinesses(businesses)
    } else {
      setFilteredBusinesses(
        businesses.filter((b) =>
          b.name.toLowerCase().includes(query.toLowerCase()) ||
          b.category.toLowerCase().includes(query.toLowerCase()) ||
          b.location?.toLowerCase().includes(query.toLowerCase())
        )
      )
    }
  }

  return (
    <Card padding="lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Business to Rate</h2>
        <p className="text-gray-600">Search for the business you want to rate</p>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by business name, category, or location..."
          className="w-full px-4 py-3 pl-12 border-0 shadow-[0_0_20px_rgba(0,0,0,0.12)] focus:shadow-[0_0_25px_rgba(0,0,0,0.2)] rounded-lg focus:outline-none"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto px-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading businesses...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business) => (
            <button
              key={business.id}
              onClick={() => onSelect(business)}
              className="w-full p-4 border-0 shadow-[0_0_20px_rgba(0,0,0,0.12)] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:bg-gray-900 rounded-lg transition-all text-left group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors">
                      {business.name}
                    </h3>
                    {business.is_gsi_member && (
                      <Badge variant="success" size="sm">GSI Member</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300">{business.category}</p>
                  {business.location && (
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 mt-1">{business.location}</p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-gray-900 group-hover:text-white">
                    {business.overall_rating?.toFixed(1) ?? '—'}
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-400">
                    {business.total_ratings} ratings
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No businesses found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </Card>
  )
}
