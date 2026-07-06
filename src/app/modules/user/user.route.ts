import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = express.Router();

router.get(
  '/profile',
  auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
  UserController.getMyProfile
);

export const UserRoutes = router;
