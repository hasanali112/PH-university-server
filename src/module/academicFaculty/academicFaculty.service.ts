import { TAcademicFaculty } from './academicFaculty.interfaces'
import { FacultyModel } from './academicFaculty.model'

//create semester
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await FacultyModel.create(payload)
  return result
}

//get all semester
const getAllFaculty = async () => {
  const result = await FacultyModel.find()
  return result
}

//get single semester
const getSingleFaculty = async (_id: string) => {
  const result = await FacultyModel.findById(_id)
  return result
}

//update semester
const upadateFaculty = async (
  _id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await FacultyModel.findByIdAndUpdate(_id, payload, {
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
