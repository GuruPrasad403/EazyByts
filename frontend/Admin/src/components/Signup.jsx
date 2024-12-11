import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirection
import axios from 'axios'; // To handle API requests
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const { setEmail,email} = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '' || confirmPassword === '') {
      toast.error('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      // Send POST request to the signup API
      console.log(email)
      const response = await axios.post('https://eazy-byts-ten.vercel.app/api/signup', {
        email,
        password,
      });

      // Assuming the response has a success message
      toast.success('Account successfully created! Please verify your OTP.');

      // Redirect to the OTP verification page after successful signup
      setTimeout(() => {
        navigate('/verify-otp'); // Navigate to OTP verification page
      }, 2000); // Wait 2 seconds before redirecting

    } catch (error) {
      // Handle API error
      if (error.response) {
        toast.error(error.response.data.msg || 'Something went wrong. Please try again.');
      } else {
        toast.error('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={email}
              autoComplete={false}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
            autoComplete={false}
              id="password"
              type="password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
            autoComplete={false}
              id="confirmPassword"
              type="password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
