import { z } from 'zod';

const createCategorySchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
  }),
});

export const CategoryValidation = {
  createCategorySchema,
};
