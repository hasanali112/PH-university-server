/* eslint-disable no-console */
import mongoose from 'mongoose'
import { Student } from './student.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'

const getStudentFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }
  const studentSearchableField = ['email', 'name.firstName', 'presentAddress']

  let searchTerm = ''

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }

  const searchQuery = Student.find({
    $or: studentSearchableField.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  //filter
  const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields']

  excludeField.forEach(el => delete queryObj[el])

  const filterQuery = searchQuery
    .find(queryObj)
    .populate({ path: 'admissionSemester' })
    .populate({
      path: 'academicDepertment',
      populate: {
        path: 'academicFaculty',
      },
    })

  let sort = '-createdAt'

  if (query?.sort) {
    sort = query.sort as string
  }

  const sortedQuery = filterQuery.sort(sort)

  let page = 1
  let limit = 1
  let skip = 1

  if (query.limit) {
    limit = Number(query.limit)
  }

  if (query.page) {
    page = Number(query.page)
    skip = (page - 1) * limit
  }

  const paginatedQuery = sortedQuery.skip(skip)

  const limitQuery = paginatedQuery.limit(limit)

  let fields = '_v'

  if (query.field) {
    fields = (query.field as string).split(',').join(' ')
  }

  const fieldLimit = await limitQuery.select(fields)

  return fieldLimit
}

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findOneAndUpdate({ id })
  return result
}

const updateStudentField = async (id: string, payload: Partial<TStudent>) => {
  const { name, gurdian, localGurdian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
      console.log(modifiedUpdatedData)
    }
  }

  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGurdian && Object.keys(localGurdian).length) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
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
  updateStudentField,
}
