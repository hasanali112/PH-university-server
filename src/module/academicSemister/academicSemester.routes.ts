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

export const academicSemesterRoutes = router
