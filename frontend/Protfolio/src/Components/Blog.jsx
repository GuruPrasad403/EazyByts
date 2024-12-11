import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BlogSection() {
  const theme = useTheme();
  const [blogs, setBlogs] = useState([]); // State to store fetched blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate()
  // Fetch blogs from the API
  useEffect(() => {
    axios.get('https://eazy-byts-ten.vercel.app/api/blog')
      .then((response) => {
        const blogsData = response.data.blogs;
        if (blogsData && blogsData.length > 0) {
          setBlogs(blogsData); // Store fetched blogs
        } else {
          setBlogs([]); // If no blogs, set to empty array
        }
        setLoading(false); // Stop loading after fetch
      })
      .catch((error) => {
        setError('Failed to fetch blogs.');
        setLoading(false); // Stop loading on error
      });
  }, []);

  // Loading state
  if (loading) {
    return <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>;
  }

  // Error state
  if (error) {
    return <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>;
  }

  return (
    <div id="Blog" className="flex flex-col pl-4 sm:pl-[250px] mt-20 sm:my-48 w-[98vw] h-full sm:h-[70vh]">
      <div className="flex justify-start items-start">
        <div className="flex flex-col items-start sm:py-2">
          <h2 className="sm:text-6xl text-4xl text-yellow-500 my-2">Discover</h2>
          <h1 className="sm:text-8xl text-5xl relative text-white">
            <span className="parent">My </span>
            <span>Blogs</span>
          </h1>
        </div>
      </div>

      <div className="my-28 flex sm:flex-row justify-around items-center flex-col">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <BlogCard
              key={index}
              id={blog._id}
              title={blog.title}
              description={blog.content || 'No content available'}
              imageUrl={blog.featuredImage || 'default-image-url.jpg'}
              link={blog.link} // Assuming the blog has a link property
              navigate = {navigate}
            />
          ))
        ) : (
          <Typography variant="h6" sx={{ color: '#fff' }}>No blogs available</Typography>
        )}
      </div>
    </div>
  );
}

function BlogCard({ title, description, imageUrl,navigate,   link,id }) {
  return (
    <Card
      sx={{
        width: '500px',
        height: '480px',
        marginRight: '100px',
        backgroundColor: '#212121',
        borderRadius: '3',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
        },
        [useTheme().breakpoints.down('sm')]: {
          width: '90%',
          height: '570px',
          marginBottom: 5,
          marginRight: '10px',
        },
      }}
    >
      <CardMedia
        sx={{ height: 250 }}
        image={imageUrl}
        title={title}
      />
      <CardContent sx={{ color: '#fff' }}>
        <Typography gutterBottom variant="h4" className="text-4xl" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{navigate(`/blog/${id}`)}} target="_blank">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default BlogSection;
