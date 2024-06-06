/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import {
  TStudent,
  TGurdian,
  TLocalGurdain,
  TName,
  StudentModel,
} from './student.interface'
import validator from 'validator'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
    unique: true,
    validate: function (value: string) {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
      if (value !== firstNameStr) {
        return false
      }
      return true
    },
  },
  middleName: { type: String, required: true },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlphanumeric(value),
      message: '{value} is not valid',
    },
  },
})

const gurdianSchema = new Schema<TGurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

const localGurdianSchema = new Schema<TLocalGurdain>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: userSchema, required: [true, 'Name is required'] },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'B+', 'A-', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    paramanentAddress: { type: String, required: true },
    gurdian: { type: gurdianSchema, required: true },
    localGurdian: { type: localGurdianSchema, required: true },
    profileImg: { type: String },
    isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

//virtual
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName
})

//pre save middleware
studentSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

//creating a customes static methods
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// creating a instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
