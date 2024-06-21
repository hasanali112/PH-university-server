import { Student } from './student.model'

const getStudentFromDB = async () => {
  const result = await Student.find()
    .populate({ path: 'admissionSemester' })
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return result
}

const getStudentByIdFromDB = async (_id: string) => {
  const result = await Student.findOne({ _id })
  return result
}

export const studentService = {
  getStudentFromDB,
  getStudentByIdFromDB,
}
