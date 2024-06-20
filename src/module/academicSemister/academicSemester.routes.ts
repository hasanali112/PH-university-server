import express from 'express'
import { academicSemisterController } from './academicSemester.controller'
import dataValidation from '../../middleware/validationMiddleware'
import { academicSemesterValidation } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-semester',
  dataValidation(
    academicSemesterValidation.createAcademicSemesterSchemaValidation,
  ),
  academicSemisterController.createAcademicSemister,
)

router.get(
  '/academic-semesters',
  academicSemisterController.getAcademicSemisters,
)

router.get(
  '/academic-semesters/:semesterId',
  academicSemisterController.getSingleAcademicSemister,
)

router.patch(
  '/academic-semesters/:semesterId',
  dataValidation(
    academicSemesterValidation.updateAcademicSemesterSchemaValidation,
  ),
  academicSemisterController.updateSemester,
)

export const academicSemesterRoutes = router
