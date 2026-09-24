'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, CheckCircle2, XCircle, Eye, Building2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { mockBusinesses } from '@/lib/utils/mock-data'

type BusinessStatus = 'all' | 'active' | 'pending' | 'suspended'
type ViewTab = 'businesses' | 'payments'

export default function AdminBusinessesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<BusinessStatus>('all')
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ViewTab>('businesses')

  // Mock pending businesses
  const pendingBusinesses = [
    { id: 'p1', name: 'New Café Rwanda', category: 'Cafés', location: 'Kicukiro', status: 'pending' as const },
    { id: 'p2', name: 'Tech Hub Services', category: 'Professional Services', location: 'Kimihurura', status: 'pending' as const },
    { id: 'p3', name: 'Fresh Foods Market', category: 'Retail', location: 'Nyamirambo', status: 'pending' as const },
  ]

  // Mock pending payments
  const pendingPayments = [
    {
      id: 'pay1',
      businessName: 'Premium Hotel Ltd',
      membershipType: 'business' as const,
      amount: 500000,
      paymentProofUrl: '/art.png', // Mock image
      paymentDate: '2024-01-15',
      businessOwner: 'John Doe',
      email: 'john@premiumhotel.com'
    },
    {
      id: 'pay2',
      businessName: 'Corporate Solutions Inc',
      membershipType: 'corporate' as const,
      amount: 2000000,
      paymentProofUrl: '/art2.png', // Mock image
      paymentDate: '2024-01-14',
      businessOwner: 'Jane Smith',
      email: 'jane@corpsolutions.com'
    },
    {
      id: 'pay3',
      businessName: 'Boutique Café',
      membershipType: 'business' as const,
      amount: 500000,
      paymentProofUrl: '/art.png', // Mock image
      paymentDate: '2024-01-13',
      businessOwner: 'Alice Johnson',
      email: 'alice@boutiquecafe.com'
    },
  ]

  const allBusinesses = [
    ...mockBusinesses.map(b => ({ ...b, status: 'active' as const })),
    ...pendingBusinesses
  ]

  // Filter businesses
  const filteredBusinesses = allBusinesses.filter(business => {
    const matchesSearch = searchQuery === '' ||
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || business.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (businessId: string) => {
    console.log('Approving business:', businessId)
    alert('Business approved successfully!')
    setSelectedBusiness(null)
  }

  const handleReject = (businessId: string) => {
    console.log('Rejecting business:', businessId)
    alert('Business rejected')
    setSelectedBusiness(null)
  }

  const handleSuspend = (businessId: string) => {
    console.log('Suspending business:', businessId)
    alert('Business suspended')
    setSelectedBusiness(null)
  }

  const handleVerifyPayment = (paymentId: string) => {
    console.log('Verifying payment:', paymentId)
    alert('Payment verified successfully! Membership activated.')
  }

  const handleRejectPayment = (paymentId: string) => {
    const reason = prompt('Enter rejection reason:')
    if (reason) {
      console.log('Rejecting payment:', paymentId, 'Reason:', reason)
      alert('Payment rejected. Business owner will be notified.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/admin" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Businesses</h1>
              <p className="text-gray-600 mt-1">{filteredBusinesses.length} businesses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('businesses')}
              className={`pb-4 px-2 font-semibold text-sm transition-colors relative ${
                activeTab === 'businesses'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Businesses
              {activeTab === 'businesses' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`pb-4 px-2 font-semibold text-sm transition-colors relative ${
                activeTab === 'payments'
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pending Payments
              {pendingPayments.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {pendingPayments.length}
                </span>
              )}
              {activeTab === 'payments' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Businesses Tab */}
        {activeTab === 'businesses' && (
          <>
        {/* Filters */}
        <Card padding="md" className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business name or category..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as BusinessStatus)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card padding="sm">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{allBusinesses.length}</p>
          </Card>
          <Card padding="sm">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {allBusinesses.filter(b => b.status === 'active').length}
            </p>
          </Card>
          <Card padding="sm">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {allBusinesses.filter(b => b.status === 'pending').length}
            </p>
          </Card>
          <Card padding="sm">
            <p className="text-sm text-gray-600">GSI Members</p>
            <p className="text-2xl font-bold text-primary-600">
              {allBusinesses.filter(b => 'isGsiMember' in b && b.isGsiMember).length}
            </p>
          </Card>
        </div>

        {/* Business List */}
        <div className="space-y-4">
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((business) => (
              <Card key={business.id} padding="md">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
                        <Badge 
                          variant={
                            business.status === 'active' ? 'success' :
                            business.status === 'pending' ? 'warning' : 'error'
                          }
                          size="sm"
                        >
                          {business.status}
                        </Badge>
                        {'isGsiMember' in business && business.isGsiMember && (
                          <Badge variant="primary" size="sm">
                            GSI Member
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{business.category}</p>
                      {'location' in business && business.location && (
                        <p className="text-sm text-gray-500">{business.location}</p>
                      )}
                      {'overallRating' in business && (
                        <div className="mt-2 flex items-center space-x-4 text-sm">
                          <span className="text-gray-600">
                            Rating: <span className="font-semibold text-gray-900">{business.overallRating.toFixed(1)}</span>/5
                          </span>
                          <span className="text-gray-600">
                            Reviews: <span className="font-semibold text-gray-900">{business.totalRatings}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {business.status === 'active' && (
                      <>
                        {'id' in business && typeof business.id === 'string' && !business.id.startsWith('p') && (
                          <Link href={`/business/${business.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </Link>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSuspend(business.id)}
                        >
                          Suspend
                        </Button>
                      </>
                    )}
                    {business.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReject(business.id)}
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleApprove(business.id)}
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card padding="lg" className="text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No businesses found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
            </Card>
          )}
        </div>
        </>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Pending Payment Verifications</h2>
              <p className="text-gray-600">Review and verify membership payments</p>
            </div>

            <div className="space-y-6">
              {pendingPayments.length > 0 ? (
                pendingPayments.map((payment) => (
                  <Card key={payment.id} padding="lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Payment Details */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {payment.businessName}
                            </h3>
                            <Badge 
                              variant={payment.membershipType === 'business' ? 'primary' : 'warning'}
                              size="sm"
                            >
                              {payment.membershipType === 'business' ? 'Business' : 'Corporate'} Membership
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-semibold text-gray-900">
                              {payment.amount.toLocaleString()} RWF
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Date:</span>
                            <span className="font-semibold text-gray-900">
                              {new Date(payment.paymentDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Business Owner:</span>
                            <span className="font-semibold text-gray-900">{payment.businessOwner}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-semibold text-gray-900">{payment.email}</span>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-3">Actions:</p>
                          <div className="flex space-x-3">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleVerifyPayment(payment.id)}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              Verify & Activate
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectPayment(payment.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject Payment
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Payment Proof Preview */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Payment Proof:</p>
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={payment.paymentProofUrl}
                            alt="Payment proof"
                            className="w-full h-80 object-contain bg-gray-50"
                          />
                        </div>
                        <a
                          href={payment.paymentProofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 mt-2"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Full Size
                        </a>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card padding="lg" className="text-center">
                  <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No pending payments</p>
                  <p className="text-sm text-gray-500 mt-1">All payments have been processed</p>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
