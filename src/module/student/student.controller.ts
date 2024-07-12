/* eslint-disable @typescript-eslint/no-explicit-any */
import { studentService } from './student.service'
import catchAsync from '../../utility/catchAsyc'

const getStudent = catchAsync(async (req, res) => {
  const result = await studentService.getStudentFromDB()
  res.status(200).json({
    success: true,
    message: 'Student retrived successfully',
    data: result,
  })
})

const getStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await studentService.getStudentByIdFromDB(studentId)
  res.status(200).json({
    success: true,
    message: 'Student retrived successfully',
    data: result,
  })
})

const deleteStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await studentService.deleteStudent(studentId)
  res.status(200).json({
    success: true,
    message: 'Student retrived successfully',
    data: result,
  })
})

const updateStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const studentData = req.body
  const result = await studentService.updateStudentField(studentId, studentData)
  res.status(200).json({
    success: true,
    message: 'Student update successfully',
    data: result,
  })
})

export const studentController = {
  getStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById,
}
