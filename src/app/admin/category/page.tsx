'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import CategoryForm from '../../../components/categeoryForm/CategoryForm'; 
import axios from 'axios';
import { parseSetCookie } from 'next/dist/compiled/@edge-runtime/cookies'; 
import {categoryType} from '@/types/types'


const CategoriesPage = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getCategoryData = async ()=>{
    try {
      const responce = await axios.get('/api/category')
      if(responce.data.categories.length >0)
        setCategories(responce.data.categories)
      else 
      setCategories([])


  } catch (error) {
    console.log("error fetching category data")
  }
  }
  useEffect(() => {
    getCategoryData()
  }, []);

  const handleDelete = (id:string) => {
    setCategories(categories.filter(category => category._id !== id));
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const addQuestion = (id:string)=>{
    
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="p-8 bg-gray-100 min-h-screen w-[85%]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          <button
            onClick={handleAddCategory}
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            Add New Category
          </button>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center max-h-[20%] ">
            <div className="bg-white  rounded-lg shadow-lg w-full max-w-md m-24">
              <CategoryForm getCategoryData={getCategoryData}/>
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 float-right mr-5"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-gray-600">#</th>
                <th className="py-3 px-6 text-left text-gray-600">Category Name</th>
                <th className="py-3 px-6 text-left text-gray-600">Date Added</th>
                <th className="py-3 px-6 text-left text-gray-600">Actions</th>
                <th className="py-3 px-6 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{category.category}</td>
                  <td className="py-3 px-6">{category.updatedAt}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => addQuestion(category._id)}
                      className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Add Question
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
