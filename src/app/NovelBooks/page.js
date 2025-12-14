'use client'
import React, { useState, useEffect } from 'react'
import Novelsection from '../componenets/Novelsection'
import Link from 'next/link'

function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/books?limit=24')
        const json = await res.json()
        if (json.success) {
          setBooks(json.data.books || [])
        }
      } catch (err) {
        console.error('Failed to fetch books', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 flex flex-col'>
      <div className='bg-gradient-to-r from-indigo-700 to-purple-700 shadow-md fixed top-0 left-0 w-full z-50'>
        <nav className='flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-4 text-white'>
          <img src='/weblogo.png' className='h-14 w-16 md:h-16 md:w-20 object-contain mb-2 md:mb-0' alt='Logo' />
          <div className='flex flex-wrap justify-center gap-6 md:gap-10 text-lg font-semibold'>
            <Link href='/'>Home</Link>
            <a href='#'>Categories</a>
            <a href='#'>Features</a>
            <a href='#'>About</a>
          </div>
        </nav>
      </div>

      <div className='bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500 h-auto md:h-96 w-full flex flex-col md:flex-row justify-center items-center rounded-b-[40px] text-white shadow-lg px-4 py-8 md:py-0 mt-20'>
        <img src='/Books-removebg-preview.png' className='h-40 md:h-72 mb-4 md:mb-0 rounded-4xl' alt='Books' />

        <div className='flex flex-col items-center w-full px-4'>
          <h2 className='text-2xl md:text-4xl font-bold text-center mb-4 drop-shadow-lg'>
            Find Your Next Great Read 📚
          </h2>

          <div className='flex w-full max-w-md bg-white rounded-full shadow-lg overflow-hidden'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search books by title...'
              className='flex-grow px-4 py-2 text-gray-700 focus:outline-none text-sm md:text-base'
            />
            <button className='px-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300'>
              Search
            </button>
          </div>
        </div>

        <img src='/girl3.png' className='h-48 md:h-80 mt-4 md:mt-0' alt='Girl reading' />
      </div>

      <div className='flex flex-wrap justify-center gap-6 px-4 py-8'>
        {loading ? (
          <p className='text-gray-600 text-xl mt-10 font-semibold'>Loading books...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Novelsection
              key={book.id}
              id={book.id}
              title={book.title}
              coverImage={book.coverImage}
              author={book.author}
              price={book.price}
            />
          ))
        ) : (
          <p className='text-gray-600 text-xl mt-10 font-semibold'>No books found 😢</p>
        )}
      </div>

      <footer className='bg-gradient-to-r from-indigo-700 to-purple-700 text-white mt-10 rounded-t-[40px] shadow-inner'>
        <div className='text-center py-4 bg-indigo-900 text-gray-300 text-sm rounded-b-[40px]'>
          © {new Date().getFullYear()} Book Valley — All Rights Reserved 💫
        </div>
      </footer>
    </div>
  )
}

export default Page
