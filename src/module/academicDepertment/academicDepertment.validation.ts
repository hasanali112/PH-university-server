import { z } from 'zod'

const careateAcademicDepertmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string type',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Faculty must be string type',
      required_error: 'Faculty is required',
    }),
  }),
})

const updateAcademicDepertmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string type',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Faculty must be string type',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
})

export const depertmentValidation = {
  careateAcademicDepertmentValidationSchema,
  updateAcademicDepertmentValidationSchema,
}
