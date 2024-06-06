import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (TStudent: TStudent) => {
  if (await Student.isUserExists(TStudent.id)) {
    throw new Error('User already exists')
  }

  const result = await Student.create(TStudent)
  //creating a instance method
  // const student = new Student(TStudent)
  // if (await student.isUserExists(TStudent.id)) {
  //   throw new Error('User already exists')
  // }
  // const result = await student.save()

  return result
}

const getStudentFromDB = async () => {
  const result = await Student.find()
  return result
}

const getStudentByIdFromDB = async (_id: string) => {
  const result = await Student.findOne({ _id })
  return result
}

export const studentService = {
  createStudentIntoDB,
  getStudentFromDB,
  getStudentByIdFromDB,
}
