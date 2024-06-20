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
    message: 'Semester create successfully',
    data: result,
  })
})

const getAcademicSemisters = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAllSemester()
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All semester retrive successfully',
    data: result,
  })
})

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const id = req.params.semesterId
  const result = await academicSemesterService.getSingleSemester(id)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrive successfully',
    data: result,
  })
})

const updateSemester = catchAsync(async (req, res) => {
  const id = req.params.semesterId
  const semesterData = req.body
  const result = await academicSemesterService.upadateSemester(id, semesterData)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester update successfully',
    data: result,
  })
})

export const academicSemisterController = {
  createAcademicSemister,
  getAcademicSemisters,
  getSingleAcademicSemister,
  updateSemester,
}
