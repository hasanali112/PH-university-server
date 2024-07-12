import { Schema, model } from 'mongoose'
import { TAcademicDepertment } from './academicDepertment.interface'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'

const depertmentSchema = new Schema<TAcademicDepertment>(
  {
    name: {
      type: String,
      required: [true, 'Depertment name is required'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: [true, 'Academic faculty name is required'],
    },
  },
  {
    timestamps: true,
  },
)

depertmentSchema.pre('save', async function (next) {
  const isDepertmentExists = await AcademicDepertment.findOne({
    name: this.name,
  })

  if (isDepertmentExists) {
    throw new AppError(404, 'Depertment already exists')
  }

  next()
})

depertmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepertmentIdExists = await AcademicDepertment.findOne(query)
  if (!isDepertmentIdExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Depertment does not exists')
  }

  next()
})

export const AcademicDepertment = model<TAcademicDepertment>(
  'AcademicDepertment',
  depertmentSchema,
)
