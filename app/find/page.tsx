'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/search/SearchBar'
import BusinessCard from '@/components/business/BusinessCard'
import Select from '@/components/ui/Select'
import { CATEGORIES } from '@/lib/constants/categories'
import { Filter, SlidersHorizontal } from 'lucide-react'
import Card from '@/components/ui/Card'

// Mock data - in production, this would come from Supabase
const mockBusinesses = [
  {
    id: '1',
    name: 'Kigali Marriott Hotel',
    category: 'Hotels',
    location: 'Kigali City Center',
    overallRating: 4.8,
    totalRatings: 1248,
    isGsiMember: true,
  },
  {
    id: '2',
    name: 'Heaven Restaurant',
    category: 'Restaurants',
    location: 'Kimihurura',
    overallRating: 4.7,
    totalRatings: 892,
    isGsiMember: true,
  },
  {
    id: '3',
    name: 'Question Coffee',
    category: 'Cafés',
    location: 'KG 5 Ave',
    overallRating: 4.6,
    totalRatings: 654,
    isGsiMember: true,
  },
  {
    id: '4',
    name: 'Serena Hotel Kigali',
    category: 'Hotels',
    location: 'Kiyovu',
    overallRating: 4.5,
    totalRatings: 876,
    isGsiMember: true,
  },
  {
    id: '5',
    name: 'The Hut Restaurant',
    category: 'Restaurants',
    location: 'Remera',
    overallRating: 4.4,
    totalRatings: 543,
    isGsiMember: false,
  },
  {
    id: '6',
    name: 'Bourbon Coffee',
    category: 'Cafés',
    location: 'Kacyiru',
    overallRating: 4.3,
    totalRatings: 421,
    isGsiMember: true,
  },
]

function FindPageContent() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || 'all'

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses)

  useEffect(() => {
    let results = [...mockBusinesses]

    // Filter by search query
    if (searchQuery) {
      results = results.filter((business) =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      results = results.filter(
        (business) => business.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Sort results
    if (sortBy === 'rating') {
      results.sort((a, b) => b.overallRating - a.overallRating)
    } else if (sortBy === 'reviews') {
      results.sort((a, b) => b.totalRatings - a.totalRatings)
    } else if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredBusinesses(results)
  }, [searchQuery, selectedCategory, sortBy])

  useEffect(() => {
    setSearchQuery(queryParam)
  }, [queryParam])

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...CATEGORIES.map((cat) => ({ value: cat.value, label: cat.label })),
  ]

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'name', label: 'Name (A-Z)' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find a Business</h1>
          <SearchBar placeholder="Search by business name or location..." />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card padding="md" className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-primary-600"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* GSI Member Filter */}
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">GSI Members Only</span>
                  </label>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="0">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                    <option value="3.0">3.0+ Stars</option>
                  </select>
                </div>
              </div>
            </Card>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'Business' : 'Businesses'} Found
                </h2>
                {searchQuery && (
                  <p className="text-sm text-gray-600 mt-1">
                    Showing results for "{searchQuery}"
                  </p>
                )}
              </div>
            </div>

            {/* Business Grid */}
            {filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} {...business} />
                ))}
              </div>
            ) : (
              <Card padding="lg" className="text-center">
                <div className="py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No businesses found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Clear all filters
                  </button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FindPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <FindPageContent />
    </Suspense>
  )
}
