"use client"
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function AdminUsers() {
  const router = useRouter()
  const [users, setUsers] = useState([])
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
    fetchUsers(token)
  }, [router])

  const fetchUsers = async (token) => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setUsers(data.data.users || [])
      } else {
        setError(data.error || 'Failed to fetch users')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Error fetching users:', err)
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
        <div className="text-2xl font-bold text-gray-700">Loading users...</div>
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
          <Link href="/admin/users" className="block px-4 py-3 bg-white/20 rounded-lg font-semibold">
            👥 Users
          </Link>
          <Link href="/admin/analytics" className="block px-4 py-3 rounded-lg hover:bg-white/20 transition">
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Users Management</h2>
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

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {users.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-xl">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Name</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Email</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Phone</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Role</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Joined</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userItem, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800 font-semibold">{userItem.fullName}</td>
                        <td className="px-4 py-3 text-gray-700">{userItem.email}</td>
                        <td className="px-4 py-3 text-gray-700">{userItem.phone || 'N/A'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            userItem.role === 'admin' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'
                          }`}>
                            {userItem.role === 'admin' ? '👑 Admin' : '👤 User'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-sm">{new Date(userItem.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
