import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillManager = () => {
  const [skills, setSkills] = useState([]); // Initialize as an empty array
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);

  // Fetch the skills list from the backend
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    axios.get('https://eazy-byts-ten.vercel.app/api/skills', {
      headers: {
        Authorization: `Bearer ${token}` // Add token in Authorization header
      }
    })
      .then((response) => {
        setSkills(response.data.skills || []); // Ensure skills is an array, even if it's undefined
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
        setSkills([]); // In case of an error, ensure skills is an empty array
      });
  }, []);

  // Handle adding or updating a skill
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const skillData = { name, level, imageUrl };

    if (editingSkill) {
      // Update existing skill
      axios.put(`https://eazy-byts-ten.vercel.app/api/skills/${editingSkill._id}`, skillData, {
        headers: {
          Authorization: `Bearer ${token}` // Add token in Authorization header
        }
      })
        .then((response) => {
          setSkills(skills.map(skill => skill._id === editingSkill._id ? response.data.skill : skill));
          setEditingSkill(null);
          clearForm();
        })
        .catch((error) => console.error('Error updating skill:', error));
    } else {
      // Add new skill
      axios.post('https://eazy-byts-ten.vercel.app/api/skills', skillData, {
        headers: {
          Authorization: `Bearer ${token}` // Add token in Authorization header
        }
      })
        .then((response) => {
          setSkills([...skills, response.data.skill]);
          clearForm();
        })
        .catch((error) => console.error('Error adding skill:', error));
    }
  };

  // Handle editing a skill
  const handleEdit = (skill) => {
    setName(skill.name);
    setLevel(skill.level);
    setImageUrl(skill.imageUrl);
    setEditingSkill(skill);
  };

  // Handle deleting a skill
  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    axios.delete(`https://eazy-byts-ten.vercel.app/api/skills/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Add token in Authorization header
      }
    })
      .then(() => {
        setSkills(skills.filter(skill => skill._id !== id));
      })
      .catch((error) => console.error('Error deleting skill:', error));
  };

  // Clear form fields
  const clearForm = () => {
    setName('');
    setLevel('');
    setImageUrl('');
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Skill Manager</h1>

      {/* Skill creation form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Skill Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="level" className="block text-lg font-medium text-gray-700">Skill Level</label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
          {editingSkill ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>

      {/* Skill list */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Skills List</h2>
      {skills.length === 0 ? (
        <p className="text-center text-gray-500">No skills to display</p>
      ) : (
        <ul className="space-y-4">
          {skills.map(skill => (
            <li key={skill._id} className="flex items-center justify-between p-4 bg-gray-50 border rounded-md shadow-sm">
              <div className="flex items-center">
                <img src={skill.imageUrl} alt={skill.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="text-lg font-semibold">{skill.name}</div>
                  <div className="text-sm text-gray-600">{skill.level}</div>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
                  className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillManager;
