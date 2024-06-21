import { z } from 'zod'

// Define the Zod schema for TName
const nameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: 'First name must start with an uppercase letter',
    }),
  middleName: z.string().min(1, { message: 'Middle name is required' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Last name must be alphanumeric' }),
})

// Define the Zod schema for TGurdian
const gurdianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z
    .string()
    .min(1, { message: "Father's contact number is required" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z
    .string()
    .min(1, { message: "Mother's contact number is required" }),
})

// Define the Zod schema for TLocalGurdain
const localGurdianValidationSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required" }),
  occupation: z
    .string()
    .min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z
    .string()
    .min(1, { message: "Local guardian's contact number is required" }),
  address: z
    .string()
    .min(1, { message: "Local guardian's address is required" }),
})

// Define the Zod schema for TStudent
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: nameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        message: "Gender is required and must be 'male', 'female', or 'other'",
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z
        .enum(['A+', 'B+', 'A-', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      paramanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      gurdian: gurdianValidationSchema,
      localGurdian: localGurdianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
})

export const studentZodValidation = {
  createStudentValidationSchema,
}
