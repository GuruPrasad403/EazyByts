import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experience: '',
    age: '',
    address: '',
    freelance: false,
    profilePicture: '',
    aboutSection: '',
    mainStack: '',
    description: '' // Add description to the form data
  });

  // State to store the added or existing user
  const [user, setUser] = useState(null);

  // State to handle errors
  const [error, setError] = useState('');

  // Check if user exists when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        console.log(response.data); // Log the response to see if it contains the expected user data
        if (response.data.users && response.data.users.length > 0) {
          const existingUser = response.data.users[0];
          setUser(existingUser); // Set user data if exists
          setFormData(existingUser); // Populate form with existing user data
        }
      } catch (err) {
        setError('Error fetching user data');
        console.error('Error fetching user data', err);
      }
    };

    fetchUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission (for adding or updating user)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Example: Getting token from localStorage
    console.log('Token:', token); // Log the token to confirm it's being retrieved

    try {
      if (user) {
        // Update user if user exists
        const response = await axios.put(`http://localhost:3000/api/user/${user._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Update Response:', response); // Log the response to ensure it's returning the expected data
        setUser(response.data.user); // Set updated user data
      } else {
        // Add new user if no user exists
        const response = await axios.post('http://localhost:3000/api/user', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Add Response:', response); // Log the response to ensure it's returning the expected data
        setUser(response.data.user); // Set the new user data
      }
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to save user. Please check the form data and try again.');
      console.error('Error:', err); // Log any error details for debugging
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{user ? 'Update User' : 'Add New User'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div>
          <label htmlFor="experience" className="block">Experience</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        <div>
          <label htmlFor="age" className="block">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
            min="18"
            max="100"
          />
        </div>
        <div>
          <label htmlFor="address" className="block">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="freelance" className="block">Freelance Availability</label>
          <input
            type="checkbox"
            id="freelance"
            name="freelance"
            checked={formData.freelance}
            onChange={handleChange}
            className="mr-2"
          />
          Available for freelance
        </div>
        <div>
          <label htmlFor="profilePicture" className="block">Profile Picture URL</label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="aboutSection" className="block">About Section URL</label>
          <input
            type="text"
            id="aboutSection"
            name="aboutSection"
            value={formData.aboutSection}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="mainStack" className="block">Main Stack</label>
          <input
            type="text"
            id="mainStack"
            name="mainStack"
            value={formData.mainStack}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        {/* Add description field */}
        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            required
          />
        </div>
        
        {/* Show "Update User" or "Add User" button based on if user exists */}
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          {user ? 'Update User' : 'Add User'}
        </button>
      </form>

      {/* Display Error if any */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display the added or existing user details */}
      {user && (
        <div className="mt-6 p-4 border border-gray-300 rounded">
          <h3 className="text-xl font-semibold">User Details:</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Experience:</strong> {user.experience}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Freelance:</strong> {user.freelance ? 'Available' : 'Not Available'}</p>
          <p><strong>Profile Picture:</strong> <a href={user.profilePicture} target="_blank" rel="noopener noreferrer">View Picture</a></p>
          <p><strong>About Section:</strong> <a href={user.aboutSection} target="_blank" rel="noopener noreferrer">View About Section</a></p>
          <p><strong>Main Stack:</strong> {user.mainStack}</p>
          <p><strong>Description:</strong> {user.description}</p>
        </div>
      )}
    </div>
  );
};

export default User;
