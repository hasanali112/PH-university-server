import express from 'express'
import dataValidation from '../../middleware/validationMiddleware'
import { offeredCourseValidation } from './offeredCourse.validation'
import { offeredCourseController } from './offeredCourse.controller'

const router = express.Router()

router.post(
  '/create-offer-course',
  dataValidation(offeredCourseValidation.createdOfferCourseSchemaValidation),
  offeredCourseController.createOfferedCourse,
)

// router.get('/', courseController.getAllCourse)

// router.get('/:id', courseController.getSingleCourse)
// router.delete('/:id', courseController.deleteCourse)

// router.patch(
//   '/:id',
//   dataValidation(courseValidation.updateCourseValidationSchema),
//   courseController.updateCourse,
// )

// router.put('/:courseId/assign-faculties', courseController.assignFaculties)
// router.delete(
//   '/:courseId/remove-faculties',
//   courseController.removeFacultiesFromDB,
// )

export const offeredCourseRoutes = router
