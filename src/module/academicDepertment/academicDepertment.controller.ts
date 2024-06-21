import httpStatus from 'http-status'
import catchAsync from '../../utility/catchAsyc'
import handleResponse from '../../utility/sendResponse'
import { academicDepertmentService } from './academicDepertment.service'

const createAcademicDepertment = catchAsync(async (req, res) => {
  const result = await academicDepertmentService.createAcademicDepertmentIntoDB(
    req.body,
  )
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Depertment create successfully',
    data: result,
  })
})

const getAcademicDepertment = catchAsync(async (req, res) => {
  const result = await academicDepertmentService.getAllDepertment()
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Depertment retrive successfully',
    data: result,
  })
})

const getSingleAcademicDepertment = catchAsync(async (req, res) => {
  const id = req.params.depertmentId
  const result = await academicDepertmentService.getSingleDepertment(id)
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Depertment retrive successfully',
    data: result,
  })
})

const updateDepertment = catchAsync(async (req, res) => {
  const id = req.params.depertmentId
  const depertmentData = req.body
  const result = await academicDepertmentService.upadateDepertment(
    id,
    depertmentData,
  )
  handleResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Depertment update successfully',
    data: result,
  })
})

export const academicDepertmentController = {
  createAcademicDepertment,
  getAcademicDepertment,
  getSingleAcademicDepertment,
  updateDepertment,
}
