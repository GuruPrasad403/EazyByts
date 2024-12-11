import express from 'express';
import { ProjectModel } from '../models/project.js'; // Import the Project Model
import { projectValidationSchema } from '../Validations/projectValidation.js'; // Import the validation schema
import { authentication } from '../middlewares/authentication.js'; // Assuming you have authentication middleware

const router = express.Router();

// Route to create a new project
router.post('/', async (req, res) => {
    try {
        // Validate the incoming data using Zod
        const validatedData = projectValidationSchema.parse(req.body);

        // Create the new project document
        const newProject = new ProjectModel(validatedData);
        await newProject.save();

        res.status(201).json({ message: 'Project created successfully!', project: newProject });
    } catch (error) {
        res.status(400).json({ message: error.errors ? error.errors[0].message : 'Error creating project.' });
    }
});

// Route to update an existing project by ID
router.put('/:id', authentication, async (req, res) => {
    try {
        // Validate the incoming data using Zod
        const validatedData = projectValidationSchema.parse(req.body);

        // Find the project by ID and update it
        const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, validatedData, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully!', project: updatedProject });
    } catch (error) {
        res.status(400).json({ message: error.errors ? error.errors[0].message : 'Error updating project.' });
    }
});

// Route to get all projects
// Route to get all published projects
router.get('/', async (req, res) => {
    try {
        // Filter for only published projects
        const projects = await ProjectModel.find({ isPublished: true });
        
        if (projects.length === 0) {
            return res.status(404).json({ message: 'No published projects found.' });
        }

        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects.' });
    }
});

// Route to delete a project by ID
router.delete('/:id', authentication, async (req, res) => {
    try {
        const deletedProject = await ProjectModel.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully!', project: deletedProject });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project.' });
    }
});

export default router;
