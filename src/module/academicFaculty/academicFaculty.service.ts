import { TAcademicFaculty } from './academicFaculty.interfaces'
import { AcademicFaculty } from './academicFaculty.model'

//create semester
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

//get all semester
const getAllFaculty = async () => {
  const result = await AcademicFaculty.find()
  return result
}

//get single semester
const getSingleFaculty = async (_id: string) => {
  const result = await AcademicFaculty.findById(_id)
  return result
}

//update semester
const upadateFaculty = async (
  _id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(_id, payload, {
    new: true,
  })

  return result
}

export const academicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllFaculty,
  getSingleFaculty,
  upadateFaculty,
}
