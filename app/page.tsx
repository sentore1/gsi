import Link from 'next/link'
import SearchBar from '@/components/search/SearchBar'
import CategoriesSlider from '@/components/CategoriesSlider'
import BusinessCard from '@/components/business/BusinessCard'
import Button from '@/components/ui/Button'
import { TrendingUp, Award, Users, Star } from 'lucide-react'

// Mock data for trending businesses - in production, this would come from Supabase
const trendingBusinesses = [
  {
    id: '1',
    name: 'Kigali Marriott Hotel',
    category: 'Hotels',
    location: 'Kigali City Center',
    overallRating: 4.8,
    totalRatings: 1248,
    isGsiMember: true,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Marriott_Logo.svg/2560px-Marriott_Logo.svg.png',
  },
  {
    id: '2',
    name: 'Kigali Serena Hotel',
    category: 'Hotels',
    location: 'Kigali Heights',
    overallRating: 4.7,
    totalRatings: 892,
    isGsiMember: true,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Serena_Hotels_Logo.svg/2560px-Serena_Hotels_Logo.svg.png',
  },
  {
    id: '3',
    name: 'Bourbon Coffee',
    category: 'Cafés',
    location: 'KG 5 Ave',
    overallRating: 4.6,
    totalRatings: 654,
    isGsiMember: true,
    logoUrl: null,
  },
  {
    id: '4',
    name: 'The Retreat',
    category: 'Restaurants',
    location: 'Kimihurura',
    overallRating: 4.5,
    totalRatings: 543,
    isGsiMember: true,
    logoUrl: null,
  },
  {
    id: '5',
    name: 'RwandAir',
    category: 'Transport',
    location: 'Kigali International Airport',
    overallRating: 4.4,
    totalRatings: 987,
    isGsiMember: true,
    logoUrl: null,
  },
  {
    id: '6',
    name: 'Bank of Kigali',
    category: 'Banks',
    location: 'Multiple Locations',
    overallRating: 4.3,
    totalRatings: 1102,
    isGsiMember: true,
    logoUrl: null,
  },
  {
    id: '7',
    name: 'MTN Rwanda',
    category: 'Telecommunications',
    location: 'Nyarugenge',
    overallRating: 4.2,
    totalRatings: 2341,
    isGsiMember: true,
    logoUrl: null,
  },
  {
    id: '8',
    name: 'Nakumatt',
    category: 'Retail',
    location: 'Union Trade Center',
    overallRating: 4.1,
    totalRatings: 876,
    isGsiMember: true,
    logoUrl: null,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-12 px-4 pt-24">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="text-xs md:text-sm text-gray-600">
            <span className="text-gray-900 font-semibold">SERIVISI INOZE</span> - You Have a Right to Good Service
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Golden Service Initiative
          </h1>
        </div>

        {/* Background Art Image Strip + Search overlapping */}
        <div className="relative mt-8">
          <div className="w-screen relative left-1/2 -translate-x-1/2 flex overflow-hidden">
            <img src="/art2.png" alt="" className="w-1/2 h-auto object-cover" />
            <img src="/art2.png" alt="" className="w-1/2 h-auto object-cover" />
          </div>
          {/* Search bar overlapping the image */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-4xl">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center space-x-4 py-4 mt-4">
          <div className="h-px bg-gray-300 w-20"></div>
          <span className="text-gray-500 font-semibold">OR</span>
          <div className="h-px bg-gray-300 w-20"></div>
        </div>

        {/* Browse Categories Link */}
        <div className="text-center">
          <Link href="#categories">
            <Button variant="accent" size="lg">
              Browse Categories
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Find by Category
            </h2>
            <p className="text-lg text-gray-600">
              Browse businesses by service category
            </p>
          </div>

          <CategoriesSlider />
        </div>
      </section>

      {/* Trending Businesses Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Trending Businesses
              </h2>
              <p className="text-lg text-gray-600">
                Highest-rated by GSI users this month
              </p>
            </div>
            <Link href="/businesses">
              <Button variant="outline" className="bg-gray-900 border-none text-white hover:bg-black">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How GSI Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple, transparent service ratings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <div className="w-12 h-12 bg-accent-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Search a Business
              </h3>
              <p className="text-gray-600">
                Find any business by name or browse by category to discover services in your area.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md">
              <div className="w-12 h-12 bg-accent-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Rate Your Experience
              </h3>
              <p className="text-gray-600">
                Share your service experience by rating specific categories like welcome, interaction, and responsiveness.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md">
              <div className="w-12 h-12 bg-accent-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Help Others Decide
              </h3>
              <p className="text-gray-600">
                Your ratings help others make informed choices and encourage businesses to improve their service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Art Image Section */}
      <section className="w-full">
        <img 
          src="/art.png" 
          alt="GSI Art" 
          className="w-full h-auto object-cover"
        />
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Share Your Experience?
          </h2>
          <p className="text-base text-gray-600 mb-8">
            Help improve service quality in Rwanda by rating businesses you've visited
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rate">
              <Button variant="accent" size="lg">
                Rate a Business
              </Button>
            </Link>
            <Link href="/membership" className="no-underline">
              <Button variant="ghost" size="lg" className="text-gray-900 hover:text-gray-500 hover:bg-transparent transition-colors">
                Learn About Membership
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
