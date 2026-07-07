import { z } from 'zod';

const createBookingSchema = z.object({
  body: z.object({
    technicianId: z.string({ message: 'technicianId is required' }),
    date: z.string({ message: 'date is required' }),
    timeSlot: z.string({ message: 'timeSlot is required' }),
  }),
});

export const BookingValidation = {
  createBookingSchema,
};
