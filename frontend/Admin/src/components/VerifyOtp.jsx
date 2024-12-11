import { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const VerifyOtp = () => {
    const navigate = useNavigate()
  const {email} = useAuth()
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const isLogedin = localStorage.getItem("token")
    if(isLogedin) return navigate("/dashbord")
    if (otp === '') {
      toast.error('OTP is required.');
      return;
    }

    
      // Send POST request to verify OTP API
      const response = await axios.put('https://eazy-byts-ten.vercel.app/api/verify', { otp,email });

      if (response.data.msg) {
        navigate('/signin');
        toast.success(response.data.msg);
        // Redirect to the next page, e.g., the Dashboard or Sign In page
      } else {
        toast.error('Invalid OTP, please try again.');
      }
    
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              id="otp"
              type="text"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
