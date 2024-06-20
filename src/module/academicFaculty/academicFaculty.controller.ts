import httpStatus from 'http-status'
import catchAsync from '../../utility/catchAsyc'
import handleResponse from '../../utility/sendResponse'
import { academicFacultyService } from './academicFaculty.service'

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  )
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty create successfully',
    data: result,
  })
})

const getAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAllFaculty()
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculty retrive successfully',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.facultyId
  const result = await academicFacultyService.getSingleFaculty(id)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrive successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req, res) => {
  const id = req.params.facultyId
  const semesterData = req.body
  const result = await academicFacultyService.upadateFaculty(id, semesterData)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty update successfully',
    data: result,
  })
})

export const academicFacultyController = {
  createAcademicSemister,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  updateFaculty,
}
