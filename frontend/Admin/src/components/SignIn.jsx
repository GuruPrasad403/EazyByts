import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirection
import axios from 'axios'; // To handle API requests
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      toast.error('All fields are required.');
      return;
    }

    try {
      // Send POST request to the signin API
      const response = await axios.post('http://localhost:3000/api/signin', {
        email,
        password,
      });
      if(response.data.msg)
{      // Assuming the response contains a success message and a token
      toast.success(response.data.msg);

      // Store the token (or handle authentication state)
      localStorage.setItem('token', response.data.token); // Store the token in localStorage or sessionStorage
      login(email)
      // Redirect to the dashboard or home page after successful login
      navigate('/dashboard'); // Redirect to the dashboard page
}
    } catch (error) {
      // Handle API error
      if (error.response) {
        toast.error(error.response.data.message || 'Invalid email or password.');
      } else {
        toast.error('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
