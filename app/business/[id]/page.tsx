import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Globe, Calendar, TrendingUp, MessageSquare, Star } from 'lucide-react'
import Card from '@/components/ui/Card'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { RATING_CATEGORIES } from '@/lib/constants/categories'
import { getBusinessById, getRatingsByBusinessId } from '@/lib/utils/mock-data'
import RatingBreakdown from '@/components/business/RatingBreakdown'
import RatingsList from '@/components/business/RatingsList'
import RatingTrend from '@/components/business/RatingTrend'
import BusinessQRCode from '@/components/business/BusinessQRCode'

export default function BusinessProfilePage({ params }: { params: { id: string } }) {
  const business = getBusinessById(params.id)
  const ratings = getRatingsByBusinessId(params.id)

  if (!business) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Business Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-4xl font-bold">{business.name}</h1>
                {business.isGsiMember && (
                  <Badge variant="success" icon size="md">
                    GSI Member
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2 text-gray-400">
                <p className="text-xl">{business.category}</p>
                {business.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>{business.location}</span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 mt-6">
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{business.phone}</span>
                  </a>
                )}
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit Website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Overall Rating */}
            <Card padding="md" className="md:w-80">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {business.overallRating.toFixed(1)}
                </div>
                <StarRating
                  rating={business.overallRating}
                  size="lg"
                  showNumber={false}
                />
                <p className="text-gray-600 mt-3">
                  {business.totalRatings.toLocaleString()} GSI ratings
                </p>
                {business.isGsiMember && business.memberSince && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
                    <Calendar className="w-4 h-4" />
                    <span>GSI Member since {formatDate(business.memberSince)}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Description */}
        {business.description && (
          <Card padding="md" className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
            <p className="text-gray-700 leading-relaxed">{business.description}</p>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ratings Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Breakdown */}
            <Card padding="md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Breakdown</h2>
              <RatingBreakdown categoryRatings={business.categoryRatings} />
            </Card>

            {/* Rating Trend */}
            <Card padding="md">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Rating Trend</h2>
              </div>
              <RatingTrend businessId={business.id} />
            </Card>

            {/* Customer Ratings */}
            <Card padding="md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Customer Ratings</h2>
                </div>
                <span className="text-gray-600">
                  {ratings.length} {ratings.length === 1 ? 'rating' : 'ratings'}
                </span>
              </div>
              <RatingsList ratings={ratings} />
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Rate This Business */}
            <Card padding="md" className="bg-accent-50 border-accent-200">
              <div className="text-center space-y-4">
                <Star className="w-12 h-12 text-accent-600 mx-auto" />
                <h3 className="text-xl font-bold text-gray-900">
                  Rate This Business
                </h3>
                <p className="text-gray-600">
                  Share your service experience to help others make informed decisions
                </p>
                <Link href={`/rate?business=${business.id}`}>
                  <Button variant="accent" size="lg" fullWidth>
                    Rate Now
                  </Button>
                </Link>
              </div>
            </Card>

            {/* QR Code Section */}
            {business.isGsiMember && (
              <BusinessQRCode businessId={business.id} businessName={business.name} />
            )}

            {/* Similar Businesses */}
            <Card padding="md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                More in {business.category}
              </h3>
              <div className="space-y-3">
                <Link
                  href={`/businesses?category=${business.category.toLowerCase()}`}
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <p className="text-sm font-medium text-primary-600">
                    View all {business.category} →
                  </p>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
