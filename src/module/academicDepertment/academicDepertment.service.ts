import { TAcademicDepertment } from './academicDepertment.interface'
import { AcademicDepertment } from './academicDepertment.model'

//create semester
const createAcademicDepertmentIntoDB = async (payload: TAcademicDepertment) => {
  const result = await AcademicDepertment.create(payload)
  return result
}

//get all semester
const getAllDepertment = async () => {
  const result = await AcademicDepertment.find().populate('academicFaculty')
  return result
}

//get single semester
const getSingleDepertment = async (_id: string) => {
  const result =
    await AcademicDepertment.findById(_id).populate('academicFaculty')
  return result
}

//update semester
const upadateDepertment = async (
  _id: string,
  payload: Partial<TAcademicDepertment>,
) => {
  const result = await AcademicDepertment.findByIdAndUpdate(_id, payload, {
    new: true,
  })

  return result
}

export const academicDepertmentService = {
  createAcademicDepertmentIntoDB,
  getAllDepertment,
  getSingleDepertment,
  upadateDepertment,
}
