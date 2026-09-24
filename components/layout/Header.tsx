'use client'

import Link from 'next/link'
import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">GSI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-500 font-medium transition-colors">Home</Link>
            <Link href="/find" className="text-gray-700 hover:text-gray-500 font-medium transition-colors">Find a Business</Link>
            <Link href="/rate" className="text-gray-700 hover:text-gray-500 font-medium transition-colors">Rate a Business</Link>
            <Link href="/businesses" className="text-gray-700 hover:text-gray-500 font-medium transition-colors">Businesses</Link>
            <Link href="/membership" className="text-gray-700 hover:text-gray-500 font-medium transition-colors">Membership</Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="flex items-center space-x-1 text-gray-700 hover:text-gray-500 font-medium transition-colors">
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
            <Link href="/rate" className="bg-accent-400 hover:bg-accent-500 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm">
              Rate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-transparent">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-transparent border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block py-2 text-gray-700 hover:text-gray-500 font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/find" className="block py-2 text-gray-700 hover:text-gray-500 font-medium" onClick={() => setMobileMenuOpen(false)}>Find a Business</Link>
            <Link href="/rate" className="block py-2 text-gray-700 hover:text-gray-500 font-medium" onClick={() => setMobileMenuOpen(false)}>Rate a Business</Link>
            <Link href="/businesses" className="block py-2 text-gray-700 hover:text-gray-500 font-medium" onClick={() => setMobileMenuOpen(false)}>Businesses</Link>
            <Link href="/membership" className="block py-2 text-gray-700 hover:text-gray-500 font-medium" onClick={() => setMobileMenuOpen(false)}>Membership</Link>
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link href="/login" className="block py-2 text-gray-700 hover:text-gray-500 font-medium" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link href="/rate" className="block w-full bg-accent-400 hover:bg-accent-500 text-gray-900 px-4 py-2 rounded-lg font-semibold text-center" onClick={() => setMobileMenuOpen(false)}>Rate Now</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
