'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar';
import {categoryType} from '@/types/types'
import axios from 'axios';
 
const AddQuestionPage = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState<null | number>(null);
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

  const handleOptionChange = (index:number, value:string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newQuestion = {
      category: selectedCategory, // Match schema
      question: question,         // Adjusted field name
      options,
      correctOption
    };
    try {
      const response = await axios.post('/api/question', { newQuestion });
      if(response.data.status === 201)
        alert(response.data.message)
      console.log(response.data)
      console.log("Question added:", newQuestion);
      setSelectedCategory('');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectOption(null);
    } catch (error:any) {
      console.error("Error adding question:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="flex">
      <Navbar />
    <div className="p-2 bg-gray-100 min-h-screen flex justify-center items-center w-[100%]">
      <div className="w-full max-w-lg bg-white p-3 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-3">Add New Question</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 mb-2">Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) =>{ setSelectedCategory(e.target.value);}}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.category}</option>
              ))}
            </select>
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-gray-700 mb-2">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter the question"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-gray-700 mb-2">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  placeholder={`Option ${index + 1}`}
                />
                <input
                  type="radio"
                  name="correctOption"
                  value={index}
                  checked={correctOption === index}
                  onChange={() => setCorrectOption(index)}
                  className="text-indigo-500"
                />
                <span className="text-gray-600">Correct</span>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition duration-200"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddQuestionPage;
