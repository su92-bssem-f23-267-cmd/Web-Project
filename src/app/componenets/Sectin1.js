import React from 'react'
import Link from 'next/link'

function Section1({ image, CategoryName, Details, pagelink }) {
  return (
    <div className='h-64 w-64 sm:h-72 sm:w-72 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-200 mt-6 rounded-[30px] sm:rounded-[40px] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center'>
      
      {/* Category Title */}
      <p className='text-center w-full font-bold text-xl sm:text-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-[30px] sm:rounded-t-[40px] py-2 shadow-md'>
        {CategoryName}
      </p>

      {/* Image + Details */}
      <div className='flex flex-col items-center mt-4 px-3'>
        <img
          src={image}
          alt={CategoryName}
          className='w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-2xl shadow-lg border-4 border-white object-cover hover:scale-105 transition-transform duration-300'
        />
        <p className='text-center text-gray-800 font-semibold mt-3 text-sm sm:text-base'>
          {Details}
        </p>

        {/* Button */}
        <div className='flex justify-center items-center w-full mt-4'>
          <Link href={pagelink}>
            <button className='px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl text-white font-semibold hover:scale-105 transition-transform duration-200 shadow-md text-sm sm:text-base'>
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Section1
