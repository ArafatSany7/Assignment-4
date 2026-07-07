import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createBooking = async (userEmail: string, payload: any) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });
  
  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can book a service');
  }

  const technician = await prisma.user.findUnique({
    where: { id: payload.technicianId, role: 'TECHNICIAN' },
  });

  if (!technician) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Technician not found');
  }

  const result = await prisma.booking.create({
    data: {
      customerId: customer.id,
      technicianId: payload.technicianId,
      date: new Date(payload.date),
      timeSlot: payload.timeSlot,
    },
    include: {
      customer: { select: { id: true, name: true, email: true, contactNo: true } },
      technician: { select: { id: true, name: true, email: true, contactNo: true } },
    },
  });

  return result;
};

const getCustomerBookings = async (userEmail: string) => {
  const customer = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!customer || customer.role !== 'CUSTOMER') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only customers can view their bookings');
  }

  const result = await prisma.booking.findMany({
    where: { customerId: customer.id },
    include: {
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
        },
      },
      payment: true,
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

const getTechnicianBookings = async (userEmail: string) => {
  const technician = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!technician || technician.role !== 'TECHNICIAN') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only technicians can view incoming bookings');
  }

  const result = await prisma.booking.findMany({
    where: { technicianId: technician.id },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
          address: true,
        },
      },
      payment: true,
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

export const BookingService = {
  createBooking,
  getCustomerBookings,
  getTechnicianBookings,
};
