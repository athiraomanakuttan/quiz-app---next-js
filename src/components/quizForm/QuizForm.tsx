'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { categoryType } from '@/types/types';
import { useRouter } from 'next/navigation'; // Change here

const QuizForm = () => {
  const [participantName, setParticipantName] = useState('');
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter(); // Using the correct useRouter from next/navigation

  useEffect(() => {
    // Fetch categories from your API endpoint
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category');
        if (response.data.categories && response.data.categories.length > 0) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleStartQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]{3,}$/;
    if (!participantName.trim() || !selectedCategory) {
      alert('Please enter your name and select a category.');
      return;
    }
    else if(!nameRegex.test(participantName.trim())){
      alert('Please enter a valid name');
      return;
    }
    try {
      
        router.push(
            `/quiz/attend?participantName=${encodeURIComponent(participantName)}&selectedCategory=${encodeURIComponent(selectedCategory)}`
          );
          
      
    } catch (error) {
      console.log(error);
    }
    console.log(`Starting quiz for ${participantName} in category ${selectedCategory}`);
  };
  

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Attend the Quiz</h2>
        <form onSubmit={handleStartQuiz} className="flex flex-col gap-4">
          {/* Participant Name */}
          <div>
            <label className="block text-gray-700 mb-2">Participant Name</label>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 mb-2">Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.category}</option>
              ))}
            </select>
          </div>

          {/* Start Quiz Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition duration-200"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
