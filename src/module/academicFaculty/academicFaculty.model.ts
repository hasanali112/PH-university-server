import { Schema, model } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interfaces'

const facultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: [true, 'Faculty name is required'] },
  },
  {
    timestamps: true,
  },
)

export const FacultyModel = model<TAcademicFaculty>('Faculty', facultySchema)
