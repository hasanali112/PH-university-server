import { TAcademicSemester } from '../academicSemister/academicSemEster.interface'
import { UserModel } from './user.model'

const findLastStudent = async () => {
  const lastStudent = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  ).sort({ createdAt: -1 })

  return lastStudent?.id ? lastStudent.id : undefined
}

export const generatedId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString()

  const lastStudentId = await findLastStudent()

  const lastSemesterCode = lastStudentId?.substring(4, 6)
  const lastYearCode = lastStudentId?.substring(0, 4)
  const currentSemesterCode = payload.code
  const currentYear = payload.year

  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    lastYearCode === currentYear
  ) {
    currentId = lastStudentId?.substring(6)
  }

  let inCrementID = (Number(currentId) + 1).toString().padStart(4, '0')

  inCrementID = `${payload.year}${payload.code}${inCrementID}`

  return inCrementID
}
