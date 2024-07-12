import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemEster.interface'
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './academicSemester.constant'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const acdemicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemisterName, required: true },
    code: { type: String, enum: AcademicSemisterCode, required: true },
    year: { type: String, required: true },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
)

acdemicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  })

  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already exists !')
  }
  next()
})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  acdemicSemesterSchema,
)
