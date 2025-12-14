"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function AdminBooks() {
  const router = useRouter()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    stockQuantity: '',
    description: '',
    category: '',
    coverImage: '',
    featured: false
  })

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
    fetchBooks(token)
  }, [router])

  const fetchBooks = async (token) => {
    try {
      const response = await fetch('/api/books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (data.success) {
        setBooks(data.data || [])
      } else {
        setError(data.error || 'Failed to fetch books')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Error fetching books:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/LoginPage')
  }

  const handleAddBook = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/books', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert('Book added successfully!')
        setFormData({
          title: '',
          author: '',
          price: '',
          stockQuantity: '',
          description: '',
          category: '',
          coverImage: '',
          featured: false
        })
        setShowForm(false)
        fetchBooks(token)
      } else {
        alert(data.error || 'Failed to add book')
      }
    } catch (err) {
      alert('Error adding book: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">Loading books...</div>
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
          <Link href="/admin/books" className="block px-4 py-3 bg-white/20 rounded-lg font-semibold">
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Books Management</h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {showForm ? '❌ Cancel' : '➕ Add Book'}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Add Book Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h3>
              <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <input
                  type="text"
                  placeholder="Book Title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                  type="text"
                  placeholder="Author Name"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                  type="number"
                  placeholder="Price (PKR)"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                  type="number"
                  placeholder="Stock Quantity"
                  required
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({...formData, stockQuantity: parseInt(e.target.value)})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  <option value="Novel Books">Novel Books</option>
                  <option value="Islamic Books">Islamic Books</option>
                  <option value="Medical Books">Medical Books</option>
                  <option value="Story Books">Story Books</option>
                  <option value="Educational Books">Educational Books</option>
                  <option value="Computer Books">Computer Books</option>
                </select>

                <input
                  type="text"
                  placeholder="Cover Image URL"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <textarea
                  placeholder="Book Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                />

                <label className="flex items-center gap-2 md:col-span-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700">Mark as Featured</span>
                </label>

                <button
                  type="submit"
                  className="md:col-span-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Add Book
                </button>
              </form>
            </div>
          )}

          {/* Books Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {books.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="text-xl">No books found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Title</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Author</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Price</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Stock</th>
                      <th className="px-4 py-3 text-left text-gray-800 font-semibold">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800 font-semibold">{book.title}</td>
                        <td className="px-4 py-3 text-gray-700">{book.author || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-700">PKR {book.price?.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            book.stockQuantity > 10 ? 'bg-green-200 text-green-800' :
                            book.stockQuantity > 0 ? 'bg-yellow-200 text-yellow-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {book.stockQuantity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{book.category?.name || 'Uncategorized'}</td>
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

export default AdminBooks
