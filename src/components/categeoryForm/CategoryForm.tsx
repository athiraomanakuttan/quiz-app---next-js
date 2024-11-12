import axios from 'axios';
import React, { useState } from 'react';

interface CategoryFormProps {
  getCategoryData: () => void; // Specify the correct type for props
}

const CategoryForm: React.FC<CategoryFormProps> = ({ getCategoryData }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/category', { categoryName });
      console.log("Category added:", response.data);
      alert(response.data.message)
      setCategoryName('');
      getCategoryData(); // Call the function to refresh categories
    } catch (error:any) {
      console.log("Error adding category:", error);
      alert(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 mt-60">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add Category</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="categoryName" className="block text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter category name"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition duration-200"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
