'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Users, 
  Building2, 
  Star, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { mockBusinesses, mockRatings } from '@/lib/utils/mock-data'

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')

  // Calculate stats
  const totalBusinesses = mockBusinesses.length
  const gsiMembers = mockBusinesses.filter(b => b.isGsiMember).length
  const pendingBusinesses = 3 // Mock
  const totalRatings = mockRatings.length
  const verifiedRatings = mockRatings.filter(r => r.status === 'verified').length
  const pendingRatings = mockRatings.filter(r => r.status === 'pending').length
  const flaggedRatings = mockRatings.filter(r => r.status === 'flagged').length
  const totalUsers = 1248 // Mock
  const averageRating = 4.5 // Mock

  // Recent activities mock
  const recentActivities = [
    { id: 1, type: 'business', action: 'New business registered', business: 'Café Connecté', time: '2 hours ago' },
    { id: 2, type: 'rating', action: 'Rating flagged for review', business: 'Heaven Restaurant', time: '3 hours ago' },
    { id: 3, type: 'member', action: 'Business approved as GSI member', business: 'Bourbon Coffee', time: '5 hours ago' },
    { id: 4, type: 'rating', action: '10 new ratings verified', business: 'Multiple businesses', time: '6 hours ago' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8" />
            <h1 className="text-3xl font-bold">GSI Admin Panel</h1>
          </div>
          <p className="text-gray-300">Platform management and oversight</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          <div className="flex space-x-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Businesses */}
          <Card padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              {pendingBusinesses > 0 && (
                <Badge variant="warning" size="sm">
                  {pendingBusinesses} pending
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Businesses</p>
            <p className="text-3xl font-bold text-gray-900">{totalBusinesses}</p>
            <p className="text-xs text-gray-500 mt-1">{gsiMembers} GSI members</p>
          </Card>

          {/* Total Users */}
          <Card padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="success" size="sm">
                +15%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">Active raters</p>
          </Card>

          {/* Total Ratings */}
          <Card padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-accent-600" />
              </div>
              {flaggedRatings > 0 && (
                <Badge variant="error" size="sm">
                  {flaggedRatings} flagged
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Ratings</p>
            <p className="text-3xl font-bold text-gray-900">{totalRatings}</p>
            <p className="text-xs text-gray-500 mt-1">{verifiedRatings} verified</p>
          </Card>

          {/* Average Rating */}
          <Card padding="md">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="success" size="sm">
                +0.2
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Platform Avg Rating</p>
            <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
            <p className="text-xs text-gray-500 mt-1">out of 5.0</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/businesses">
            <Card padding="md" hover className="cursor-pointer h-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Businesses</p>
                  <p className="text-xs text-gray-500">{pendingBusinesses} pending</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/ratings">
            <Card padding="md" hover className="cursor-pointer h-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Moderate Ratings</p>
                  <p className="text-xs text-gray-500">{pendingRatings + flaggedRatings} need review</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/members">
            <Card padding="md" hover className="cursor-pointer h-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Members</p>
                  <p className="text-xs text-gray-500">{totalUsers} users</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card padding="md" hover className="cursor-pointer h-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">View Analytics</p>
                  <p className="text-xs text-gray-500">Full reports</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card padding="md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                <Link href="/admin/activity" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'business' ? 'bg-primary-100' :
                      activity.type === 'rating' ? 'bg-accent-100' : 'bg-green-100'
                    }`}>
                      {activity.type === 'business' ? <Building2 className="w-5 h-5 text-primary-600" /> :
                       activity.type === 'rating' ? <Star className="w-5 h-5 text-accent-600" /> :
                       <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.business}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Alerts & Actions Needed */}
          <div className="space-y-6">
            {/* Pending Reviews */}
            {(pendingRatings > 0 || flaggedRatings > 0) && (
              <Card padding="md" className="bg-red-50 border-red-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Action Required</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      {pendingRatings + flaggedRatings} ratings need review
                    </p>
                    <Link href="/admin/ratings">
                      <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Review Now
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* Pending Businesses */}
            {pendingBusinesses > 0 && (
              <Card padding="md" className="bg-yellow-50 border-yellow-200">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Pending Approvals</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      {pendingBusinesses} businesses awaiting approval
                    </p>
                    <Link href="/admin/businesses">
                      <button className="text-sm bg-accent-400 hover:bg-accent-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition-colors">
                        Review Applications
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* System Health */}
            <Card padding="md">
              <h4 className="font-semibold text-gray-900 mb-4">System Health</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <Badge variant="success" size="sm">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API</span>
                  <Badge variant="success" size="sm">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auth Service</span>
                  <Badge variant="success" size="sm">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
