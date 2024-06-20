import { TAcademicDepertment } from './academicDepertment.interface'
import { DepertmentModel } from './academicDepertment.model'

//create semester
const createAcademicDepertmentIntoDB = async (payload: TAcademicDepertment) => {
  const result = await DepertmentModel.create(payload)
  return result
}

//get all semester
const getAllDepertment = async () => {
  const result = await DepertmentModel.find()
  return result
}

//get single semester
const getSingleDepertment = async (_id: string) => {
  const result = await DepertmentModel.findById(_id)
  return result
}

//update semester
const upadateDepertment = async (
  _id: string,
  payload: Partial<TAcademicDepertment>,
) => {
  const result = await DepertmentModel.findByIdAndUpdate(_id, payload, {
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
