import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const getMyProfile = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      technicianProfile: true,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { password, ...userData } = user;
  return userData;
};

export const UserService = {
  getMyProfile,
};
