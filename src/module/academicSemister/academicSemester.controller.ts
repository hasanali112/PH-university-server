/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import handleResponse from '../../utility/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utility/catchAsyc'
import { academicSemesterService } from './academicSemester.service'

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  )
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student create successfully',
    data: result,
  })
})

export const academicSemisterController = {
  createAcademicSemister,
}
