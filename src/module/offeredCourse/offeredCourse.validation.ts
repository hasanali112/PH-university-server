import { z } from 'zod'
import { Days } from './offeredCourse.constant'

const createdOfferCourseSchemaValidation = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepertment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.enum([...Days] as [string, ...string[]]),
      startTime: z.string().refine(
        time => {
          const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/
          return regex.test(time)
        },
        {
          message: "Invalid time format, expected 'HH:MM' in 24 hour format",
        },
      ),
      endTime: z.string().refine(
        time => {
          const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/
          return regex.test(time)
        },
        {
          message: "Invalid time format, expected 'HH:MM' in 24 hour format",
        },
      ),
    })
    .refine(
      body => {
        const start = new Date(`1970-01-01T${body.startTime}:00`)
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start
      },
      {
        message: 'Start time should smaller than end time',
      },
    ),
})

const updateOfferCourseSchemaValidation = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
})

export const offeredCourseValidation = {
  createdOfferCourseSchemaValidation,
  updateOfferCourseSchemaValidation,
}
