import { z } from 'zod';

export const projectValidationSchema = z.object({
    title: z.string()
        .min(1, { message: 'Title is required.' })
        .max(200, { message: 'Title cannot exceed 200 characters.' }),

    description: z.string()
        .min(1, { message: 'Description is required.' }),

    technologies: z.array(z.string())
        .min(1, { message: 'At least one technology must be listed.' })
        .max(5, { message: 'You can list up to 5 technologies.' }),

    link: z.string()
        .url({ message: 'Link must be a valid URL.' }),

    imageUrl: z.string()
        .url({ message: 'Image URL must be a valid URL.' }),

    isPublished: z.boolean().default(false),

    createdAt: z.date().default(() => new Date()),

    updatedAt: z.date().default(() => new Date()),
});
