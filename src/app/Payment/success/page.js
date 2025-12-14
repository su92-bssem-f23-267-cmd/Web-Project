"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function PaymentSuccess() {
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    const orderNumber = searchParams.get('orderNumber')

    if (orderId && orderNumber) {
      setOrderData({
        orderId,
        orderNumber,
        timestamp: new Date().toLocaleString()
      })
    }
  }, [searchParams])

  return (
    <div className='min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex items-center justify-center py-10 px-4'>
      <div className='max-w-md w-full'>
        <div className='bg-white rounded-3xl shadow-2xl p-10 text-center'>
          {/* Success Icon */}
          <div className='mb-6'>
            <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-5xl'>✅</span>
            </div>
          </div>

          {/* Success Message */}
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>
            Payment Successful! 🎉
          </h1>

          <p className='text-gray-600 text-lg mb-8'>
            Thank you for your purchase from Book Valley
          </p>

          {/* Order Details */}
          {orderData && (
            <div className='bg-gray-50 rounded-xl p-6 mb-8 text-left'>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-600 font-semibold'>Order Number</p>
                  <p className='text-lg font-mono text-gray-800'>{orderData.orderNumber}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 font-semibold'>Order ID</p>
                  <p className='text-sm font-mono text-gray-600'>{orderData.orderId}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600 font-semibold'>Date & Time</p>
                  <p className='text-sm text-gray-800'>{orderData.timestamp}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className='bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8'>
            <p className='text-sm text-blue-800'>
              📧 A confirmation email has been sent to your registered email address.
            </p>
          </div>

          {/* Action Buttons */}
          <div className='space-y-3'>
            <Link
              href='/user/profile'
              className='block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300'
            >
              View My Orders
            </Link>
            <Link
              href='/'
              className='block w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300'
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support */}
          <p className='text-sm text-gray-600 mt-8'>
            Need help? <a href='#' className='text-indigo-600 hover:underline font-semibold'>Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
