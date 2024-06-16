import express from 'express'
import { userController } from './user.controller'

import { studentZodValidation } from '../student/student.validation'
import dataValidation from '../../middleware/validationMiddleware'

const router = express.Router()

router.post(
  '/create-student',
  dataValidation(studentZodValidation.createStudentValidationSchema),
  userController.createStudent,
)

export const userRoutes = router
