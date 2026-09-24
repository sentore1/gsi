'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, CheckCircle2, XCircle, Flag, User, Star } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import StarRating from '@/components/ui/StarRating'
import { mockRatings } from '@/lib/utils/mock-data'

type RatingStatus = 'all' | 'verified' | 'pending' | 'flagged' | 'rejected'

export default function AdminRatingsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<RatingStatus>('all')

  // Filter ratings
  const filteredRatings = mockRatings.filter(rating => {
    const matchesSearch = searchQuery === '' ||
      rating.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rating.comment?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || rating.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleVerify = (ratingId: string) => {
    console.log('Verifying rating:', ratingId)
    alert('Rating verified successfully!')
  }

  const handleFlag = (ratingId: string) => {
    console.log('Flagging rating:', ratingId)
    alert('Rating flagged for review')
  }

  const handleReject = (ratingId: string) => {
    console.log('Rejecting rating:', ratingId)
    alert('Rating rejected')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/admin" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Moderate Ratings</h1>
              <p className="text-gray-600 mt-1">{filteredRatings.length} ratings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card padding="md" className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by user name or comment..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RatingStatus)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card padding="sm">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{mockRatings.length}</p>
          </Card>
          <Card padding="sm">
            <p className="text-sm text-gray-600">Verified</p>
            <p className="text-2xl font-bold text-green-600">
              {mockRatings.filter(r => r.status === 'verified').length}
            </p>
          </Card>
          <Card padding="sm">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {mockRatings.filter(r => r.status === 'pending').length}
            </p>
          </Card>
          <Card padding="sm">
            <p className="text-sm text-gray-600">Flagged</p>
            <p className="text-2xl font-bold text-red-600">
              {mockRatings.filter(r => r.status === 'flagged').length}
            </p>
          </Card>
        </div>

        {/* Ratings List */}
        <div className="space-y-4">
          {filteredRatings.length > 0 ? (
            filteredRatings.map((rating) => (
              <Card key={rating.id} padding="md">
                {/* Rating Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{rating.userName}</p>
                      <p className="text-sm text-gray-500">{formatDate(rating.createdAt)}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      rating.status === 'verified' ? 'success' :
                      rating.status === 'pending' ? 'warning' :
                      rating.status === 'flagged' ? 'error' : 'gray'
                    }
                  >
                    {rating.status}
                  </Badge>
                </div>

                {/* Business Name */}
                <p className="text-sm text-gray-600 mb-3">
                  Business ID: <span className="font-medium">{rating.businessId}</span>
                </p>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={rating.overallRating} size="md" />
                </div>

                {/* Comment */}
                {rating.comment && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{rating.comment}</p>
                  </div>
                )}

                {/* Category Ratings */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-3">RATING BREAKDOWN</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {rating.entrance && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Entrance</span>
                        <span className="text-sm font-semibold text-gray-900">{rating.entrance.toFixed(1)}</span>
                      </div>
                    )}
                    {rating.interaction && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Interaction</span>
                        <span className="text-sm font-semibold text-gray-900">{rating.interaction.toFixed(1)}</span>
                      </div>
                    )}
                    {rating.heartFactor && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Heart Factor</span>
                        <span className="text-sm font-semibold text-gray-900">{rating.heartFactor.toFixed(1)}</span>
                      </div>
                    )}
                    {rating.responsiveness && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Responsiveness</span>
                        <span className="text-sm font-semibold text-gray-900">{rating.responsiveness.toFixed(1)}</span>
                      </div>
                    )}
                    {rating.problemResolution && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Problem Resolution</span>
                        <span className="text-sm font-semibold text-gray-900">{rating.problemResolution.toFixed(1)}</span>
                      </div>
                    )}
                    {rating.exit && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Exit</span>
                        <span className="text-sm font-semibold text-gray-900">{rating.exit.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {rating.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReject(rating.id)}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleFlag(rating.id)}
                      >
                        <Flag className="w-3 h-3 mr-1" />
                        Flag
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleVerify(rating.id)}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verify
                      </Button>
                    </>
                  )}
                  {rating.status === 'verified' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFlag(rating.id)}
                    >
                      <Flag className="w-3 h-3 mr-1" />
                      Flag
                    </Button>
                  )}
                  {rating.status === 'flagged' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReject(rating.id)}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleVerify(rating.id)}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verify
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card padding="lg" className="text-center">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No ratings found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
