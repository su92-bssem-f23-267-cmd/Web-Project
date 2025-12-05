import React from 'react'
import Link from 'next/link'
import Storysection from '../componenets/Storysection'

function Page({ Bookname, Bookpicture, Author_Name, Price }) {
  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 flex flex-col'>

      {/* Navbar */}
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

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500 h-auto md:h-96 w-full flex flex-col md:flex-row justify-center items-center rounded-b-[40px] text-white shadow-lg px-4 py-8 md:py-0'>
        <img src='/Books-removebg-preview.png' className='h-40 md:h-72 mb-4 md:mb-0 rounded-4xl' alt='Books' />
        <div className='flex flex-col items-center w-full px-4'>
  <h2 className='text-2xl md:text-4xl font-bold text-center mb-4 drop-shadow-lg'>
    Find Your Next Great Read 📚
  </h2>
  <div className='flex w-full max-w-md bg-white rounded-full shadow-lg overflow-hidden'>
    <input
      type='text'
      placeholder='Search books by title, author, or genre...'
      className='flex-grow px-4 py-2 text-gray-700 focus:outline-none text-sm md:text-base'
    />
    <button className='px-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300'>
      Search
    </button>
  </div>
</div>

        <img src='/girl3.png' className='h-48 md:h-80 mt-4 md:mt-0' alt='Girl reading' />
      </div>

      {/* Heading */}
      <div className='text-center py-8 bg-amber-50'>
        <p className='text-2xl md:text-4xl font-extrabold text-gray-800'>
          Uncover the Finest Collection of Modern Novels 📚
        </p>
      </div>

      
      

      {/* Novel Cards */}
      <div className='flex flex-wrap justify-center gap-6 px-4'>
        <Storysection Bookname='Salaar Sikandar' Bookpicture='/SalaarSkindar.jpeg' Author_Name='Rizwan' Price='RS:1800' />
        <Storysection Bookname='Salaar Imaama' Bookpicture='/SalaarImama.jpeg' Author_Name='Rizwan' Price='RS:1500' />
        <Storysection Bookname='Aab E Hayaat' Bookpicture='/Aab_E_Hayat.jpeg' Author_Name='Rizwan' Price='RS:1900' />
        <Storysection Bookname='Peer E Kamil' Bookpicture='/Peer_E_Kamil.jpeg' Author_Name='Rizwan' Price='RS:1400' />
      </div>
      <div className='flex flex-wrap justify-center gap-6 px-4'>
        <Storysection Bookname='Salaar Sikandar' Bookpicture='/SalaarSkindar.jpeg' Author_Name='Rizwan' Price='RS:1800' />
        <Storysection Bookname='Salaar Imaama' Bookpicture='/SalaarImama.jpeg' Author_Name='Rizwan' Price='RS:1500' />
        <Storysection Bookname='Aab E Hayaat' Bookpicture='/Aab_E_Hayat.jpeg' Author_Name='Rizwan' Price='RS:1900' />
        <Storysection Bookname='Peer E Kamil' Bookpicture='/Peer_E_Kamil.jpeg' Author_Name='Rizwan' Price='RS:1400' />
      </div>

      

      {/* Multiple Rows (Auto Responsive Grid) */}
     <div className='flex flex-wrap justify-center gap-6 px-4 py-8'>
  {[
    {
      Bookname: 'Jaan',
      Bookpicture: '/Jaan.jpeg',
      Author_Name: 'Rizwan',
      Price: 'RS:2500',
    },
    {
      Bookname: 'Omar O Ayaar',
      Bookpicture: '/Omar_o_Ayaar.jpg',
      Author_Name: 'Hassan',
      Price: 'RS:2700',
    },
    {
      Bookname: 'Beast Ka Ishq',
      Bookpicture: '/Best-Ka-Ishq.jpg',
      Author_Name: 'Adeel',
      Price: 'RS:2300',
    },
    {
      Bookname: 'Diyaar E Dil',
      Bookpicture: '/Diyaar_E_Dil.jpg',
      Author_Name: 'Sana',
      Price: 'RS:2800',
    },
    {
      Bookname: 'Ghulam Baagh',
      Bookpicture: '/Ghulam_Bagh.jpg',
      Author_Name: 'Tariq',
      Price: 'RS:2600',
    },
    {
      Bookname: 'Khaali Asmaan',
      Bookpicture: '/Khaali_Asmaan.jpg',
      Author_Name: 'Kiran',
      Price: 'RS:2400',
    },
    {
      Bookname: 'Mera Ishq',
      Bookpicture: '/Mera_Ishq.jpeg',
      Author_Name: 'Umar',
      Price: 'RS:2900',
    },
    {
      Bookname: 'Ye Dil Mera',
      Bookpicture: '/Ye_Dil_Mera.webp',
      Author_Name: 'Bilal',
      Price: 'RS:2550',
    },
  ].map((book, i) => (
    <Storysection
      key={i}
      Bookname={book.Bookname}
      Bookpicture={book.Bookpicture}
      Author_Name={book.Author_Name}
      Price={book.Price}
    />
  ))}
</div>
      {/* Footer Section */}
      <footer className='bg-gradient-to-r from-indigo-700 to-purple-700 text-white mt-10 rounded-t-[40px] shadow-inner'>
        <div className='max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
          
          {/* Column 1 */}
          {/* Column 1 */}
      <div>
      <img src='/weblogo.png' alt='Book Valley Logo' className='h-16 mx-auto md:mx-0 mb-3' />
       <p className='text-sm text-gray-200 leading-relaxed'>
          Your ultimate destination for novels, stories, and books that touch the heart and mind. Explore the magic of words with us.
         </p>
       </div>


          {/* Column 2 */}
          <div>
            <h3 className='text-xl font-semibold mb-3'>Quick Links</h3>
            <ul className='space-y-2'>
              <li><Link href='/' className='hover:underline'>Home</Link></li>
              <li><a href='#' className='hover:underline'>Products</a></li>
              <li><a href='#' className='hover:underline'>Features</a></li>
              <li><a href='#' className='hover:underline'>About</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className='text-xl font-semibold mb-3'>Contact Us</h3>
            <p className='text-sm text-gray-200'>Email: mlkrizwan213@gmail.com</p>
            <p className='text-sm text-gray-200'>Phone: +92 309 5693653</p>
            <div className='flex justify-center md:justify-start gap-4 mt-4'>
              <a href='#' className='hover:text-amber-400 transition'><i className='fab fa-facebook-f'></i></a>
              <a href='#' className='hover:text-amber-400 transition'><i className='fab fa-instagram'></i></a>
              <a href='#' className='hover:text-amber-400 transition'><i className='fab fa-twitter'></i></a>
            </div>
          </div>

        </div>
        <div className='text-center py-4 bg-indigo-900 text-gray-300 text-sm rounded-b-[40px]'>
          © {new Date().getFullYear()} Book Valley — All Rights Reserved 💫
        </div>
      </footer>



    </div>
  )
}

export default Page