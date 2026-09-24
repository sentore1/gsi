'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { RATING_CATEGORIES } from '@/lib/constants/categories'
import { createClient } from '@/lib/supabase/client'
import BusinessSelector from '@/components/rating/BusinessSelector'
import CategoryRatingForm from '@/components/rating/CategoryRatingForm'
import RatingSuccess from '@/components/rating/RatingSuccess'

type RatingStep = 'select-business' | 'rate' | 'success'

interface Business {
  id: string
  name: string
  category: string
  location: string | null
  overall_rating: number | null
  total_ratings: number
  is_gsi_member: boolean
}

function RatePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const businessIdParam = searchParams.get('business')

  const [currentStep, setCurrentStep] = useState<RatingStep>('select-business')
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const allCategories = RATING_CATEGORIES.map((cat) => cat.key)

  useEffect(() => {
    if (businessIdParam) {
      const fetchBusiness = async () => {
        const supabase = createClient()
        const { data } = await supabase
          .from('businesses')
          .select('id, name, category, location, overall_rating, total_ratings, is_gsi_member')
          .eq('id', businessIdParam)
          .single()
        if (data) {
          setSelectedBusiness(data)
          setCurrentStep('rate')
        }
      }
      fetchBusiness()
    }
  }, [businessIdParam])

  const handleBusinessSelect = (business: Business) => {
    setSelectedBusiness(business)
    setCurrentStep('rate')
  }

  const handleRatingChange = (categoryKey: string, value: number) => {
    setRatings((prev) => ({ ...prev, [categoryKey]: value }))
  }

  const calculateOverallRating = () => {
    const values = Object.values(ratings)
    if (values.length === 0) return 0
    return values.reduce((sum, val) => sum + val, 0) / values.length
  }

  const handleSubmit = async () => {
    const missingRatings = allCategories.filter((cat) => !ratings[cat])
    if (missingRatings.length > 0) {
      alert('Please rate all categories')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('ratings').insert({
      business_id: selectedBusiness!.id,
      user_id: user?.id ?? null,
      entrance: ratings['entrance'],
      interaction: ratings['interaction'],
      heart_factor: ratings['heart_factor'],
      responsiveness: ratings['responsiveness'],
      problem_resolution: ratings['problem_resolution'],
      exit: ratings['exit'],
      overall_rating: parseFloat(calculateOverallRating().toFixed(2)),
      comment: comment || null,
      status: 'pending',
    } as any)

    setIsSubmitting(false)

    if (error) {
      console.error('Submit error:', error)
      setSubmitError('Failed to submit rating. Please try again.')
      return
    }

    setCurrentStep('success')
  }

  const handleStartNewRating = () => {
    setSelectedBusiness(null)
    setRatings({})
    setComment('')
    setSubmitError(null)
    setCurrentStep('select-business')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">Rate a Business</h1>
          <p className="text-xl text-gray-600">Share your service experience to help others</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                currentStep === 'select-business' ? 'bg-gray-900 text-white' : 'bg-green-500 text-white'
              }`}>
                {currentStep === 'select-business' ? '1' : '✓'}
              </div>
              <span className="font-medium text-gray-900">Select Business</span>
            </div>

            <div className="h-px flex-1 bg-gray-300 mx-4" />

            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                currentStep === 'rate' ? 'bg-gray-900 text-white'
                : currentStep === 'success' ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep === 'success' ? '✓' : '2'}
              </div>
              <span className={`font-medium ${currentStep === 'select-business' ? 'text-gray-500' : 'text-gray-900'}`}>
                Rate & Submit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {submitError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {submitError}
          </div>
        )}

        {currentStep === 'select-business' && (
          <BusinessSelector onSelect={handleBusinessSelect} />
        )}

        {currentStep === 'rate' && selectedBusiness && (
          <CategoryRatingForm
            business={selectedBusiness}
            selectedCategories={allCategories}
            ratings={ratings}
            comment={comment}
            onRatingChange={handleRatingChange}
            onCommentChange={setComment}
            onBack={() => setCurrentStep('select-business')}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 'success' && selectedBusiness && (
          <RatingSuccess
            business={selectedBusiness}
            overallRating={calculateOverallRating()}
            onRateAnother={handleStartNewRating}
            onViewBusiness={() => router.push(`/business/${selectedBusiness.id}`)}
          />
        )}
      </div>
    </div>
  )
}

export default function RatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RatePageContent />
    </Suspense>
  )
}
