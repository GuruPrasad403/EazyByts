import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogPage() {
  const { id } = useParams(); // Extract blog ID from the URL params
  const [blogData, setBlogData] = useState(null); // State to store blog data

  useEffect(() => {
    if (id) {
      fetch(`https://eazy-byts-ten.vercel.app/api/blog/${id}`) // Fetch individual blog data using the ID
        .then((response) => response.json())
        .then((data) => setBlogData(data.blog)) // Store fetched blog data
        .catch((err) => console.log('Error fetching blog data:', err));
    }
  }, [id]); // Re-run effect when `id` changes

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-zinc-900 min-h-full py-12">
      <div className="max-w-4xl mx-auto px-6 bg-zinc-800 rounded-lg shadow-lg">
        <img src={blogData.featuredImage} alt={blogData.title} className="w-full h-96 object-cover rounded-t-lg" />
        <h1 className="text-4xl font-bold my-6 text-yellow-500">{blogData.title}</h1>
        <p className="text-lg py-10 text-justify text-gray-300">{blogData.content}</p>
      </div>
    </div>
  );
}

export default BlogPage;
