'use client'

import { Star } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { RATING_CATEGORIES } from '@/lib/constants/categories'

interface CategoryRatingFormProps {
  business: any
  selectedCategories: string[]
  ratings: Record<string, number>
  comment: string
  onRatingChange: (categoryKey: string, value: number) => void
  onCommentChange: (comment: string) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export default function CategoryRatingForm({
  business,
  selectedCategories,
  ratings,
  comment,
  onRatingChange,
  onCommentChange,
  onBack,
  onSubmit,
  isSubmitting,
}: CategoryRatingFormProps) {
  const categoriesToRate = RATING_CATEGORIES.filter((cat) =>
    [...new Set(selectedCategories)].includes(cat.key)
  )

  const allRated = selectedCategories.every((cat) => ratings[cat])

  return (
    <Card padding="lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Rate Your Experience at {business.name}
        </h2>
        <p className="text-gray-600">
          Rate each category from 1 to 5 stars
        </p>
      </div>

      <div className="space-y-8 mb-8">
        {categoriesToRate.map((category) => (
          <div key={category.key} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {category.label}
              </h3>
              <p className="text-sm text-gray-600">{category.question}</p>
            </div>

            {/* Star Rating Input */}
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onRatingChange(category.key, value)}
                  className="group transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 transition-colors ${
                      ratings[category.key] >= value
                        ? 'fill-accent-400 text-accent-400'
                        : 'text-gray-300 hover:text-accent-200'
                    }`}
                  />
                </button>
              ))}
              {ratings[category.key] && (
                <span className="ml-4 text-2xl font-bold text-gray-900">
                  {ratings[category.key]}.0
                </span>
              )}
            </div>

            {!ratings[category.key] && (
              <p className="text-sm text-red-600 mt-2">Please rate this category</p>
            )}
          </div>
        ))}
      </div>

      {/* Comment Section */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-gray-900 mb-2">
          Additional Comments (Optional)
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Share more details about your experience
        </p>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Tell us about your experience..."
          rows={5}
          maxLength={500}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-0 resize-none placeholder:text-gray-400 focus:placeholder:text-white"
        />
        <p className="text-sm text-gray-500 mt-1 text-right">
          {comment.length} / 500 characters
        </p>
      </div>

      {/* Overall Rating Preview */}
      {allRated && (
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Your Overall Rating</p>
            <div className="text-4xl font-bold text-gray-900">
              {(Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1)}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-4">
        <Button variant="ghost" onClick={onBack} fullWidth disabled={isSubmitting} className="text-gray-900 hover:bg-transparent hover:text-gray-500">
          Back
        </Button>
        <Button
          variant="accent"
          onClick={onSubmit}
          disabled={!allRated || isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Submitting...' : 'Submit Rating'}
        </Button>
      </div>
    </Card>
  )
}
