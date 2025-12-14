"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (!userData || !token) {
      router.push('/LoginPage')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/')
      return
    }

    setUser(parsedUser)
    fetchDashboardData(token)
  }, [router])

  const fetchDashboardData = async (token) => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setStats(data.data.stats)
      } else {
        setError(data.error || 'Failed to fetch dashboard data')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Error fetching dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/LoginPage')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-purple-700 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading Admin Dashboard...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gradient-to-b from-indigo-800 to-purple-800 text-white p-6 shadow-lg fixed md:static top-0 left-0 h-screen z-40`}>
        
        {/* Close Button for Mobile */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white text-2xl"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 mt-8 md:mt-0">
          <img src="/weblogo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Book Valley</h1>
        </div>

        {/* Admin Info */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-200">Logged in as</p>
          <p className="text-white font-semibold">{user.fullName}</p>
          <p className="text-xs text-gray-300">{user.email}</p>
          <p className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded mt-2 inline-block font-semibold">
            ADMIN
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-3 mb-8">
          <Link href="/admin" className="block px-4 py-3 bg-white/20 rounded-lg font-semibold hover:bg-white/30 transition">
            📊 Dashboard
          </Link>
          <Link href="/admin/orders" className="block px-4 py-3 rounded-lg hover:bg-white/20 transition">
            📦 Orders
          </Link>
          <Link href="/admin/books" className="block px-4 py-3 rounded-lg hover:bg-white/20 transition">
            📚 Books
          </Link>
          <Link href="/admin/users" className="block px-4 py-3 rounded-lg hover:bg-white/20 transition">
            👥 Users
          </Link>
          <Link href="/admin/analytics" className="block px-4 py-3 rounded-lg hover:bg-white/20 transition">
            📈 Analytics
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        
        {/* Top Bar */}
        <div className="bg-white shadow-md p-4 md:p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-2xl text-gray-700"
            >
              ☰
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          </div>
          <p className="text-gray-600">👋 Welcome, {user.fullName}!</p>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              
              {/* Total Users Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalUsers || 0}</p>
                  </div>
                  <div className="text-4xl">👥</div>
                </div>
              </div>

              {/* Total Books Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Books</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalBooks || 0}</p>
                  </div>
                  <div className="text-4xl">📚</div>
                </div>
              </div>

              {/* Total Orders Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalOrders || 0}</p>
                  </div>
                  <div className="text-4xl">📦</div>
                </div>
              </div>

              {/* Total Revenue Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600">
                      PKR {(stats.totalRevenue || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-4xl">💰</div>
                </div>
              </div>

              {/* Pending Orders Card */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Pending Orders</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders || 0}</p>
                  </div>
                  <div className="text-4xl">⏳</div>
                </div>
              </div>

            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/admin/books" 
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-center"
              >
                ➕ Add New Book
              </Link>
              <Link 
                href="/admin/orders" 
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition text-center"
              >
                📋 View Orders
              </Link>
              <Link 
                href="/admin/users" 
                className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition text-center"
              >
                👥 Manage Users
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
