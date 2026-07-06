import express from 'express';
import { TechnicianController } from './technician.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TechnicianValidation } from './technician.validation';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
  '/profile',
  auth(Role.TECHNICIAN),
  validateRequest(TechnicianValidation.createProfileSchema),
  TechnicianController.createProfile
);

export const TechnicianRoutes = router;
