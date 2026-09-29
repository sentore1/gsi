'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, Users, UserCircle2, Building2, Shield, Mail, Calendar, MoreVertical } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

type UserTypeFilter = 'all' | 'individual' | 'business' | 'admin'

// Mock users data
const mockUsers = [
  { id: 'u1', fullName: 'John Doe', email: 'john@example.com', userType: 'individual' as const, joinedAt: '2024-01-10', totalRatings: 12, status: 'active' },
  { id: 'u2', fullName: 'Jane Smith', email: 'jane@example.com', userType: 'individual' as const, joinedAt: '2024-01-14', totalRatings: 8, status: 'active' },
  { id: 'u3', fullName: 'Peter Johnson', email: 'peter@example.com', userType: 'individual' as const, joinedAt: '2024-02-01', totalRatings: 23, status: 'active' },
  { id: 'u4', fullName: 'Alice Brown', email: 'alice@example.com', userType: 'individual' as const, joinedAt: '2024-02-10', totalRatings: 5, status: 'active' },
  { id: 'u5', fullName: 'Marriott Hotel Kigali', email: 'info@marriott.rw', userType: 'business' as const, joinedAt: '2024-01-15', totalRatings: 0, status: 'active' },
  { id: 'u6', fullName: 'Heaven Restaurant', email: 'info@heaven.rw', userType: 'business' as const, joinedAt: '2023-11-20', totalRatings: 0, status: 'active' },
  { id: 'u7', fullName: 'Bourbon Coffee', email: 'info@bourbon.rw', userType: 'business' as const, joinedAt: '2024-03-01', totalRatings: 0, status: 'active' },
  { id: 'u8', fullName: 'Bob Wilson', email: 'bob@example.com', userType: 'individual' as const, joinedAt: '2024-03-05', totalRatings: 1, status: 'suspended' },
  { id: 'u9', fullName: 'GSI Admin', email: 'gsi@gmail.com', userType: 'admin' as const, joinedAt: '2024-01-01', totalRatings: 0, status: 'active' },
]

export default function AdminMembersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<UserTypeFilter>('all')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch =
      searchQuery === '' ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || user.userType === typeFilter
    return matchesSearch && matchesType
  })

  const handleSuspend = (userId: string) => {
    alert(`User ${userId} suspended.`)
  }

  const handleActivate = (userId: string) => {
    alert(`User ${userId} activated.`)
  }

  const typeIcon = (type: string) => {
    if (type === 'admin') return <Shield className="w-5 h-5 text-white" />
    if (type === 'business') return <Building2 className="w-5 h-5 text-white" />
    return <UserCircle2 className="w-5 h-5 text-white" />
  }

  const typeBg = (type: string) => {
    if (type === 'admin') return 'bg-gray-900'
    if (type === 'business') return 'bg-blue-600'
    return 'bg-green-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Members</h1>
              <p className="text-gray-600 mt-1">{filteredUsers.length} members</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card padding="sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-xl font-bold text-gray-900">{mockUsers.length}</p>
              </div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <UserCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Individuals</p>
                <p className="text-xl font-bold text-gray-900">{mockUsers.filter(u => u.userType === 'individual').length}</p>
              </div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Businesses</p>
                <p className="text-xl font-bold text-gray-900">{mockUsers.filter(u => u.userType === 'business').length}</p>
              </div>
            </div>
          </Card>
          <Card padding="sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Suspended</p>
                <p className="text-xl font-bold text-gray-900">{mockUsers.filter(u => u.status === 'suspended').length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card padding="md" className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as UserTypeFilter)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Members List */}
        <div className="space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Card key={user.id} padding="md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${typeBg(user.userType)}`}>
                      {typeIcon(user.userType)}
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-gray-900">{user.fullName}</h3>
                        <Badge
                          variant={
                            user.userType === 'admin' ? 'primary' :
                            user.userType === 'business' ? 'primary' : 'success'
                          }
                          size="sm"
                        >
                          {user.userType}
                        </Badge>
                        {user.status === 'suspended' && (
                          <Badge variant="error" size="sm">Suspended</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </span>
                        {user.userType === 'individual' && (
                          <span>{user.totalRatings} ratings submitted</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {user.userType !== 'admin' && (
                      user.status === 'active' ? (
                        <Button variant="outline" size="sm" onClick={() => handleSuspend(user.id)}>
                          Suspend
                        </Button>
                      ) : (
                        <Button variant="primary" size="sm" onClick={() => handleActivate(user.id)}>
                          Activate
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card padding="lg" className="text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No members found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
