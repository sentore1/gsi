'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Globe } from 'lucide-react'
import { useState } from 'react'
import Card from '@/components/ui/Card'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'

interface BusinessCardProps {
  id: string
  name: string
  category: string
  location?: string
  overallRating: number
  totalRatings: number
  isGsiMember: boolean
  logoUrl?: string | null
}

export default function BusinessCard({
  id,
  name,
  category,
  location,
  overallRating,
  totalRatings,
  isGsiMember,
  logoUrl,
}: BusinessCardProps) {
  const [imageError, setImageError] = useState(false)
  const shouldShowImage = logoUrl && !imageError

  return (
    <Link href={`/business/${id}`}>
      <Card hover padding="md" className="cursor-pointer h-full">
        <div className="space-y-3">
          {/* Header with Logo and Badge */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {/* Circular Logo/Avatar */}
              {shouldShowImage ? (
                <div className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden relative">
                  <Image 
                    src={logoUrl} 
                    alt={`${name} logo`} 
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                  {name.substring(0, 2).toUpperCase()}
                </div>
              )}
              
              {/* Business Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 line-clamp-2">{name}</h3>
                <p className="text-sm text-gray-600">{category}</p>
              </div>
            </div>
            
            {isGsiMember && (
              <Badge variant="success" size="sm" className="text-xs px-2 py-0.5">
                GSI Member
              </Badge>
            )}
          </div>

          {/* Location */}
          {location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}

          {/* Rating */}
          <div className="pt-2 border-t border-gray-100">
            <StarRating rating={overallRating} size="sm" showNumber={false} />
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold text-gray-900">{overallRating.toFixed(1)}</span> / 5
              <span className="mx-1">•</span>
              <span>{totalRatings.toLocaleString()} ratings</span>
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
