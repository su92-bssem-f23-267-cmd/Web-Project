import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function Novelsection({ id, title, coverImage, author, price }) {
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) {
      router.push('/LoginPage')
      return
    }

    setAdding(true)
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: id, quantity: 1 })
      })
      const data = await res.json()
      if (data.success) {
        setAdded(true)
        // keep added state briefly
        setTimeout(() => setAdded(false), 2500)
      } else {
        alert(data.error || 'Failed to add to cart')
      }
    } catch (err) {
      console.error('Add to cart error', err)
      alert('Network error while adding to cart')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className='w-60 sm:w-64 md:w-72 bg-gradient-to-br from-slate-100 via-gray-50 to-amber-100 mt-6 rounded-[30px] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center border border-gray-200'>
      <p className='text-center w-full font-bold text-xl md:text-2xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-t-[30px] py-2 shadow-md tracking-wide'>
        {title}
      </p>

      <div className='flex flex-col items-center mt-4 px-2'>
        <img
          src={coverImage || '/book-placeholder.jpg'}
          alt={author}
          className='w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-2xl shadow-md border-4 border-amber-200 object-cover hover:scale-105 transition-transform duration-300'
        />
        <p className='text-center text-gray-900 font-semibold mt-3 text-base md:text-lg'>
          PKR {price?.toLocaleString ? price.toLocaleString() : price}
        </p>

        <div className='mt-4 flex gap-3'>
          <button
            onClick={handleAddToCart}
            disabled={adding}
            aria-pressed={added}
            className={`inline-flex items-center gap-3 px-4 py-2 rounded-full font-semibold text-white shadow-lg transform transition-all duration-200 ${adding ? 'opacity-70 scale-95' : 'hover:-translate-y-0.5 hover:shadow-2xl'} bg-gradient-to-r from-indigo-600 to-fuchsia-600`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span>{adding ? 'Adding...' : added ? 'Added' : 'Add to Cart'}</span>
          </button>

          <button
            onClick={async () => {
              await handleAddToCart()
              router.push('/Payment')
            }}
            className='inline-flex items-center gap-3 px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-md hover:scale-[1.02] hover:shadow-2xl transition-all duration-200'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 11v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Buy Now</span>
          </button>
        </div>

        {added && (
          <div className='mt-3 inline-flex items-center gap-2 bg-white text-green-800 px-3 py-1 rounded-full text-sm font-semibold shadow'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Added to cart
            <a href='/cart' className='ml-2 underline text-sm'>View Cart</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Novelsection
