import { Model } from 'mongoose'

/* eslint-disable no-unused-vars */
export type TGurdian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TLocalGurdain = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  password: string
  name: TName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'B+' | 'A-' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  paramanentAddress: string
  gurdian: TGurdian
  localGurdian: TLocalGurdain
  profileImg?: string
}

//for creating static method
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

//for creating a instance method
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >