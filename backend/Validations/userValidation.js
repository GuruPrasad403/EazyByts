import { z } from 'zod';

const userValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().regex(/^\+91\s\d{10}$/, 'Phone must be in +91 format'),
    experience: z.string(),
    age: z.string(),
    address: z.string().min(1, 'Address is required'),
    freelance: z.boolean(),
    profilePicture: z.string().url('Profile Picture must be a valid URL'),
    aboutSection: z.string().url('About Section must be a valid URL'),
    mainStack: z.string().min(1, 'Main Stack is required')
});

export default userValidationSchema;
