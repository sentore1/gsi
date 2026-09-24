import Link from 'next/link'
import { Check, Building2, Users, Award } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function MembershipPage() {
  const individualFeatures = [
    'Rate businesses across all categories',
    'Save favorite businesses',
    'Follow businesses for updates',
    'Access to GSI community',
    'Personal rating history',
    'Verified rater badge',
  ]

  const businessFeatures = [
    'Business profile on GSI platform',
    'Receive customer ratings',
    'Respond to customer feedback',
    'Service analytics dashboard',
    'GSI Member badge',
    'Rating trend reports',
    'Customer insights',
    'Priority support',
  ]

  const corporateFeatures = [
    'All Business features',
    'Multiple location support',
    'Industry analytics',
    'Sponsored initiatives',
    'Sector reports',
    'GSI events access',
    'Custom reporting',
    'Dedicated account manager',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">GSI Membership</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the Golden Service Initiative community and help improve service quality across Rwanda
          </p>
        </div>
      </div>

      {/* Membership Plans */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Membership</h2>
          <p className="text-lg text-gray-600">Select the plan that best fits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Individual - Gray */}
          <div className="relative bg-gray-100 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Individual</h3>
              <p className="text-gray-600 mb-4">For customers who want to rate businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Free</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {individualFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/register?type=individual">
              <Button variant="secondary" size="lg" fullWidth>Sign Up Free</Button>
            </Link>
          </div>

          {/* Business - Blue */}
          <div className="relative bg-blue-600 rounded-2xl p-8">
            <div className="absolute top-0 right-0 bg-white text-blue-600 px-4 py-1 rounded-bl-lg rounded-tr-2xl font-semibold text-sm">
              POPULAR
            </div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
              <p className="text-blue-100 mb-4">For businesses seeking to improve service</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Contact Us</span>
                <p className="text-sm text-blue-200 mt-1">Custom pricing</p>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {businessFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-blue-200 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/register?type=business&membership=business">
              <Button variant="accent" size="lg" fullWidth>Get Started</Button>
            </Link>
          </div>

          {/* Corporate - Gold */}
          <div className="relative bg-yellow-400 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Corporate</h3>
              <p className="text-yellow-800 mb-4">For large organizations and partners</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Enterprise</span>
                <p className="text-sm text-yellow-800 mt-1">Custom solutions</p>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {corporateFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-yellow-700 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-900">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/register?type=business&membership=corporate">
              <Button variant="secondary" size="lg" fullWidth>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join GSI?</h2>
            <p className="text-lg text-gray-600">Be part of Rwanda's service excellence movement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Improve Service Quality</h3>
              <p className="text-gray-600">Help businesses understand and improve their service standards</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Voice Your Experience</h3>
              <p className="text-gray-600">Share your service experiences to help others make informed decisions</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data-Driven Insights</h3>
              <p className="text-gray-600">Access comprehensive analytics and reports on service trends</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Drive Excellence</h3>
              <p className="text-gray-600">Contribute to raising service standards across Rwanda</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of Rwandans committed to service excellence</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button variant="accent" size="lg">Create Free Account</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="lg" className="text-white hover:text-gray-300 hover:bg-transparent">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
