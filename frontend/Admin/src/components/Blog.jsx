import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogManager = () => {
  // States for creating and managing blogs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [editingBlogId, setEditingBlogId] = useState(null); // New state to track which blog is being edited

  useEffect(() => {
    fetchBlogs();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/blog', {
        headers: getAuthHeaders(), // Attach token here
      });
      setBlogs(response.data.blogs);
    } catch (err) {
      setError('Error fetching blogs.');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = 'Title is required.';
    if (title.length > 200) errors.title = 'Title cannot exceed 200 characters.';
    if (!content) errors.content = 'Content is required.';
    if (!author) errors.author = 'Author is required.';
    if (author.length > 100) errors.author = 'Author name cannot exceed 100 characters.';
    if (tags.length > 10) errors.tags = 'Cannot have more than 10 tags.';
    if (featuredImage && !/^https?:\/\/[^\s]+$/.test(featuredImage)) errors.featuredImage = 'Featured image must be a valid URL.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createBlog = async () => {
    if (!validateForm()) return;

    try {
      const newBlog = { title, content, author, tags, featuredImage, isPublished };
      await axios.post('http://localhost:3000/api/blog', newBlog, {
        headers: getAuthHeaders(), // Attach token here
      });
      resetForm();
      fetchBlogs(); // Refresh the list after creating a new blog
    } catch (err) {
      setError('Failed to create blog.');
    }
  };

  const editBlog = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/blog/${id}`, {
        headers: getAuthHeaders(), // Attach token here
      });
      const blog = response.data.blog;
      setTitle(blog.title);
      setContent(blog.content);
      setAuthor(blog.author);
      setTags(blog.tags);
      setFeaturedImage(blog.featuredImage);
      setIsPublished(blog.isPublished);
      setEditingBlogId(id); // Set the ID of the blog being edited
    } catch (err) {
      setError('Error fetching blog for editing.');
    }
  };

  const updateBlog = async () => {
    if (!validateForm()) return;

    try {
      const updatedBlog = { title, content, author, tags, featuredImage, isPublished };
      await axios.put(`http://localhost:3000/api/blog/${editingBlogId}`, updatedBlog, {
        headers: getAuthHeaders(), // Attach token here
      });
      resetForm();
      fetchBlogs(); // Refresh after updating
    } catch (err) {
      setError('Failed to update blog.');
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/blog/${id}`, {
        headers: getAuthHeaders(), // Attach token here
      });
      fetchBlogs(); // Refresh the list after deleting
    } catch (err) {
      setError('Error deleting blog.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setAuthor('');
    setTags([]);
    setFeaturedImage('');
    setIsPublished(false);
    setEditingBlogId(null); // Reset editing state
  };

  return (
    <div className="container mx-auto p-6 h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Blog Manager</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{editingBlogId ? 'Edit Blog' : 'Create Blog'}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {formErrors.title && <p className="text-red-500">{formErrors.title}</p>}
        <textarea
          placeholder="Blog Content"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {formErrors.content && <p className="text-red-500">{formErrors.content}</p>}
        <input
          type="text"
          placeholder="Author"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {formErrors.author && <p className="text-red-500">{formErrors.author}</p>}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={tags.join(', ')}
          onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
        />
        {formErrors.tags && <p className="text-red-500">{formErrors.tags}</p>}
        <input
          type="text"
          placeholder="Featured Image URL (optional)"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
        />
        {formErrors.featuredImage && <p className="text-red-500">{formErrors.featuredImage}</p>}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
            className="mr-2"
          />
          <span>Publish</span>
        </div>
        <button
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          onClick={editingBlogId ? updateBlog : createBlog} // Use updateBlog if in edit mode
        >
          {editingBlogId ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Blog List</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blog items to display.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog._id} className="flex justify-between items-center p-4 border-b border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300">
                <div className="flex items-center space-x-4">
                  <img src={blog.featuredImage} alt={blog.title} className="w-20 h-20 object-cover rounded-lg" />
                  <h3 className="text-lg font-medium text-gray-800">{blog.title}</h3>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => editBlog(blog._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
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

export default BlogManager;
