import httpStatus from 'http-status'
import config from '../../config'
import { AppError } from '../../utility/AppError'
import { AcademicSemester } from '../academicSemister/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generatedId } from './user.utils'
import mongoose from 'mongoose'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //set role
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)

  //set studebt role
  userData.role = 'student'

  //find semester by id
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //manually id
    userData.id = await generatedId(admissionSemester)

    //create a user
    const newUser = await User.create([userData], { session })

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User created failed')
    }

    //create a student
    if (newUser.length) {
      //set id, _id as user
      payload.id = newUser[0].id
      payload.user = newUser[0]._id
      const newStudent = await Student.create([payload], { session })

      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Student created failed')
      }

      await session.commitTransaction()
      await session.endSession()

      return newStudent
    }
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create')
  }
}

export const userService = {
  createStudentIntoDB,
}
