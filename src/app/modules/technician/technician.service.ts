import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createProfile = async (email: string, payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.role !== 'TECHNICIAN') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only technicians can create a profile');
  }

  const existingProfile = await prisma.technicianProfile.findUnique({
    where: { userId: user.id },
  });

  if (existingProfile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Technician profile already exists for this user');
  }

  const result = await prisma.technicianProfile.create({
    data: {
      userId: user.id,
      ...payload,
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
          address: true,
          profileImg: true,
        },
      },
    },
  });

  return result;
};

export const TechnicianService = {
  createProfile,
};
