import { Types } from 'mongoose'

export type TAcademicDepertment = {
  name: string
  academicFaculty: Types.ObjectId
}
