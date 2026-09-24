'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Filter, Search, User, Clock } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import StarRating from '@/components/ui/StarRating'
import { mockRatings } from '@/lib/utils/mock-data'

// Mock business owner data
const currentBusinessId = '1'

export default function BusinessRatingsPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending' | 'flagged'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [respondingTo, setRespondingTo] = useState<string | null>(null)
  const [responseText, setResponseText] = useState('')

  // Get ratings for this business
  const allRatings = mockRatings.filter(r => r.businessId === currentBusinessId)
  
  // Filter ratings
  const filteredRatings = allRatings.filter(rating => {
    const matchesStatus = filterStatus === 'all' || rating.status === filterStatus
    const matchesSearch = searchQuery === '' || 
      rating.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rating.comment?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleRespond = (ratingId: string) => {
    setRespondingTo(ratingId)
    setResponseText('')
  }

  const handleCancelResponse = () => {
    setRespondingTo(null)
    setResponseText('')
  }

  const handleSubmitResponse = (ratingId: string) => {
    // In production, save to Supabase
    console.log('Submitting response to rating:', ratingId, responseText)
    setRespondingTo(null)
    setResponseText('')
    alert('Response submitted successfully!')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
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
          <Link href="/business/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Ratings</h1>
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
                placeholder="Search by customer name or comment..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
          </div>
        </Card>

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
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(rating.createdAt)}</span>
                      </div>
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

                {/* Overall Rating */}
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

                {/* Response Section */}
                {respondingTo === rating.id ? (
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-medium text-gray-900 mb-3">Your Response</p>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Write your response to this customer..."
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{responseText.length} / 500</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={handleCancelResponse}>
                          Cancel
                        </Button>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handleSubmitResponse(rating.id)}
                          disabled={responseText.trim().length === 0}
                        >
                          Submit Response
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleRespond(rating.id)}>
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Respond
                    </Button>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card padding="lg" className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No ratings found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
