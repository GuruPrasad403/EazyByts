import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
    imageUrl: '',
    isPublished: false,
  });
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/project', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data.projects);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'technologies') {
      setFormData({ ...formData, [name]: value.split(',').map((tech) => tech.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      let response;
      if (isEditing) {
        response = await axios.put(`http://localhost:3000/api/project/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
        setIsEditing(false);
        setEditId(null);
      } else {
        response = await axios.post('http://localhost:3000/api/project', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      }

      // Reset the form data after adding or editing the project
      setFormData({
        title: '',
        description: '',
        technologies: [],
        link: '',
        imageUrl: '',
        isPublished: false,
      });

      // Fetch projects after adding/updating
      await fetchProjects();

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setEditId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      link: project.link,
      imageUrl: project.imageUrl,
      isPublished: project.isPublished,
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Form Section */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEditing ? 'Edit Project' : 'Add a New Project'}
        </h2>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter project title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter project description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="technologies" className="block text-gray-700 text-sm font-bold mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies.join(', ')}
              onChange={handleInputChange}
              placeholder="Enter technologies (e.g., React, Node.js)"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">
              Project URL
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="Enter project URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="isPublished" className="block text-gray-700 text-sm font-bold mb-2">
              Is Published
            </label>
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleInputChange}
              className="mr-2 leading-tight"
            />
            <span className="text-sm text-gray-600">Check if the project is published</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Projects List</h2>
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects available.</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project._id} className="flex justify-between items-center py-2 border-b">
                <span>{project.title}</span>
                <div className="space-x-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;
