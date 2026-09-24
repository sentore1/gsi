'use client'

import { Star } from 'lucide-react'
import clsx from 'clsx'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  interactive?: boolean
  onChange?: (rating: number) => void
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value)
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= Math.round(rating)
        const isPartial = starValue > rating && starValue - 1 < rating

        return (
          <button
            key={index}
            onClick={() => handleClick(starValue)}
            disabled={!interactive}
            className={clsx('relative', {
              'cursor-pointer hover:scale-110 transition-transform': interactive,
              'cursor-default': !interactive,
            })}
            type="button"
          >
            <Star
              className={clsx(sizeClasses[size], {
                'fill-accent-400 text-accent-400': isFilled,
                'fill-gray-300 text-gray-300': !isFilled && !isPartial,
              })}
            />
          </button>
        )
      })}
      {showNumber && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  )
}
