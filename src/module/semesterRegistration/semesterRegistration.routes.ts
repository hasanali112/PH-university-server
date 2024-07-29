import express from 'express'
import dataValidation from '../../middleware/validationMiddleware'
import { semesterRegistrationValidations } from './semesterRegistration.validation'
import { semesterRegistrationController } from './semesterRegistration.controller'

const router = express.Router()

router.post(
  '/create-semester-registration',
  dataValidation(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
)

router.get('/', semesterRegistrationController.getAllSemesterRegistration)

router.get('/:id', semesterRegistrationController.getSingleSemesterRegistration)
// router.delete('/:id', courseController.deleteCourse)

router.patch(
  '/:id',
  dataValidation(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.updateSemesterRegistration,
)

// router.put('/:courseId/assign-faculties', courseController.assignFaculties)
// router.delete(
//   '/:courseId/remove-faculties',
//   courseController.removeFacultiesFromDB,
// )

export const semesterRegistrationRoutes = router
