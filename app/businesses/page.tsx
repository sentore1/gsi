'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import BusinessCard from '@/components/business/BusinessCard'
import { CATEGORIES } from '@/lib/constants/categories'
import { TrendingUp, Award } from 'lucide-react'
import Card from '@/components/ui/Card'

// Mock data - in production, this would come from Supabase
const mockBusinessesByCategory = {
  hotels: [
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
      id: '4',
      name: 'Serena Hotel Kigali',
      category: 'Hotels',
      location: 'Kiyovu',
      overallRating: 4.5,
      totalRatings: 876,
      isGsiMember: true,
    },
    {
      id: '7',
      name: 'Radisson Blu Hotel',
      category: 'Hotels',
      location: 'Gisimenti',
      overallRating: 4.4,
      totalRatings: 732,
      isGsiMember: true,
    },
  ],
  restaurants: [
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
      id: '5',
      name: 'The Hut Restaurant',
      category: 'Restaurants',
      location: 'Remera',
      overallRating: 4.4,
      totalRatings: 543,
      isGsiMember: false,
    },
    {
      id: '8',
      name: 'Repub Lounge',
      category: 'Restaurants',
      location: 'Kacyiru',
      overallRating: 4.3,
      totalRatings: 467,
      isGsiMember: true,
    },
  ],
  cafes: [
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
      id: '6',
      name: 'Bourbon Coffee',
      category: 'Cafés',
      location: 'Kacyiru',
      overallRating: 4.3,
      totalRatings: 421,
      isGsiMember: true,
    },
  ],
}

function BusinessesPageContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  const getCategoryLabel = (value: string) => {
    if (value === 'all') return 'All Categories'
    const category = CATEGORIES.find((cat) => cat.value === value)
    return category?.label || value
  }

  const getBusinessesForCategory = (category: string) => {
    if (category === 'all') {
      return Object.values(mockBusinessesByCategory).flat()
    }
    return mockBusinessesByCategory[category as keyof typeof mockBusinessesByCategory] || []
  }

  const businesses = getBusinessesForCategory(selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">All Businesses</h1>
          <p className="text-xl text-gray-600 mt-2">
            Browse GSI member businesses by category
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-1 py-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.value
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getCategoryLabel(selectedCategory)}
          </h2>
          <p className="text-gray-600">
            {businesses.length} {businesses.length === 1 ? 'business' : 'businesses'} found
          </p>
        </div>

        {/* Leaderboard Section */}
        {businesses.length > 0 && (
          <>
            {/* Top 3 Highlighted */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-6 h-6 text-accent-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Top Rated
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {businesses.slice(0, 3).map((business, index) => (
                  <div key={business.id} className="relative">
                    <div className="absolute -top-3 -left-3 z-10">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                          index === 0
                            ? 'bg-accent-400'
                            : index === 1
                            ? 'bg-gray-400'
                            : 'bg-amber-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <BusinessCard {...business} />
                  </div>
                ))}
              </div>
            </div>

            {/* Rest of the businesses */}
            {businesses.length > 3 && (
              <>
                <div className="border-t border-gray-200 my-8"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  All {getCategoryLabel(selectedCategory)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {businesses.slice(3).map((business) => (
                    <BusinessCard key={business.id} {...business} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Empty State */}
        {businesses.length === 0 && (
          <Card padding="lg" className="text-center">
            <div className="py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No businesses in this category yet
              </h3>
              <p className="text-gray-600">
                Check back soon as more businesses join GSI
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function BusinessesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BusinessesPageContent />
    </Suspense>
  )
}
