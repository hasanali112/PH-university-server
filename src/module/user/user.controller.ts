/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { userService } from './user.service'
import handleResponse from '../../utility/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utility/catchAsyc'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  //   const zodParseData = studentValidationSchema.parse(studentData)
  const result = await userService.createStudentIntoDB(password, studentData)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student create successfully',
    data: result,
  })
})

export const userController = {
  createStudent,
}
