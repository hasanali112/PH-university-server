import config from '../../config'
import { SemesterModel } from '../academicSemister/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { generatedId } from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //set role
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  //set studebt role
  userData.role = 'student'

  //find semester by id

  const admissionSemester = await SemesterModel.findById(
    payload.admissionSemester,
  )

  if (!admissionSemester) {
    throw new Error('Admission semester not found')
  }

  //manually id
  userData.id = await generatedId(admissionSemester)

  //create a user
  const newUser = await UserModel.create(userData)

  //create a student
  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id
    payload.user = newUser._id
    const newStudent = await Student.create(payload)
    return newStudent
  }
}

export const userService = {
  createStudentIntoDB,
}
