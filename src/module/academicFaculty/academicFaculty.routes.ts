import express from 'express'
import dataValidation from '../../middleware/validationMiddleware'
import { facultyValidation } from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-faculty',
  dataValidation(facultyValidation.careateAcademicSchemaValidationSchema),
  academicFacultyController.createAcademicSemister,
)

router.get('/', academicFacultyController.getAcademicFaculty)

router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty)

router.patch(
  '/:facultyId',
  dataValidation(facultyValidation.updateAcademicSchemaValidationSchema),
  academicFacultyController.updateFaculty,
)

export const academicFacultyRoutes = router
