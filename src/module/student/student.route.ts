import express from 'express'
import { studentController } from './student.controller'

const router = express.Router()

router.get('/get-student', studentController.getStudent)
router.get('/:studentId', studentController.getStudentById)
router.delete('/:studentId', studentController.deleteStudentById)
router.patch('/:studentId', studentController.updateStudentById)

export const studentRoutes = router
