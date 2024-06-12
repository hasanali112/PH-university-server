/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { studentService } from './student.service'

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentService.getStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student retrived successfully',
      data: result,
    })
  } catch (error: any) {
    next(error)
  }
}
const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const result = await studentService.getStudentByIdFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student retrived successfully',
      data: result,
    })
  } catch (error: any) {
    next(error)
  }
}

export const studentController = {
  getStudent,
  getStudentById,
}
