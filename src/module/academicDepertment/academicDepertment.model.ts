import { Schema, model } from 'mongoose'
import { TAcademicDepertment } from './academicDepertment.interface'
// import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'

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

class AppError extends Error {
  public statusCode: number

  constructor(statusCode: number, message: string, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

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
    throw new Error('Depertment does not exists')
  }

  next()
})

export const AcademicDepertment = model<TAcademicDepertment>(
  'AcademicDepertment',
  depertmentSchema,
)
