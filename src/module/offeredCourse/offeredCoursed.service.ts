import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { AcademicDepertment } from '../academicDepertment/academicDepertment.model'
import { TOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { CourseFaculty } from '../course/course.model'
import { AcademicSemester } from '../academicSemister/academicSemester.model'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    academicDepertment,
    academicFaculty,
    course,
    academicSemester,
    semesterRegistration,
  } = payload

  const isExistAcademicDepertment =
    await AcademicDepertment.findById(academicDepertment)
  if (!isExistAcademicDepertment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic depertment is not found')
  }

  const isExistAcademicFaculty = await AcademicFaculty.findById(academicFaculty)
  if (!isExistAcademicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty is not found')
  }

  const isExistCourse = await CourseFaculty.findById(course)
  if (!isExistCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found')
  }

  const isExistAcademicSemester =
    await AcademicSemester.findById(academicSemester)
  if (!isExistAcademicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester is not found')
  }
  const isExistSemesterRegistration =
    await SemesterRegistration.findById(semesterRegistration)
  if (!isExistSemesterRegistration) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found',
    )
  }

  const academicSemeter = isExistSemesterRegistration.academicsSemester

  const result = await OfferedCourse.create({ ...payload, academicSemeter })
  return result
}

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
}
