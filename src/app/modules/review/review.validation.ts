import { z } from 'zod';

const createReviewSchema = z.object({
  body: z.object({
    bookingId: z.string({ required_error: 'Booking ID is required' }),
    rating: z.number({ required_error: 'Rating is required' }).min(1).max(5),
    comment: z.string({ required_error: 'Comment is required' }),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
};
