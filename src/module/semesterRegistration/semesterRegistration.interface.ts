import { Types } from 'mongoose'

export type TSemesterRegistration = {
  academicsSemester: Types.ObjectId
  status: 'UPCOMING' | 'ONGOING' | 'ENDED'
  startDate: Date
  endDate: Date
  minCredit: number
  maxCredit: number
}
