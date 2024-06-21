import mongoose from 'mongoose'
import { Student } from './student.model'
import { AppError } from '../../utility/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

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

const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const userId = await Student.findOne({ id })
    if (!userId) {
      throw new AppError(httpStatus.BAD_REQUEST, 'USER id not found')
    }

    const studentDelete = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!studentDelete) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Student delete unseccessfully',
      )
    }

    const userDelete = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!userDelete) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User delete unseccessfully')
    }

    await session.commitTransaction()
    await session.endSession()

    return studentDelete
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const studentService = {
  getStudentFromDB,
  getStudentByIdFromDB,
  deleteStudent,
}
