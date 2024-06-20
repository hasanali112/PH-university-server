import { TAcademicSemester } from './academicSemEster.interface'
import { SemesterModel } from './academicSemester.model'
import { semesterCodeMapper } from './academicSemester.utils'

//create semester
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (semesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Code is invalid')
  }

  const result = await SemesterModel.create(payload)
  return result
}

//get all semester
const getAllSemester = async () => {
  const result = await SemesterModel.find()
  return result
}

//get single semester
const getSingleSemester = async (_id: string) => {
  const result = await SemesterModel.findById(_id)
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
    throw new Error('Code is invalid')
  }

  const result = await SemesterModel.findByIdAndUpdate(_id, payload, {
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
