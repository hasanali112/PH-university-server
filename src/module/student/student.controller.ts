/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { studentService } from './student.service'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const zodParseData = studentValidationSchema.parse(studentData)
    const result = await studentService.createStudentIntoDB(zodParseData)
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student retrived successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}
const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await studentService.getStudentByIdFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student retrived successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    })
  }
}

export const studentController = {
  createStudent,
  getStudent,
  getStudentById,
}
