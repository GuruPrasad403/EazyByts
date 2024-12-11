import express from 'express';
import { BlogModel } from '../model/blog.js';
import { blogValidationSchema } from '../validation/blogvalidation.js'; 
import { authentication } from '../middlewares/authentication.js'; // 
const router = express.Router();
//it will give all the blogs of the admin
router.get('/', async (req, res) => {
    try {
        // Fetch all blog posts from the database
        const blogs = await BlogModel.find({isPublished:true});

        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found.' });
        }

        // Return the list of blogs
        res.status(200).json({ blogs });
    } catch (error) {
        // Catch any errors and send the response
        console.error(error);
        res.status(500).json({ message: 'Error retrieving blogs.' });
    }
});
// Create a new blog post
router.post('/', authentication, async (req, res) => {
    try {
        // Validate request data using Zod schema
        const validatedData = blogValidationSchema.parse(req.body);  // This will throw an error if invalid
        
        // Create a new blog post with the validated data
        const newBlog = new BlogModel(validatedData);
        await newBlog.save();

        res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
    } catch (error) {
        // Catch validation errors
        if (error.errors) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(", ") });
        }
        // Catch other errors (like database errors)
        res.status(500).json({ message: 'Error creating blog post' });
    }
});

// Update an existing blog post
router.put('/:id', async (req, res) => {
    try {
        // Validate request data using Zod schema
        const validatedData = blogValidationSchema.parse(req.body); // This will throw an error if invalid

        // Find the blog post by ID and update it
        const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, validatedData, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully!', blog: updatedBlog });
    } catch (error) {
        // Catch validation errors
        if (error.errors) {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(", ") });
        }
        // Catch other errors (like database errors)
        res.status(500).json({ message: 'Error updating blog post' });
    }
});

// Delete a blog post
router.delete('/:id', authentication, async (req, res) => {
    try {
        // Find the blog post by ID and delete it
        const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully!', blog: deletedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog post' });
    }
});
// Fetch a specific blog by ID
router.get('/:id', async (req, res) => {
    try {
        // Find the blog post by ID
        const blog = await BlogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Return the blog
        res.status(200).json({ blog });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog post' });
    }
});

export default router;
