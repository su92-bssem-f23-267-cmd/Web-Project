'use client'
import React, { useState } from 'react'
import Novelsection from '../componenets/Novelsection'
import Link from 'next/link'

function Page() {
  // 🔹 Book Data Array
  const allBooks = [
    { Bookname: 'Salaar Sikandar', Bookpicture: '/SalaarSkindar.jpeg', Author_Name: 'Rizwan', Price: 'RS:1800' },
    { Bookname: 'Salaar Imaama', Bookpicture: '/SalaarImama.jpeg', Author_Name: 'Rizwan', Price: 'RS:1500' },
    { Bookname: 'Aab E Hayaat', Bookpicture: '/Aab_E_Hayat.jpeg', Author_Name: 'Rizwan', Price: 'RS:1900' },
    { Bookname: 'Peer E Kamil', Bookpicture: '/Peer_E_Kamil.jpeg', Author_Name: 'Rizwan', Price: 'RS:1400' },
    { Bookname: 'Jaan', Bookpicture: '/Jaan.jpeg', Author_Name: 'Rizwan', Price: 'RS:2500' },
    { Bookname: 'Omar O Ayaar', Bookpicture: '/Omar_o_Ayaar.jpg', Author_Name: 'Hassan', Price: 'RS:2700' },
    { Bookname: 'Beast Ka Ishq', Bookpicture: '/Best-Ka-Ishq.jpg', Author_Name: 'Adeel', Price: 'RS:2300' },
    { Bookname: 'Diyaar E Dil', Bookpicture: '/Diyaar_E_Dil.jpg', Author_Name: 'Sana', Price: 'RS:2800' },
    { Bookname: 'Ghulam Baagh', Bookpicture: '/Ghulam_Bagh.jpg', Author_Name: 'Tariq', Price: 'RS:2600' },
    { Bookname: 'Khaali Asmaan', Bookpicture: '/Khaali_Asmaan.jpg', Author_Name: 'Kiran', Price: 'RS:2400' },
    { Bookname: 'Mera Ishq', Bookpicture: '/Mera_Ishq.jpeg', Author_Name: 'Umar', Price: 'RS:2900' },
    { Bookname: 'Ye Dil Mera', Bookpicture: '/Ye_Dil_Mera.webp', Author_Name: 'Bilal', Price: 'RS:2550' },
  ];

  // 🔹 Search State
  const [searchTerm, setSearchTerm] = useState('');

  // 🔹 Filter Books by Search Term
  const filteredBooks = allBooks.filter(book =>
    book.Bookname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 flex flex-col'>
      
      {/* 🔹 Navbar */}
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

      {/* 🔹 Hero Section with Search */}
      <div className='bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500 h-auto md:h-96 w-full flex flex-col md:flex-row justify-center items-center rounded-b-[40px] text-white shadow-lg px-4 py-8 md:py-0 mt-20'>
        <img src='/Books-removebg-preview.png' className='h-40 md:h-72 mb-4 md:mb-0 rounded-4xl' alt='Books' />

        <div className='flex flex-col items-center w-full px-4'>
          <h2 className='text-2xl md:text-4xl font-bold text-center mb-4 drop-shadow-lg'>
            Find Your Next Great Read 📚
          </h2>

          {/* 🔍 Search Bar */}
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

      {/* 🔹 Books Section */}
      <div className='flex flex-wrap justify-center gap-6 px-4 py-8'>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, i) => (
            <Novelsection
              key={i}
              Bookname={book.Bookname}
              Bookpicture={book.Bookpicture}
              Author_Name={book.Author_Name}
              Price={book.Price}
            />
          ))
        ) : (
          <p className='text-gray-600 text-xl mt-10 font-semibold'>No books found 😢</p>
        )}
      </div>

      {/* 🔹 Footer */}
      <footer className='bg-gradient-to-r from-indigo-700 to-purple-700 text-white mt-10 rounded-t-[40px] shadow-inner'>
        <div className='text-center py-4 bg-indigo-900 text-gray-300 text-sm rounded-b-[40px]'>
          © {new Date().getFullYear()} Book Valley — All Rights Reserved 💫
        </div>
      </footer>
    </div>
  )
}

export default Page
