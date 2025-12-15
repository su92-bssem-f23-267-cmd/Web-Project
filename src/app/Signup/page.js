"use client"
export const dynamic = "force-dynamic";

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (data.success) {
        // Signup successful, redirect to login
        router.push('/LoginPage')
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-500 flex justify-center items-center px-4 py-10">
      
      {/* Signup Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 flex flex-col items-center transition-transform duration-300 hover:scale-[1.02]">
        
        {/* Logo */}
        <img 
          src="/weblogo.png" 
          alt="Book Valley Logo" 
          className="w-20 h-20 mb-4"
        />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Create Account 📚
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Join Book Valley and start your reading journey
        </p>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              placeholder="Enter your full name" 
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Enter your password (min 6 characters)" 
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm your password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Signup Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-md disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center w-full">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Signup */}
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium shadow hover:scale-105 transition-transform duration-200">
            <i className="fab fa-facebook-f mr-2"></i> Facebook
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium shadow hover:scale-105 transition-transform duration-200">
            <i className="fab fa-google mr-2"></i> Google
          </button>
        </div>

        {/* Login Redirect */}
        <p className="text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/LoginPage" className="text-indigo-600 font-semibold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
