import mongoose from 'mongoose'
import { TCourse } from './course.interface'
import { Course } from './course.model'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCoursesFromDB = async () => {
  const result = await Course.find().populate('preRequisiteCourse.course')
  return result
}

const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisiteCourse.course')
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload

  //create transaction session
  const session = await mongoose.startSession()

  try {
    //transaction start
    session.startTransaction()

    //besic update info
    const updateBesicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updateBesicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course update failed')
    }

    //filter out the delete course
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletedPreRequisite = preRequisiteCourse
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course)
      const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!deletedPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course update failed')
      }

      const newPreRequisites = preRequisiteCourse?.filter(
        el => el.course && !el.isDeleted,
      )

      const newPreRequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )
      if (!newPreRequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course update failed')
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    )

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Course update failed')
  }
}

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const courseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
}
