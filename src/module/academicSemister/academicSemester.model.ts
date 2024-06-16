import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemEster.interface'
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './academicSemester.constant'

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
  const isSemesterExists = await SemesterModel.findOne({
    year: this.year,
    name: this.name,
  })

  if (isSemesterExists) {
    throw new Error('Semester is already exists !')
  }
  next()
})

export const SemesterModel = model<TAcademicSemester>(
  'academic-semester',
  acdemicSemesterSchema,
)