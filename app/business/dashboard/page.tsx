'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  Users,
  Calendar,
  Settings,
  Eye,
  AlertCircle
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import Button from '@/components/ui/Button'
import { RATING_CATEGORIES } from '@/lib/constants/categories'
import { mockBusinesses, mockRatings } from '@/lib/utils/mock-data'

// Mock business owner data - in production, get from session/auth
const currentBusinessId = '1'

export default function BusinessDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')
  
  // Get business data
  const business = mockBusinesses.find(b => b.id === currentBusinessId)
  const ratings = mockRatings.filter(r => r.businessId === currentBusinessId)

  if (!business) {
    return <div>Business not found</div>
  }

  // Calculate stats
  const recentRatings = ratings.slice(0, 5) // Last 5 ratings
  const averageRating = business.overallRating
  const totalRatings = business.totalRatings
  const verifiedRatings = ratings.filter(r => r.status === 'verified').length
  const pendingRatings = ratings.filter(r => r.status === 'pending').length

  // Mock trend data
  const ratingChange = 0.2 // +0.2 from last period
  const ratingsGrowth = 12 // +12% new ratings

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <LayoutDashboard className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Business Dashboard</h1>
              </div>
              <p className="text-primary-100">{business.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href={`/business/${business.id}`}>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Profile
                </Button>
              </Link>
              <Link href="/business/dashboard/settings">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-700">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          <div className="flex space-x-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Rating */}
          <Card padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-accent-600" />
              </div>
              {ratingChange >= 0 ? (
                <Badge variant="success" size="sm">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{ratingChange.toFixed(1)}
                </Badge>
              ) : (
                <Badge variant="error" size="sm">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {ratingChange.toFixed(1)}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">Overall Rating</p>
            <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
            <p className="text-xs text-gray-500 mt-1">out of 5.0</p>
          </Card>

          {/* Total Ratings */}
          <Card padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary-600" />
              </div>
              <Badge variant="success" size="sm">
                +{ratingsGrowth}%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Ratings</p>
            <p className="text-3xl font-bold text-gray-900">{totalRatings.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">all time</p>
          </Card>

          {/* Verified Ratings */}
          <Card padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Verified Ratings</p>
            <p className="text-3xl font-bold text-gray-900">{verifiedRatings}</p>
            <p className="text-xs text-gray-500 mt-1">{pendingRatings} pending review</p>
          </Card>

          {/* GSI Member Status */}
          <Card padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              {business.isGsiMember && <Badge variant="success" icon size="sm">Active</Badge>}
            </div>
            <p className="text-sm text-gray-600 mb-1">Membership</p>
            <p className="text-3xl font-bold text-gray-900">GSI</p>
            <p className="text-xs text-gray-500 mt-1">
              Since {business.memberSince ? new Date(business.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Category Performance */}
            <Card padding="md">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Service Performance</h3>
              <div className="space-y-6">
                {RATING_CATEGORIES.map((category) => {
                  const categoryKey = category.key as keyof typeof business.categoryRatings
                  const rating = business.categoryRatings[categoryKey] || 0
                  const percentage = (rating / 5) * 100

                  return (
                    <div key={category.key}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{category.label}</h4>
                          <p className="text-xs text-gray-500">{category.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{rating.toFixed(1)}</div>
                          <div className="text-xs text-gray-500">/ 5.0</div>
                        </div>
                      </div>
                      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            rating >= 4.5 ? 'bg-green-500' :
                            rating >= 4.0 ? 'bg-accent-400' :
                            rating >= 3.5 ? 'bg-yellow-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Recent Ratings */}
            <Card padding="md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Ratings</h3>
                <Link href="/business/dashboard/ratings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentRatings.map((rating) => (
                  <div key={rating.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{rating.userName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={rating.overallRating} size="sm" showNumber={false} />
                        <span className="font-semibold text-gray-900">{rating.overallRating}</span>
                      </div>
                    </div>
                    {rating.comment && (
                      <p className="text-sm text-gray-700 mb-2">{rating.comment}</p>
                    )}
                    <div className="flex items-center space-x-2">
                      <Badge variant={rating.status === 'verified' ? 'success' : 'warning'} size="sm">
                        {rating.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card padding="md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href={`/business/${business.id}`}>
                  <Button variant="outline" fullWidth>
                    <Eye className="w-4 h-4 mr-2" />
                    View Public Profile
                  </Button>
                </Link>
                <Link href="/business/dashboard/settings">
                  <Button variant="outline" fullWidth>
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Business Info
                  </Button>
                </Link>
                <Button variant="primary" fullWidth>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Respond to Ratings
                </Button>
              </div>
            </Card>

            {/* Alerts */}
            {pendingRatings > 0 && (
              <Card padding="md" className="bg-yellow-50 border-yellow-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Pending Ratings</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      You have {pendingRatings} ratings awaiting verification
                    </p>
                    <Link href="/business/dashboard/ratings">
                      <Button variant="accent" size="sm">
                        Review Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* Tips Card */}
            <Card padding="md" className="bg-primary-50 border-primary-200">
              <h4 className="font-semibold text-gray-900 mb-3">💡 Tips to Improve</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Respond to customer feedback within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Focus on improving your lowest-rated categories</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Encourage satisfied customers to leave ratings</span>
                </li>
              </ul>
            </Card>

            {/* QR Code */}
            <Card padding="md">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Rate QR Code</h4>
              <div className="bg-gray-100 rounded-lg p-4 text-center mb-3">
                <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">QR Code</span>
                </div>
                <p className="text-xs text-gray-600">
                  Display at your location
                </p>
              </div>
              <Button variant="outline" size="sm" fullWidth>
                Download QR Code
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
