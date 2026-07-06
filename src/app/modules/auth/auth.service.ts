import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const registerUser = async (payload: any) => {
  const isEmailExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isEmailExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists!');
  }

  // Hash password
  payload.password = await bcrypt.hash(payload.password, 12);

  const newUser = await prisma.user.create({
    data: payload,
  });

  const { password, ...result } = newUser;
  return result;
};

export const AuthService = {
  registerUser,
};
