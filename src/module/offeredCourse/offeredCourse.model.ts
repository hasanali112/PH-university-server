import { model, Schema } from 'mongoose'
import { TOfferedCourse } from './offeredCourse.interface'
import { Days } from './offeredCourse.constant'

const offeredCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'SemesterRegistration',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
  academicDepertment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepertment ',
    required: true,
  },
  course: { type: Schema.Types.ObjectId, ref: 'CourseFaculty', required: true },
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
  maxCapacity: { type: Number, required: true },
  section: { type: Number, required: true },
  days: { type: String, enum: Days, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
})

export const OfferedCourse = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
)
