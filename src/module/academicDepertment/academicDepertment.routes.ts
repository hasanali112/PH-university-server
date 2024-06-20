import express from 'express'
import dataValidation from '../../middleware/validationMiddleware'
import { depertmentValidation } from './academicDepertment.validation'
import { academicDepertmentController } from './academicDepertment.controller'

const router = express.Router()

router.post(
  '/create-depertment',
  dataValidation(
    depertmentValidation.careateAcademicDepertmentValidationSchema,
  ),
  academicDepertmentController.createAcademicDepertment,
)

router.get('/', academicDepertmentController.getAcademicDepertment)

router.get(
  '/:depertmentId',
  academicDepertmentController.getSingleAcademicDepertment,
)

router.patch(
  '/:depertmentId',
  dataValidation(depertmentValidation.updateAcademicDepertmentValidationSchema),
  academicDepertmentController.updateDepertment,
)

export const academicDepertmentRoutes = router
