import { CheckCircle2, Star, Eye } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface RatingSuccessProps {
  business: any
  overallRating: number
  onRateAnother: () => void
  onViewBusiness: () => void
}

export default function RatingSuccess({
  business,
  overallRating,
  onRateAnother,
  onViewBusiness,
}: RatingSuccessProps) {
  return (
    <Card padding="lg">
      <div className="text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Thank You for Your Rating!
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Your feedback helps improve service quality in Rwanda
        </p>

        {/* Rating Summary */}
        <div className="bg-accent-400 rounded-lg p-6 my-8 inline-block">
          <p className="text-sm font-medium text-gray-700 mb-2">You rated</p>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{business.name}</h3>
          
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  className={`w-8 h-8 ${
                    value <= Math.round(overallRating)
                      ? 'fill-gray-900 text-gray-900'
                      : 'text-gray-900/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-4xl font-bold text-gray-900">
              {overallRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-green-600 rounded-lg p-4 mb-8">
          <p className="text-sm text-white">
            <strong>Status:</strong> Your rating is being verified and will be published shortly.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Your rating will be verified to prevent fraud</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>The business will see your feedback in their dashboard</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Your rating will help other customers make informed decisions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Businesses with better ratings will be encouraged to maintain quality</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="ghost" onClick={onRateAnother} fullWidth className="text-gray-900 hover:bg-transparent hover:text-gray-500">
            <Star className="w-4 h-4 mr-2" />
            Rate Another Business
          </Button>
          <Button variant="primary" onClick={onViewBusiness} fullWidth>
            <Eye className="w-4 h-4 mr-2" />
            View Business Profile
          </Button>
        </div>
      </div>
    </Card>
  )
}
