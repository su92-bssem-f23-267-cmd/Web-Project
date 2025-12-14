"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function AdminAnalytics() {
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
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
    fetchAnalytics(token)
  }, [router])

  const fetchAnalytics = async (token) => {
    try {
      const response = await fetch('/api/admin/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setStats(data.data)
      } else {
        setError(data.error || 'Failed to fetch analytics')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Error fetching analytics:', err)
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">Loading analytics...</div>
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
        
        <button 
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white text-2xl"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-8 mt-8 md:mt-0">
          <img src="/weblogo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Book Valley</h1>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-200">Logged in as</p>
          <p className="text-white font-semibold">{user.fullName}</p>
        </div>

        <nav className="space-y-3 mb-8">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-white/20 transition">
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
          <Link href="/admin/analytics" className="block px-4 py-3 bg-white/20 rounded-lg font-semibold">
            📈 Analytics
          </Link>
        </nav>

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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Analytics & Reports</h2>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Key Metrics */}
          {stats && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                
                {/* Total Revenue */}
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-md p-6 text-white">
                  <p className="text-sm opacity-90">Total Revenue</p>
                  <p className="text-3xl font-bold">PKR {(stats.totalRevenue || 0).toLocaleString()}</p>
                  <p className="text-xs mt-2">📈 All time revenue</p>
                </div>

                {/* Average Order Value */}
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md p-6 text-white">
                  <p className="text-sm opacity-90">Avg Order Value</p>
                  <p className="text-3xl font-bold">PKR {stats.avgOrderValue?.toLocaleString() || 0}</p>
                  <p className="text-xs mt-2">💳 Per transaction</p>
                </div>

                {/* Total Orders */}
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-md p-6 text-white">
                  <p className="text-sm opacity-90">Total Orders</p>
                  <p className="text-3xl font-bold">{stats.totalOrders || 0}</p>
                  <p className="text-xs mt-2">📦 Complete & pending</p>
                </div>

                {/* Conversion Rate */}
                <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-md p-6 text-white">
                  <p className="text-sm opacity-90">Conversion Rate</p>
                  <p className="text-3xl font-bold">{stats.conversionRate?.toFixed(2) || 0}%</p>
                  <p className="text-xs mt-2">🎯 Visitor to buyer</p>
                </div>

              </div>

              {/* Charts & Reports Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Orders by Status */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Orders by Status</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-semibold">Pending</span>
                        <span className="text-yellow-600 font-bold">{stats.ordersByStatus?.pending || 0}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${(stats.ordersByStatus?.pending || 0) / (stats.totalOrders || 1) * 100}%`}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-semibold">Processing</span>
                        <span className="text-blue-600 font-bold">{stats.ordersByStatus?.processing || 0}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(stats.ordersByStatus?.processing || 0) / (stats.totalOrders || 1) * 100}%`}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-semibold">Shipped</span>
                        <span className="text-purple-600 font-bold">{stats.ordersByStatus?.shipped || 0}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: `${(stats.ordersByStatus?.shipped || 0) / (stats.totalOrders || 1) * 100}%`}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-semibold">Delivered</span>
                        <span className="text-green-600 font-bold">{stats.ordersByStatus?.delivered || 0}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: `${(stats.ordersByStatus?.delivered || 0) / (stats.totalOrders || 1) * 100}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Selling Books */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Top Selling Books</h3>
                  <div className="space-y-3">
                    {(stats.topBooks || []).slice(0, 5).map((book, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-800">{idx + 1}. {book.title}</p>
                          <p className="text-sm text-gray-600">{book.sales || 0} sales</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">PKR {book.revenue?.toLocaleString() || 0}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Monthly Revenue Chart */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Revenue Trend</h3>
                <div className="flex items-end justify-between h-48 gap-2">
                  {(stats.monthlyRevenue || []).map((month, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t"
                        style={{
                          height: `${Math.max(20, (month.revenue / Math.max(...(stats.monthlyRevenue || []).map(m => m.revenue)) * 100)) || 0}%`
                        }}
                      ></div>
                      <p className="text-xs text-gray-600 mt-2">{month.month}</p>
                      <p className="text-xs font-semibold text-gray-800">{(month.revenue / 1000).toFixed(0)}K</p>
                    </div>
                  ))}
                </div>
              </div>

            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics
