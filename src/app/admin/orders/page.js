"use client"
export const dynamic = "force-dynamic";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function AdminOrders() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState('')

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
    fetchOrders(token)
  }, [router])

  const fetchOrders = async (token) => {
    try {
      const response = await fetch('/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setOrders(data.data.orders || [])
      } else {
        setError(data.error || 'Failed to fetch orders')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/LoginPage')
  }

  const handleUpdateStatus = async (orderId) => {
    if (!newStatus) {
      alert('Please select a status')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderStatus: newStatus })
      })

      const data = await response.json()

      if (data.success) {
        alert('Order status updated successfully!')
        setSelectedOrder(null)
        setNewStatus('')
        fetchOrders(token)
      } else {
        alert(data.error || 'Failed to update order')
      }
    } catch (err) {
      alert('Error updating order: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">Loading orders...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter)

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
          <Link href="/admin/orders" className="block px-4 py-3 bg-white/20 rounded-lg font-semibold">
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Orders Management</h2>
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

          {/* Filter */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <label className="text-gray-700 font-semibold">Filter by Status:</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-xl">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Order ID</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">User</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Total</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Date</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800 font-semibold">{order.id?.slice(0, 8)}...</td>
                        <td className="px-4 py-3 text-gray-700">{order.userId}</td>
                        <td className="px-4 py-3 text-gray-700">PKR {order.totalAmount?.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                            order.status === 'processing' ? 'bg-blue-200 text-blue-800' :
                            order.status === 'shipped' ? 'bg-purple-200 text-purple-800' :
                            order.status === 'delivered' ? 'bg-green-200 text-green-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => {
                              setSelectedOrder(order.id)
                              setNewStatus(order.status)
                            }}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-semibold"
                          >
                            Update
                          </button>
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

      {/* Update Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Update Order Status</h3>
            
            <select 
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="flex gap-4">
              <button
                onClick={() => handleUpdateStatus(selectedOrder)}
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setSelectedOrder(null)
                  setNewStatus('')
                }}
                className="flex-1 px-4 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders
