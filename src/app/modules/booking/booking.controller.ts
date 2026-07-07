import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookingService } from './booking.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.user.email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getCustomerBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getCustomerBookings(req.user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getCustomerBookings,
};
