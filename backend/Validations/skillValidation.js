import { z } from 'zod';

// Define the Skill validation schema using Zod
export  const skillValidationSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'], {
    errorMap: () => ({ message: 'Invalid skill level' }),
  }),
  imageUrl: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
});

