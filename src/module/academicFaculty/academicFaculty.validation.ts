import { z } from 'zod'

const careateAcademicSchemaValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
})

const updateAcademicSchemaValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
})

export const facultyValidation = {
  careateAcademicSchemaValidationSchema,
  updateAcademicSchemaValidationSchema,
}
