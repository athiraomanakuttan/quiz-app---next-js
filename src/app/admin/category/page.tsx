'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
type catgoryType={
    id: number,
    name:string,
    dateAdded:string

}
const CategoriesPage = () => {
  const [categories, setCategories] = useState<catgoryType[]>([]);

  useEffect(() => {
    setCategories([
      { id: 1, name: "Science", dateAdded: "2024-11-01" },
      { id: 2, name: "Math", dateAdded: "2024-11-02" },
      { id: 3, name: "History", dateAdded: "2024-11-03" }
    ]);
  }, []);

  const handleDelete = (id:number) => {
    console.log("Deleting category with id:", id);
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleAddCategory = () => {
    console.log("Adding a new category");
  };
  const addQuestion = (id:number)=>{

  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
       <button
          onClick={handleAddCategory}
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200"
        >
          Add New Category
        </button>
      </div>
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
              <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{category.name}</td>
                <td className="py-3 px-6">{category.dateAdded}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => addQuestion(category.id)}
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
  );
};

export default CategoriesPage;
