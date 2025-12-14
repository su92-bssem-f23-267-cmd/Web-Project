"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    email: '',
    phone: ''
  })

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPasswordToggle, setShowPasswordToggle] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setPaymentDetails(prev => ({
        ...prev,
        email: parsedUser.email || ''
      }))
      setShippingAddress(prev => ({
        ...prev,
        fullName: parsedUser.fullName || ''
      }))
    }

    // Get order data from URL params
    const cartTotal = searchParams.get('total')
    if (cartTotal) {
      setOrderData({
        subtotal: parseFloat(cartTotal) || 0,
        shippingCost: 200,
        totalAmount: (parseFloat(cartTotal) || 0) + 200,
        items: parseInt(searchParams.get('items')) || 0
      })
    }
  }, [searchParams])

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validatePayment = () => {
    if (!paymentDetails.cardName.trim()) {
      setError('Card holder name is required')
      return false
    }
    if (!paymentDetails.cardNumber.replace(/\s/g, '').match(/^\d{13,19}$/)) {
      setError('Invalid card number (13-19 digits)')
      return false
    }
    if (!paymentDetails.expiryMonth || !paymentDetails.expiryYear) {
      setError('Please select expiry date')
      return false
    }
    if (!paymentDetails.cvv.match(/^\d{3,4}$/)) {
      setError('CVV must be 3-4 digits')
      return false
    }
    if (!paymentDetails.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Invalid email address')
      return false
    }
    if (!paymentDetails.phone.match(/^\d{10,}$/)) {
      setError('Phone number must have at least 10 digits')
      return false
    }
    if (!shippingAddress.fullName.trim()) {
      setError('Shipping full name is required')
      return false
    }
    if (!shippingAddress.address.trim()) {
      setError('Shipping address is required')
      return false
    }
    if (!shippingAddress.city.trim()) {
      setError('City is required')
      return false
    }
    if (!shippingAddress.state.trim()) {
      setError('State is required')
      return false
    }
    if (!shippingAddress.zipCode.match(/^\d{4,}$/)) {
      setError('Invalid zip code')
      return false
    }
    return true
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setError('')

    if (!validatePayment()) {
      return
    }

    setLoading(true)

    try {
      // Here you would integrate with your payment gateway (Stripe, JazzCash, etc.)
      // For now, we'll just process the order
      const token = localStorage.getItem('token')
      
      // Get cart items
      const cartResponse = await fetch('/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const cartData = await cartResponse.json()
      
      const items = cartData.data || []

      // Create order
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: items,
          shippingAddress: shippingAddress,
          paymentMethod: 'card'
        })
      })

      const orderResult = await orderResponse.json()

      if (orderResult.success) {
        // Store payment details (in real app, send to payment gateway)
        const paymentRecord = {
          orderId: orderResult.data.orderId,
          orderNumber: orderResult.data.orderNumber,
          cardLast4: paymentDetails.cardNumber.slice(-4),
          amount: orderResult.data.totalAmount,
          timestamp: new Date().toISOString()
        }

        localStorage.setItem('lastPayment', JSON.stringify(paymentRecord))
        
        // Redirect to success page
        router.push(`/payment/success?orderId=${orderResult.data.orderId}&orderNumber=${orderResult.data.orderNumber}`)
      } else {
        setError(orderResult.error || 'Payment failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i)

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 py-10 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-10'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-2'>
            Complete Your Payment 💳
          </h1>
          <p className='text-gray-600 text-lg'>
            Secure checkout for Book Valley
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Payment Form */}
          <div className='lg:col-span-2'>
            <form onSubmit={handlePayment} className='space-y-8'>
              {/* Error Message */}
              {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl'>
                  {error}
                </div>
              )}

              {/* Card Details Section */}
              <div className='bg-white rounded-2xl shadow-lg p-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                  💳 Card Details
                </h2>

                <div className='space-y-5'>
                  {/* Card Holder Name */}
                  <div>
                    <label className='block text-gray-700 font-semibold mb-2'>
                      Card Holder Name
                    </label>
                    <input
                      type='text'
                      name='cardName'
                      value={paymentDetails.cardName}
                      onChange={handlePaymentChange}
                      placeholder='John Doe'
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className='block text-gray-700 font-semibold mb-2'>
                      Card Number
                    </label>
                    <input
                      type='text'
                      name='cardNumber'
                      value={paymentDetails.cardNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\s/g, '')
                        // Add spaces every 4 digits
                        value = value.replace(/(\d{4})/g, '$1 ').trim()
                        setPaymentDetails(prev => ({
                          ...prev,
                          cardNumber: value
                        }))
                      }}
                      placeholder='1234 5678 9012 3456'
                      maxLength='23'
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono'
                      required
                    />
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Month
                      </label>
                      <select
                        name='expiryMonth'
                        value={paymentDetails.expiryMonth}
                        onChange={handlePaymentChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        required
                      >
                        <option value=''>Select Month</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                          <option key={month} value={month}>
                            {String(month).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Year
                      </label>
                      <select
                        name='expiryYear'
                        value={paymentDetails.expiryYear}
                        onChange={handlePaymentChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        required
                      >
                        <option value=''>Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        CVV
                      </label>
                      <input
                        type={showPasswordToggle ? 'text' : 'password'}
                        name='cvv'
                        value={paymentDetails.cvv}
                        onChange={handlePaymentChange}
                        placeholder='123'
                        maxLength='4'
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono'
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className='bg-white rounded-2xl shadow-lg p-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                  📧 Contact Details
                </h2>

                <div className='space-y-5'>
                  {/* Email */}
                  <div>
                    <label className='block text-gray-700 font-semibold mb-2'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={paymentDetails.email}
                      onChange={handlePaymentChange}
                      placeholder='your@email.com'
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className='block text-gray-700 font-semibold mb-2'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={paymentDetails.phone}
                      onChange={handlePaymentChange}
                      placeholder='+92 300 1234567'
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className='bg-white rounded-2xl shadow-lg p-8'>
                <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                  📍 Shipping Address
                </h2>

                <div className='space-y-5'>
                  {/* Full Name */}
                  <div>
                    <label className='block text-gray-700 font-semibold mb-2'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      name='fullName'
                      value={shippingAddress.fullName}
                      onChange={handleAddressChange}
                      placeholder='John Doe'
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className='block text-gray-700 font-semibold mb-2'>
                      Street Address
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={shippingAddress.address}
                      onChange={handleAddressChange}
                      placeholder='123 Main Street'
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  {/* City, State, Zip */}
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        City
                      </label>
                      <input
                        type='text'
                        name='city'
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        placeholder='Karachi'
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        State
                      </label>
                      <input
                        type='text'
                        name='state'
                        value={shippingAddress.state}
                        onChange={handleAddressChange}
                        placeholder='Sindh'
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-gray-700 font-semibold mb-2'>
                        Zip Code
                      </label>
                      <input
                        type='text'
                        name='zipCode'
                        value={shippingAddress.zipCode}
                        onChange={handleAddressChange}
                        placeholder='75500'
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        required
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className='block text-gray-700 font-semibold mb-2'>
                      Country
                    </label>
                    <input
                      type='text'
                      name='country'
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                      placeholder='Pakistan'
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-lg'
              >
                {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <span className='animate-spin'>⏳</span> Processing...
                  </span>
                ) : (
                  `Pay PKR ${orderData?.totalAmount?.toLocaleString() || '0'}`
                )}
              </button>

              {/* Back to Cart */}
              <div className='text-center'>
                <Link href='/cart' className='text-indigo-600 hover:underline font-semibold'>
                  ← Back to Cart
                </Link>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-lg p-8 sticky top-4'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Order Summary 📦</h2>

              <div className='space-y-4 mb-6'>
                <div className='flex justify-between text-gray-700'>
                  <span>Items ({orderData?.items})</span>
                  <span className='font-semibold'>PKR {orderData?.subtotal?.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Shipping</span>
                  <span className='font-semibold'>PKR {orderData?.shippingCost?.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Tax (estimated)</span>
                  <span className='font-semibold'>PKR 0</span>
                </div>
              </div>

              <div className='border-t-2 border-gray-200 pt-4'>
                <div className='flex justify-between items-center text-xl'>
                  <span className='font-bold text-gray-800'>Total:</span>
                  <span className='font-bold text-green-600'>PKR {orderData?.totalAmount?.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className='mt-8 bg-green-50 border border-green-200 rounded-lg p-4'>
                <p className='text-sm text-green-700 flex items-center gap-2'>
                  🔒 Your payment is 100% secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
