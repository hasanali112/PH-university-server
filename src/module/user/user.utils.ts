import { TAcademicSemester } from '../academicSemister/academicSemEster.interface'
import { User } from './user.model'

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  ).sort({ createdAt: -1 })

  return lastStudent ? lastStudent.id : undefined
}

export const generatedId = async (payload: TAcademicSemester) => {
  let currentId = '0'

  const lastStudentId = await findLastStudent()

  if (lastStudentId) {
    const lastSemesterCode = lastStudentId.substring(4, 6)
    const lastYearCode = lastStudentId.substring(0, 4)
    const currentSemesterCode = payload.code
    const currentYear = payload.year

    if (
      lastSemesterCode === currentSemesterCode &&
      lastYearCode === currentYear
    ) {
      currentId = lastStudentId.substring(6)
    }
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`

  return incrementId
}
