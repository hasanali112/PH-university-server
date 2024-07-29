import httpStatus from 'http-status'
import { AppError } from '../../errors/AppError'
import { AcademicSemester } from '../academicSemister/academicSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import { registrationStatus } from './semesterRegistration.constant'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicsSemester

  const isTheirAnyUpcomingOrOnging = await SemesterRegistration.findOne({
    $or: [
      { status: registrationStatus.UPCOMING },
      { status: registrationStatus.ONGOING },
    ],
  })

  if (isTheirAnyUpcomingOrOnging) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isTheirAnyUpcomingOrOnging.status} register semester !`,
    )
  }

  const isSemesterRegistration = await SemesterRegistration.findOne({
    academicSemester,
  })

  if (isSemesterRegistration) {
    throw new AppError(httpStatus.CONFLICT, 'Semester already registered')
  }

  const isAcademicExists = await AcademicSemester.findById(academicSemester)

  if (!isAcademicExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found!',
    )
  }

  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemesterRegistrationFromDB = async () => {
  const result = await SemesterRegistration.find().populate('academicsSemester')
  return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicsSemester')
  return result
}

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const registerData = payload.status
  const isSemesterRegistration = await SemesterRegistration.findById(id)

  if (!isSemesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found')
  }
  const requestedSemeterStatus = isSemesterRegistration?.status
  if (requestedSemeterStatus === registrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${requestedSemeterStatus}`,
    )
  }

  if (
    requestedSemeterStatus === registrationStatus.UPCOMING &&
    registerData === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester can not update upcoming to ended',
    )
  }

  if (
    requestedSemeterStatus === registrationStatus.UPCOMING &&
    registerData === registrationStatus.ONGOING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester can not update onging to upcoming',
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload)
  return result
}

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
