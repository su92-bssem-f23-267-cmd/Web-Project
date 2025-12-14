"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/LoginPage')
      return
    }
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setCartItems(data.data || [])
      }
    } catch (err) {
      setError('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        fetchCart()
      }
    } catch (err) {
      setError('Failed to remove item')
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/cart/update/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      })
      const data = await response.json()
      if (data.success) {
        fetchCart()
      }
    } catch (err) {
      setError('Failed to update quantity')
    }
  }

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear cart?')) return
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/cart/clear', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setCartItems([])
      }
    } catch (err) {
      setError('Failed to clear cart')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shippingCost = 200
  const total = subtotal + shippingCost

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError('Cart is empty')
      return
    }
    router.push(`/Payment?total=${subtotal}&items=${cartItems.length}`)
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-blue-100'>
        <div className='text-center'>
          <div className='animate-spin text-4xl mb-4'>⏳</div>
          <p className='text-gray-600 font-semibold'>Loading cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 py-10 px-4 pt-28'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='mb-10'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-2'>
            Shopping Cart 🛒
          </h1>
          <p className='text-gray-600 text-lg'>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-8'>
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
            <div className='text-6xl mb-4'>📚</div>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>Your cart is empty</h2>
            <p className='text-gray-600 mb-6'>Start shopping and add some books to your cart!</p>
            <Link
              href='/'
              className='inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all'
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2'>
              <div className='space-y-4'>
                {cartItems.map((item) => (
                  <div key={item.id} className='bg-white rounded-xl shadow-md p-6 flex gap-6'>
                    {/* Book Image */}
                    <div className='w-20 h-28 flex-shrink-0'>
                      <img
                        src={item.image || '/book-placeholder.jpg'}
                        alt={item.title}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    </div>

                    {/* Item Details */}
                    <div className='flex-grow'>
                      <h3 className='text-lg font-bold text-gray-800 mb-2'>{item.title}</h3>
                      <p className='text-gray-600 text-sm mb-4'>{item.author || 'Unknown Author'}</p>

                      {/* Quantity Control */}
                      <div className='flex items-center gap-4'>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className='bg-gray-200 text-gray-800 w-8 h-8 rounded-lg hover:bg-gray-300'
                        >
                          −
                        </button>
                        <span className='font-semibold text-gray-800 w-8 text-center'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className='bg-gray-200 text-gray-800 w-8 h-8 rounded-lg hover:bg-gray-300'
                        >
                          +
                        </button>
                        <span className='text-gray-600 text-sm ml-4'>PKR {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className='text-right'>
                      <p className='text-xl font-bold text-indigo-600 mb-4'>
                        PKR {item.price?.toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className='text-red-500 hover:text-red-700 font-semibold text-sm'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className='mt-4 text-red-500 hover:text-red-700 font-semibold'
              >
                Clear entire cart
              </button>
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-2xl shadow-lg p-8 sticky top-32'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6'>Order Summary</h2>

                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-gray-700'>
                    <span>Subtotal</span>
                    <span className='font-semibold'>PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between text-gray-700'>
                    <span>Shipping</span>
                    <span className='font-semibold'>PKR {shippingCost.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between text-gray-700'>
                    <span>Tax</span>
                    <span className='font-semibold'>PKR 0</span>
                  </div>
                </div>

                <div className='border-t-2 border-gray-200 pt-4 mb-6'>
                  <div className='flex justify-between items-center text-xl'>
                    <span className='font-bold'>Total:</span>
                    <span className='font-bold text-green-600'>PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all duration-300 mb-3'
                >
                  Proceed to Payment 💳
                </button>

                {/* Continue Shopping */}
                <Link
                  href='/'
                  className='block w-full text-center bg-gray-200 text-gray-800 py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all'
                >
                  Continue Shopping
                </Link>

                {/* Security */}
                <div className='mt-6 bg-green-50 border border-green-200 rounded-lg p-4'>
                  <p className='text-sm text-green-700 flex items-center gap-2'>
                    🔒 Secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
