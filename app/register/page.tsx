'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { User, Mail, Lock, Eye, EyeOff, Building2, UserCircle2, Check, Users, Award, Upload, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

type UserType = 'individual' | 'business'
type MembershipType = 'basic' | 'business' | 'corporate'
type RegistrationStep = 'userType' | 'membershipSelection' | 'details' | 'payment'

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('userType')
  const [userType, setUserType] = useState<UserType>('individual')
  const [membershipType, setMembershipType] = useState<MembershipType>('basic')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    agreeToTerms: '',
    paymentProof: '',
  })

  // Handle URL parameters on mount
  useEffect(() => {
    const type = searchParams.get('type') as UserType | null
    const membership = searchParams.get('membership') as MembershipType | null
    
    if (type === 'individual') {
      setUserType('individual')
      setMembershipType('basic')
      setCurrentStep('details')
    } else if (type === 'business') {
      setUserType('business')
      if (membership && ['basic', 'business', 'corporate'].includes(membership)) {
        setMembershipType(membership)
        setCurrentStep('details')
      } else {
        setCurrentStep('membershipSelection')
      }
    }
  }, [searchParams])

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type)
    if (type === 'individual') {
      setMembershipType('basic')
      setCurrentStep('details')
    } else {
      setCurrentStep('membershipSelection')
    }
  }

  const handleMembershipSelection = (type: MembershipType) => {
    setMembershipType(type)
    setCurrentStep('details')
  }

  const validateForm = () => {
    const newErrors = { fullName: '', email: '', password: '', confirmPassword: '', businessName: '', agreeToTerms: '' }
    let isValid = true
    if (!formData.fullName.trim()) { newErrors.fullName = 'Full name is required'; isValid = false }
    if (!formData.email) { newErrors.email = 'Email is required'; isValid = false }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'Email is invalid'; isValid = false }
    if (!formData.password) { newErrors.password = 'Password is required'; isValid = false }
    else if (formData.password.length < 8) { newErrors.password = 'Password must be at least 8 characters'; isValid = false }
    if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; isValid = false }
    if (userType === 'business' && !formData.businessName.trim()) { newErrors.businessName = 'Business name is required'; isValid = false }
    if (!formData.agreeToTerms) { newErrors.agreeToTerms = 'You must agree to the terms and conditions'; isValid = false }
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    // If paid membership, go to payment step
    if (userType === 'business' && membershipType !== 'basic') {
      setCurrentStep('payment')
      return
    }
    
    // Otherwise, complete registration
    await completeRegistration()
  }

  const completeRegistration = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Registration data:', { 
      ...formData, 
      userType, 
      membershipType,
      paymentProof: paymentProof ? 'uploaded' : 'none'
    })
    setIsLoading(false)
    alert('Registration successful! Please check your email to verify your account.')
    router.push('/login')
  }

  const handlePaymentProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, paymentProof: 'Please upload an image file' }))
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, paymentProof: 'File size must be less than 5MB' }))
        return
      }
      
      setPaymentProof(file)
      setErrors(prev => ({ ...prev, paymentProof: '' }))
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPaymentProofPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePaymentSubmit = async () => {
    if (!paymentProof) {
      setErrors(prev => ({ ...prev, paymentProof: 'Please upload proof of payment' }))
      return
    }
    
    await completeRegistration()
  }

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('details')
    } else if (currentStep === 'details') {
      if (userType === 'business') {
        setCurrentStep('membershipSelection')
      } else {
        setCurrentStep('userType')
      }
    } else if (currentStep === 'membershipSelection') {
      setCurrentStep('userType')
    }
  }

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

  const inputClass = (error: string) =>
    `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
      error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-gray-900 focus:ring-gray-200'
    }`

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <Card padding="lg" className="shadow-xl">
          {/* Step 1: User Type Selection */}
          {currentStep === 'userType' && (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h1>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">I am registering as:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleUserTypeSelection('individual')}
                    className="p-6 border-2 rounded-lg transition-all hover:shadow-lg border-gray-300 hover:border-gray-400"
                  >
                    <UserCircle2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="font-semibold text-gray-900 text-lg">Individual</p>
                    <p className="text-sm text-gray-600 mt-1">Rate businesses and share your experience</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUserTypeSelection('business')}
                    className="p-6 border-2 rounded-lg transition-all hover:shadow-lg border-gray-300 hover:border-gray-400"
                  >
                    <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="font-semibold text-gray-900 text-lg">Business</p>
                    <p className="text-sm text-gray-600 mt-1">Manage your business and improve service</p>
                  </button>
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-gray-900 hover:text-gray-600 font-semibold">Sign in</Link>
                </p>
              </div>
            </>
          )}

          {/* Step 2: Membership Selection (Business only) */}
          {currentStep === 'membershipSelection' && (
            <>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                >
                  ← Back
                </button>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Membership</h1>
              <p className="text-gray-600 mb-8">Select the plan that best fits your business needs</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Basic (No Membership) */}
                <button
                  type="button"
                  onClick={() => handleMembershipSelection('basic')}
                  className={`p-6 border-2 rounded-xl transition-all text-left ${
                    membershipType === 'basic' 
                      ? 'border-gray-900 shadow-lg' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
                  <p className="text-gray-600 text-sm mb-4">No membership required</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">Free</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Business profile listing</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Receive customer ratings</span>
                    </li>
                  </ul>
                </button>

                {/* Business Membership */}
                <button
                  type="button"
                  onClick={() => handleMembershipSelection('business')}
                  className={`p-6 border-2 rounded-xl transition-all text-left relative ${
                    membershipType === 'business' 
                      ? 'border-blue-600 shadow-lg bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-xl font-semibold text-xs">
                    POPULAR
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Business</h3>
                  <p className="text-gray-600 text-sm mb-4">For growing businesses</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">Contact Us</span>
                    <p className="text-xs text-gray-600 mt-1">Custom pricing</p>
                  </div>
                  <ul className="space-y-2">
                    {businessFeatures.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    <li className="text-sm text-gray-600">+ {businessFeatures.length - 4} more features</li>
                  </ul>
                </button>

                {/* Corporate Membership */}
                <button
                  type="button"
                  onClick={() => handleMembershipSelection('corporate')}
                  className={`p-6 border-2 rounded-xl transition-all text-left ${
                    membershipType === 'corporate' 
                      ? 'border-yellow-400 shadow-lg bg-yellow-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-yellow-800" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Corporate</h3>
                  <p className="text-gray-600 text-sm mb-4">For large organizations</p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">Enterprise</span>
                    <p className="text-xs text-gray-600 mt-1">Custom solutions</p>
                  </div>
                  <ul className="space-y-2">
                    {corporateFeatures.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-yellow-700 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    <li className="text-sm text-gray-600">+ {corporateFeatures.length - 4} more features</li>
                  </ul>
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  💡 You can start with a basic account and upgrade to a membership plan anytime from your dashboard
                </p>
              </div>
            </>
          )}

          {/* Step 3: Registration Details */}
          {currentStep === 'details' && (
            <>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                >
                  ← Back
                </button>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Registration</h1>
              <p className="text-gray-600 mb-6">
                {userType === 'individual' ? 'Individual Account' : 
                  `Business Account ${membershipType === 'basic' ? '(No Membership)' : 
                  membershipType === 'business' ? '(Business Membership)' : '(Corporate Membership)'}`}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} placeholder="Enter your full name" className={inputClass(errors.fullName)} />
                  </div>
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                {/* Business Name */}
                {userType === 'business' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" value={formData.businessName} onChange={(e) => handleChange('businessName', e.target.value)} placeholder="Enter your business name" className={inputClass(errors.businessName)} />
                    </div>
                    {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Enter your email" className={inputClass(errors.email)} />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="Create password" className={`${inputClass(errors.password)} pr-12`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} placeholder="Confirm password" className={`${inputClass(errors.confirmPassword)} pr-12`} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Membership Info for paid plans */}
                {userType === 'business' && membershipType !== 'basic' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 font-medium mb-1">
                      {membershipType === 'business' ? 'Business Membership Selected' : 'Corporate Membership Selected'}
                    </p>
                    <p className="text-sm text-blue-700">
                      After completing your details, you'll proceed to payment via Mobile Money.
                    </p>
                  </div>
                )}

                {/* Terms */}
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" checked={formData.agreeToTerms} onChange={(e) => handleChange('agreeToTerms', e.target.checked)} className="w-4 h-4 mt-0.5 border-gray-300 rounded" />
                    <span className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms" className="text-gray-900 hover:text-gray-600 font-medium">Terms and Conditions</Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-gray-900 hover:text-gray-600 font-medium">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                </div>

                <Button type="submit" variant="accent" size="lg" fullWidth disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 
                    (userType === 'business' && membershipType !== 'basic' ? 'Continue to Payment' : 'Create Account')}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-gray-900 hover:text-gray-600 font-semibold">Sign in</Link>
                </p>
              </div>
            </>
          )}

          {/* Step 4: Payment (Paid Memberships Only) */}
          {currentStep === 'payment' && (
            <>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                >
                  ← Back
                </button>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h1>
              <p className="text-gray-600 mb-6">
                {membershipType === 'business' ? 'Business Membership' : 'Corporate Membership'} Payment
              </p>

              <div className="space-y-6">
                {/* Payment Amount */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {membershipType === 'business' ? 'Business Membership' : 'Corporate Membership'}
                      </h3>
                      <p className="text-sm text-gray-600">Annual Subscription</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {membershipType === 'business' ? '500,000' : '2,000,000'} RWF
                      </p>
                      <p className="text-xs text-gray-500">per year</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        All premium features included
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        Priority customer support
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        Advanced analytics dashboard
                      </li>
                    </ul>
                  </div>
                </div>

                {/* MoMo Payment Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Pay with MTN Mobile Money</h3>
                  
                  {/* QR Code Placeholder */}
                  <div className="bg-white rounded-lg p-6 mb-4 text-center">
                    <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center mb-4">
                      {/* Placeholder for QR Code - In production, this would be a real QR code */}
                      <div className="text-center">
                        <div className="w-40 h-40 bg-white border border-gray-400 mx-auto mb-2 flex items-center justify-center">
                          <span className="text-xs text-gray-500">QR CODE</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">MTN Mobile Money</p>
                    <p className="text-lg font-bold text-gray-900">078 XXX XXXX</p>
                  </div>

                  {/* Payment Steps */}
                  <div className="space-y-3 text-sm text-gray-700">
                    <p className="font-semibold text-gray-900">How to pay:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li>Open your MTN Mobile Money app</li>
                      <li>Scan the QR code above or use the number provided</li>
                      <li>Enter the amount: <span className="font-bold">{membershipType === 'business' ? '500,000' : '2,000,000'} RWF</span></li>
                      <li>Complete the payment</li>
                      <li>Take a screenshot of the confirmation message</li>
                      <li>Upload the screenshot below</li>
                    </ol>
                  </div>
                </div>

                {/* Upload Proof of Payment */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Proof of Payment</h3>
                  
                  {!paymentProofPreview ? (
                    <div className="text-center">
                      <label htmlFor="payment-proof" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-400 mb-3" />
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </label>
                      <input
                        id="payment-proof"
                        type="file"
                        accept="image/*"
                        onChange={handlePaymentProofUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={paymentProofPreview}
                          alt="Payment proof"
                          className="w-full max-h-64 object-contain rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentProof(null)
                            setPaymentProofPreview(null)
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Payment proof uploaded successfully
                      </div>
                    </div>
                  )}
                  
                  {errors.paymentProof && (
                    <p className="mt-2 text-sm text-red-600">{errors.paymentProof}</p>
                  )}
                </div>

                {/* Important Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Your account will be activated within 24 hours after our team verifies your payment.
                    You'll receive an email confirmation once your membership is active.
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="button"
                  onClick={handlePaymentSubmit}
                  variant="accent" 
                  size="lg" 
                  fullWidth 
                  disabled={isLoading || !paymentProof}
                >
                  {isLoading ? 'Submitting...' : 'Complete Registration'}
                </Button>
              </div>
            </>
          )}
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-500 hover:text-gray-900 text-sm">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
