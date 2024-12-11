import express from 'express';
import Skill from '../model/skill.js'; 
import { skillValidationSchema } from '../Validations/skillValidation.js'; 

const router = express.Router();

// Add Skill (POST)
router.post('/', async (req, res) => {
  try {
    // Validate the request body using Zod
    skillValidationSchema.parse(req.body);

    // Create a new skill document
    const newSkill = new Skill(req.body);
    await newSkill.save();

    res.status(201).json({ message: 'Skill added successfully', skill: newSkill });
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', errors: error.errors });
  }
});

// Get All Skills (GET)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find(); // Fetch all skills from the database
    res.status(200).json({ message: 'Skills fetched successfully', skills });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Skill (PUT)
router.put('/:id', async (req, res) => {
  try {
    // Validate the request body using Zod
    skillValidationSchema.parse(req.body);

    // Find and update the skill
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json({ message: 'Skill updated successfully', skill: updatedSkill });
  } catch (error) {
    res.status(400).json({ message: 'Validation failed', errors: error.errors });
  }
});

// Delete Skill (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the skill
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json({ message: 'Skill deleted successfully', skill: deletedSkill });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;