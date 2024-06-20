import { z } from 'zod'
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './academicSemester.constant'

const createAcademicSemesterSchemaValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemisterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
})

const updateAcademicSemesterSchemaValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterName] as [string, ...string[]]).optional(),
    code: z.enum([...AcademicSemisterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
})

export const academicSemesterValidation = {
  createAcademicSemesterSchemaValidation,
  updateAcademicSemesterSchemaValidation,
}
