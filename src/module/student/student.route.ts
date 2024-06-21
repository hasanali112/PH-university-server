import express from 'express'
import { studentController } from './student.controller'

const router = express.Router()

router.get('/get-student', studentController.getStudent)
router.get('/:studentId', studentController.getStudentById)
router.patch('/:studentId', studentController.deleteStudentById)

export const studentRoutes = router
