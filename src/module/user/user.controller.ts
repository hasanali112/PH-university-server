/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'
import handleResponse from '../../utility/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body
    //   const zodParseData = studentValidationSchema.parse(studentData)
    const result = await userService.createStudentIntoDB(password, studentData)
    handleResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student create successfully',
      data: result,
    })
  } catch (error: any) {
    next(error)
  }
}

export const userController = {
  createStudent,
}
