import mongoose from 'mongoose';
// Define the Skill schema
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  },
  imageUrl: {
    type: String,
    required: true, // URL to the skill's image
  },
});

// Create and export the Skill model
const SkillModel = mongoose.model('Skill', skillSchema);
export default  SkillModel