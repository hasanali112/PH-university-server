import { Schema, model } from 'mongoose'
import { TAcademicDepertment } from './academicDepertment.interface'

const depertmentSchema = new Schema<TAcademicDepertment>(
  {
    name: {
      type: String,
      required: [true, 'Depertment name is required'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'FacultyModel',
      required: [true, 'Academic faculty name is required'],
    },
  },
  {
    timestamps: true,
  },
)

export const DepertmentModel = model<TAcademicDepertment>(
  'Depertment',
  depertmentSchema,
)
