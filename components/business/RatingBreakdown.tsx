import { RATING_CATEGORIES } from '@/lib/constants/categories'

interface RatingBreakdownProps {
  categoryRatings: {
    entrance?: number | null
    interaction?: number | null
    heartFactor?: number | null
    responsiveness?: number | null
    problemResolution?: number | null
    exit?: number | null
  }
}

export default function RatingBreakdown({ categoryRatings }: RatingBreakdownProps) {
  const getCategoryValue = (key: string): number | null => {
    const categoryKey = key as keyof typeof categoryRatings
    return categoryRatings[categoryKey] ?? null
  }

  const getBarColor = (rating: number | null) => {
    if (!rating) return 'bg-gray-200'
    if (rating >= 4.5) return 'bg-green-500'
    if (rating >= 4.0) return 'bg-accent-400'
    if (rating >= 3.5) return 'bg-yellow-500'
    if (rating >= 3.0) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const formatRating = (rating: number | null) => {
    return rating ? rating.toFixed(1) : 'N/A'
  }

  return (
    <div className="space-y-6">
      {RATING_CATEGORIES.map((category) => {
        const value = getCategoryValue(category.key)
        const percentage = value ? (value / 5) * 100 : 0

        return (
          <div key={category.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{category.label}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
              <div className="ml-4 text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {formatRating(value)}
                </div>
                <div className="text-xs text-gray-500">/ 5.0</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(value)} transition-all duration-500 rounded-full`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
