import React from 'react'
import { FaList, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import Link from 'next/link'


const Navbar = () => {
  return (
    <div>
       <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
    <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
      <Link href='/admin/home'>Admin Panel</Link>
    </div>
    <nav className="flex-grow">
      <ul className="flex flex-col mt-4 space-y-2">
        <li>
         <Link href='/admin/category'> <FaList /> <span>Category</span></Link>
        </li>
        <li>
            <FaQuestionCircle /> <span>Question</span>
        </li>
        <li>        
            <FaChartBar /> <span>Result</span>
        </li>
      </ul>
    </nav>
    <div>
     
    </div>
  </div>
    </div>
  )
}

export default Navbar
