import { z } from 'zod';

const createProfileSchema = z.object({
  body: z.object({
    categoryId: z.string({ message: 'categoryId is required' }),
    skills: z.array(z.string(), { message: 'skills must be an array of strings' }),
    experience: z.number({ message: 'experience is required (in years)' }),
    pricing: z.number({ message: 'pricing is required' }),
  }),
});

export const TechnicianValidation = {
  createProfileSchema,
};
