import z from 'zod';

export const Validation = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(15),
    isAdmin: z.boolean().default(false),
    isVerified: z.boolean().default(false),
}).strict();
