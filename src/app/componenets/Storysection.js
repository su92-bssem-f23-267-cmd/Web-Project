import React from 'react'

function Storysection({ Bookname, Bookpicture, Author_Name, Price }) {
  return (
    <div className='w-60 sm:w-64 md:w-72 bg-gradient-to-br from-slate-100 via-gray-50 to-amber-100 mt-6 rounded-[30px] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center border border-gray-200'>
      
      <p className='text-center w-full font-bold text-xl md:text-2xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-t-[30px] py-2 shadow-md tracking-wide'>
        {Bookname}
      </p>

      <div className='flex flex-col items-center mt-4 px-2'>
        <img
          src={Bookpicture}
          alt={Author_Name}
          className='w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-2xl shadow-md border-4 border-amber-200 object-cover hover:scale-105 transition-transform duration-300'
        />
        <p className='text-center text-gray-900 font-semibold mt-3 text-base md:text-lg'>
          {Price}
        </p>
      </div>
    </div>
  )
}

export default Storysection
