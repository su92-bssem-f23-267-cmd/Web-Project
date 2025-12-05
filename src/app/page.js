import Link from 'next/link'
import React from 'react'
import Section1 from './componenets/Sectin1'
import Novelsection from './componenets/Novelsection'
import Storysection from './componenets/Storysection'
import Medicalpage from './MedicalBooks/page'
import LoginPage from './LoginPage/page'
import Signup from './Signup/page'
import Aboutus from './Aboutus/page'

function Page({ image, CategoryName, Details, pagelink }) {
  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 flex flex-col'>
      
      {/* 🔹 Fixed Navbar */}
      <div className='bg-gradient-to-r fixed top-0 left-0 w-full z-50 from-indigo-700 to-purple-700 shadow-md'>
        <nav className='flex justify-between items-center px-6 md:px-12 py-4 text-white relative'>
          
          {/* Logo (Left) */}
          <div className='flex items-center space-x-3'>
            <img
              src='/weblogo.png'
              className='h-12 w-16 md:h-16 md:w-20 object-contain'
              alt='Logo'
            />
            
          </div>

          {/* 🔸 Center Menu with Dropdown */}
          <div className='hidden md:flex gap-8 text-lg font-semibold items-center relative'>
            <Link href='/'>Home</Link>

            {/* 🔹 Dropdown Menu */}
            <div className='group relative cursor-pointer'>
              <span className='hover:text-yellow-300 transition-all duration-200'>
                Products ▼
              </span>

              {/* Dropdown Items */}
              <div className='absolute hidden group-hover:flex flex-col bg-white text-gray-800 rounded-xl shadow-lg mt-2 min-w-[220px] py-2 z-50'>
                <Link href='/NovelBooks' className='px-4 py-2 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-150'>
                  Novel Books
                </Link>
                <Link href='/IslamicBooks' className='px-4 py-2 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-150'>
                  Islamic Books
                </Link>
                <Link href='/StoryBooks' className='px-4 py-2 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-150'>
                  Story Books
                </Link>
                <Link href='/MedicalBooks' className='px-4 py-2 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-150'>
                  Medical Books
                </Link>
                <Link href='/ComputerBooks' className='px-4 py-2 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-150'>
                  Computer Books
                </Link>
                <Link href='/EducationalBooks' className='px-4 py-2 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-150'>
                  Educational Books
                </Link>
              </div>
            </div>
            

            <Link href='/Signup' className='hover:text-yellow-300 transition-all duration-200'>Features</Link>
            <Link href='/Aboutus' className='hover:text-yellow-300 transition-all duration-200'>About</Link>
          </div>

          {/* 🔸 Login Section (Right) */}
          <div className='flex flex-col items-center text-center'>
            <Link
              href='/LoginPage'
              className='bg-amber-400 text-purple-900 px-5 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300'
            >
              Login
            </Link>
            <p className='text-[10px] md:text-xs text-gray-200 mt-1'>
              Don’t have an account?{' '}
              <Link href='/Signup' className='text-yellow-300 font-medium hover:underline'>
                Create New One
              </Link>
            </p>
          </div>
        </nav>
      </div>

      {/* 🔹 Hero Section */}
      <div className='pt-28 md:pt-26 bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500 h-auto md:h-96 w-full flex flex-col md:flex-row justify-center items-center rounded-b-[40px] md:rounded-b-[50px] text-white shadow-lg px-4 md:px-10 py-10 md:py-0'>
        <img src='/Books-removebg-preview.png' className='h-52 md:h-72 mb-4 md:mb-0' alt='Books' />
        <p className='text-3xl md:text-5xl font-bold max-w-md text-center leading-snug drop-shadow-lg'>
          Turning Pages, Opening Minds
        </p>
        <img src='/Girlphoto-removebg-preview.png' className='h-56 md:h-80 mt-6 md:mt-0' alt='Girl reading' />
      </div>

      {/* 🔹 Heading */}
      <div className='text-center py-8 md:py-10 bg-amber-50'>
        <p className='text-2xl md:text-4xl font-extrabold text-gray-800'>
          Discover Your Favourite Books Now 📚
        </p>
      </div>

      {/* 🔹 Book Sections */}
      <div className='bg-gradient-to-br from-purple-100 via-blue-200 to-indigo-100 py-10 flex-grow'>
        <div className='flex justify-center md:justify-around items-center flex-wrap gap-6 md:gap-8'>
          <Section1 image='/novel3.jpg' CategoryName='Novel Books' Details='Imagination, Emotion, Adventure.' pagelink='/NovelBooks' />
          <Section1 image='/islamic.jpg' CategoryName='Islamic Books' Details='Faith, Wisdom, and Peace.' pagelink='/IslamicBooks' /> 
          <Section1 image='/story.jpg' CategoryName='Story Books' Details='Fun, Lessons, and Wonder.' pagelink='/StoryBooks'  /> 
        </div>

        <div className='flex justify-center md:justify-around items-center flex-wrap gap-6 md:gap-8 mt-10'>
          <Section1 image='/medical.jpg' CategoryName='Medical Books' Details='Knowledge for Healing.' pagelink='/MedicalBooks' />
          <Section1 image='/computer.jpg' CategoryName='Computer Books' Details='Technology, Coding, and Logic.' pagelink='/Computerbooks' />
          <Section1 image='/educational.webp' CategoryName='Educational Books' Details='Learn, Grow, and Achieve.' pagelink='/EducationalBooks' />
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className='bg-gradient-to-r from-indigo-700 to-purple-700 text-white mt-10 py-8 md:py-10 rounded-t-[40px] md:rounded-t-[50px] shadow-inner'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6 text-center md:text-left'>
          
          {/* Logo Section */}
          <div className='flex flex-col items-center md:items-start'>
            <img src='/weblogo.png' className='h-12 w-16 md:h-16 md:w-20 object-contain' alt='Logo' />
            <p className='text-lg md:text-xl font-bold mt-2'>Book Valley</p>
            <p className='text-sm text-gray-200'>Turning Pages, Opening Minds</p>
          </div>
          {/* Quick Links */}
          <div className='flex flex-col items-center'>
            <h3 className='font-semibold text-lg mb-2'>Quick Links</h3>
            <ul className='space-y-1 text-gray-200'>
              <li><Link href='/'>Home</Link></li>
              <li><Link href='#'>Products</Link></li>
              <li><Link href='#'>Features</Link></li>
              <li><Link href='#'>About</Link></li>
            </ul>
          </div>
          {/* Social Links */}
          <div className='flex flex-col items-center md:items-end'>
            <h3 className='font-semibold text-lg mb-2'>Follow Us</h3>
            <div className='flex gap-4 text-2xl'>
              <a href='#' className='hover:text-yellow-300 transition-all duration-200'><i className='fab fa-facebook'></i></a>
              <a href='#' className='hover:text-yellow-300 transition-all duration-200'><i className='fab fa-instagram'></i></a>
              <a href='#' className='hover:text-yellow-300 transition-all duration-200'><i className='fab fa-twitter'></i></a>
            </div>
          </div>
        </div>
        <div className='text-center text-gray-300 text-sm mt-6 border-t border-gray-400 pt-4'>
          © {new Date().getFullYear()} Book Valley. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Page
