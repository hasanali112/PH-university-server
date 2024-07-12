import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { TAcademicSemester } from './academicSemEster.interface'
import { AcademicSemester } from './academicSemester.model'
import { semesterCodeMapper } from './academicSemester.utils'

//create semester
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (semesterCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Code is invalid')
  }

  const result = await AcademicSemester.create(payload)
  return result
}

//get all semester
const getAllSemester = async () => {
  const result = await AcademicSemester.find()
  return result
}

//get single semester
const getSingleSemester = async (_id: string) => {
  const result = await AcademicSemester.findById(_id)
  return result
}

//update semester
const upadateSemester = async (
  _id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    semesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Code is invalid')
  }

  const result = await AcademicSemester.findByIdAndUpdate(_id, payload, {
    new: true,
  })

  return result
}

export const academicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllSemester,
  getSingleSemester,
  upadateSemester,
}
