"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        
        if (data.data.user.role === 'admin') {
          alert('Admin Login Successful! 🎉')
          router.push('/')
        } else {
          alert('Login Successful! 🎉')
          router.push('/')
        }
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-500 flex justify-center items-center px-4">
      
      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 flex flex-col items-center transition-transform duration-300 hover:scale-[1.02]">
        
        {/* Logo */}
        <img 
          src="/weblogo.png" 
          alt="Book Valley Logo" 
          className="w-20 h-20 mb-4"
        />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Welcome Back 📚
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign in to continue exploring Book Valley
        </p>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
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
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-indigo-600 hover:underline text-sm font-medium">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-md disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center w-full">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium shadow hover:scale-105 transition-transform duration-200">
            <i className="fab fa-facebook-f mr-2"></i> Facebook
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium shadow hover:scale-105 transition-transform duration-200">
            <i className="fab fa-google mr-2"></i> Google
          </button>
        </div>

        {/* Signup Redirect */}
        <p className="text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage