import express from 'express'
import dataValidation from '../../middleware/validationMiddleware'
import { courseValidation } from './course.validation'
import { courseController } from './course.controller'

const router = express.Router()

router.post(
  '/create-course',
  dataValidation(courseValidation.createCourseValidationSchema),
  courseController.createCourse,
)

router.get('/', courseController.getAllCourse)

router.get('/:id', courseController.getSingleCourse)
router.delete('/:id', courseController.deleteCourse)

router.patch(
  '/:id',
  dataValidation(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse,
)

router.put('/:courseId/assign-faculties', courseController.assignFaculties)
router.delete(
  '/:courseId/remove-faculties',
  courseController.removeFacultiesFromDB,
)

export const courseRoutes = router
