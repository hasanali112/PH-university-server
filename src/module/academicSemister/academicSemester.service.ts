import { TAcademicSemester } from './academicSemEster.interface'
import { SemesterModel } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TSemesterCodeMapper = {
    [key: string]: string
  }

  const semesterCodeMapper: TSemesterCodeMapper = {
    Summer: '01',
    Autum: '02',
    Fall: '03',
  }

  if (semesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Code is invalid')
  }

  const result = await SemesterModel.create(payload)
  return result
}

export const academicSemesterService = {
  createAcademicSemesterIntoDB,
}
