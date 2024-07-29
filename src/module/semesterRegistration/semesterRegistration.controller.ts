import httpStatus from 'http-status'
import catchAsync from '../../utility/catchAsyc'
import handleResponse from '../../utility/sendResponse'
import { semesterRegistrationService } from './semesterRegistration.service'

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.createSemesterRegistrationIntoDB(req.body)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course create successfully',
    data: result,
  })
})

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.getAllSemesterRegistrationFromDB()
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Semester registration retrive successfully',
    data: result,
  })
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id
  const result =
    await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Semester registration retrive successfully',
    data: result,
  })
})

// const deleteCourse = catchAsync(async (req, res) => {
//   const id = req.params.id
//   const result = await courseService.deleteCourseFromDB(id)
//   handleResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Course Deleted successfully',
//     data: result,
//   })
// })

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const id = req.params.id
  const result =
    await semesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    )
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty update successfully',
    data: result,
  })
})

// const assignFaculties = catchAsync(async (req, res) => {
//   const { courseId } = req.params
//   const { faculties } = req.body
//   const result = await courseService.assignFacultiesIntoDB(courseId, faculties)
//   handleResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Faculty assign Course  successfully',
//     data: result,
//   })
// })
// const removeFacultiesFromDB = catchAsync(async (req, res) => {
//   const { courseId } = req.params
//   const { faculties } = req.body
//   const result = await courseService.removeFaculties(courseId, faculties)
//   handleResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Remove faculty successfully',
//     data: result,
//   })
// })

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
}
