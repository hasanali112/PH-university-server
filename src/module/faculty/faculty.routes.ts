import express from 'express'
import dataValidation from '../../middleware/validationMiddleware'
import { FacultyControllers } from './faculty.controller'
import { updateFacultyValidationSchema } from './faculty.validation'

const router = express.Router()

router.get('/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  dataValidation(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

router.delete('/:id', FacultyControllers.deleteFaculty)

router.get('/', FacultyControllers.getAllFaculties)

export const FacultyRoutes = router
