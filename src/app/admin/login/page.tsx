"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type formDataType = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const [enableLogin, setEnableLogin] = useState<boolean>(false);
  const [formData, setFormData] = useState<formDataType>({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length >= 6) {
      setEnableLogin(true);
      setError(null);  
    } else {
      setEnableLogin(false);
    }
  }, [formData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      const data = response.data;
      if (data.status === 200) {
        localStorage.setItem('token', data.token)
        router.push('/admin/home');
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h1>
        <form className="flex flex-col gap-4" autoComplete="off" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              value={formData.password}
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition duration-200"
            disabled={!enableLogin}
          >
            {enableLogin ? "Login" : "Fill the form"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
