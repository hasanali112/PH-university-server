import { Student } from './student.model'

const getStudentFromDB = async () => {
  const result = await Student.find()
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
