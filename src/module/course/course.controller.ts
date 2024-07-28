import httpStatus from 'http-status'
import catchAsync from '../../utility/catchAsyc'
import handleResponse from '../../utility/sendResponse'
import { courseService } from './course.service'

const createCourse = catchAsync(async (req, res) => {
  const result = await courseService.createCourseIntoDB(req.body)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course create successfully',
    data: result,
  })
})

const getAllCourse = catchAsync(async (req, res) => {
  const result = await courseService.getAllCoursesFromDB()
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All course retrive successfully',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await courseService.getSingleCoursesFromDB(id)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single course retrive successfully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await courseService.deleteCourseFromDB(id)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Deleted successfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await courseService.updateCourseIntoDB(id, req.body)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty update successfully',
    data: result,
  })
})

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
}
