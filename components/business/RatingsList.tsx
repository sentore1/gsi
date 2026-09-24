import { User, Clock } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'

interface Rating {
  id: string
  userName: string
  entrance: number | null
  interaction: number | null
  heartFactor: number | null
  responsiveness: number | null
  problemResolution: number | null
  exit: number | null
  overallRating: number
  comment: string | null
  status: 'verified' | 'pending' | 'flagged' | 'rejected'
  createdAt: string
}

interface RatingsListProps {
  ratings: Rating[]
}

export default function RatingsList({ ratings }: RatingsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return date.toLocaleDateString()
  }

  const getCategoryRatings = (rating: Rating) => {
    const categories = []
    if (rating.entrance) categories.push({ label: 'Entrance', value: rating.entrance })
    if (rating.interaction) categories.push({ label: 'Interaction', value: rating.interaction })
    if (rating.heartFactor) categories.push({ label: 'Heart Factor', value: rating.heartFactor })
    if (rating.responsiveness) categories.push({ label: 'Responsiveness', value: rating.responsiveness })
    if (rating.problemResolution) categories.push({ label: 'Problem Resolution', value: rating.problemResolution })
    if (rating.exit) categories.push({ label: 'Exit', value: rating.exit })
    return categories
  }

  if (ratings.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No ratings yet</p>
        <p className="text-sm text-gray-500 mt-1">Be the first to rate this business</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {ratings.map((rating) => {
        const categoryRatings = getCategoryRatings(rating)
        
        return (
          <div key={rating.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{rating.userName}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(rating.createdAt)}</span>
                  </div>
                </div>
              </div>
              {rating.status === 'verified' && (
                <Badge variant="success" size="sm">
                  Verified
                </Badge>
              )}
            </div>

            {/* Overall Rating */}
            <div className="mb-3">
              <StarRating rating={rating.overallRating} size="md" showNumber />
            </div>

            {/* Comment */}
            {rating.comment && (
              <p className="text-gray-700 mb-4 leading-relaxed">{rating.comment}</p>
            )}

            {/* Category Ratings */}
            {categoryRatings.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-medium text-gray-600 mb-3">RATING BREAKDOWN</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categoryRatings.map((cat) => (
                    <div key={cat.label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{cat.label}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {cat.value.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
