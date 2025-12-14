"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Signup() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      })

      const data = await response.json()

      if (data.success) {
        router.push('/LoginPage')
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-500 flex justify-center items-center px-4">
      
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
          Create Your Account ✨
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Join Book Valley and start your reading journey today!
        </p>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Create a password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Re-enter your password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        {/* Redirect to Login */}
        <p className="text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/LoginPage" className="text-indigo-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup