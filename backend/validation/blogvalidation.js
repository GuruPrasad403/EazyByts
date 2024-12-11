import { z } from 'zod';

// Define the Zod schema for validating the Blog data
export const blogValidationSchema = z.object({
    title: z.string()
      .min(1, { message: 'Title is required.' })
      .max(200, { message: 'Title cannot exceed 200 characters.' }),
  
    content: z.string()
      .min(1, { message: 'Content is required.' }),
  
    author: z.string()
      .min(1, { message: 'Author is required.' })
      .max(100, { message: 'Author name cannot exceed 100 characters.' }),
  
    tags: z.array(z.string())
      .max(10, { message: 'Cannot have more than 10 tags.' }),
  
    featuredImage: z.string()
      .url({ message: 'Featured image must be a valid URL.' })
      .optional(), // Optional field for image URL
  
    isPublished: z.boolean().default(false), // Optional: default value is false (draft by default)
    publishDate: z.string()
  .optional()
  .refine(date => !date || date <= new Date(), {
    message: 'Publish date cannot be in the future.',
  }),

  
  
    createdAt: z.union([z.string(), z.date()])
      .default(() => new Date()), // Defaults to current date if not provided
  
    updatedAt: z.union([z.string(), z.date()])
      .default(() => new Date()), // Defaults to current date if not provided
  });
  