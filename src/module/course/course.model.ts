import { model, Schema } from 'mongoose'
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface'

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const courseShema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  prefix: {
    type: String,
    unique: true,
    trim: true,
  },
  code: {
    type: Number,
    require: true,
    trim: true,
  },
  credits: {
    type: Number,
    require: true,
    trim: true,
  },
  preRequisiteCourse: [preRequisiteCourseSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export const Course = model<TCourse>('Course', courseShema)

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
})

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
)
