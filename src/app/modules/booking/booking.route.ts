import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/',
  auth(Role.CUSTOMER),
  validateRequest(BookingValidation.createBookingSchema),
  BookingController.createBooking
);

export const BookingRoutes = router;
