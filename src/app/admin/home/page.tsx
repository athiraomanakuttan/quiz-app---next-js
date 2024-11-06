import React from 'react';
import { FaList, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import CategoryForm from '../../../components/categeoryForm/CategoryForm'
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="flex"><div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
    <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
      <Link href='/admin/home'>Admin Panel</Link>
    </div>
    <nav className="flex-grow">
      <ul className="flex flex-col mt-4 space-y-2">
        <li>
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <FaList /> <Link href='/admin/category'><span>Category</span></Link>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <FaQuestionCircle /> <span>Question</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <FaChartBar /> <span>Result</span>
          </a>
        </li>
      </ul>
    </nav>
    <div>
     
    </div>
  </div>
  <div className='border w-[85%]'>
  <CategoryForm/>
  </div>
  </div>
  );
};

export default Sidebar;
