'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Building2, MapPin, Phone, Globe, Image } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { CATEGORIES } from '@/lib/constants/categories'
import { mockBusinesses } from '@/lib/utils/mock-data'

// Mock business owner data
const currentBusinessId = '1'

export default function BusinessSettingsPage() {
  const business = mockBusinesses.find(b => b.id === currentBusinessId)

  const [formData, setFormData] = useState({
    name: business?.name || '',
    category: business?.category || '',
    description: business?.description || '',
    location: business?.location || '',
    phone: business?.phone || '',
    website: business?.website || '',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Saving business settings:', formData)
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  const categoryOptions = CATEGORIES.map(cat => ({
    value: cat.label,
    label: cat.label
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/business/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Business Settings</h1>
          <p className="text-gray-600 mt-1">Manage your business information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          {/* Basic Information */}
          <Card padding="lg" className="mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
            </div>

            <div className="space-y-6">
              <Input
                label="Business Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter business name"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  required
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe your business..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.description.length} / 500 characters
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card padding="lg" className="mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <Phone className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-10 w-5 h-5 text-gray-400" />
                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g., KG 5 Ave, Kigali"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-10 w-5 h-5 text-gray-400" />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+250 XXX XXX XXX"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Globe className="absolute left-3 top-10 w-5 h-5 text-gray-400" />
                <Input
                  label="Website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://example.com"
                  className="pl-10"
                />
              </div>
            </div>
          </Card>

          {/* Logo Upload */}
          <Card padding="lg" className="mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <Image className="w-5 h-5 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Business Logo</h2>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-3">
                  Upload your business logo. Recommended size: 400x400px
                </p>
                <Button variant="outline" size="sm" type="button">
                  Upload Logo
                </Button>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex items-center justify-end space-x-4">
            <Link href="/business/dashboard">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button variant="primary" type="submit" disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
