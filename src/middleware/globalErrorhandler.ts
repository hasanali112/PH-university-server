/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSource } from '../interface/error'
import config from '../config'
import handleZodError from '../errors/zodErrorHander'

const globalErrorhandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = error.message || 'Something went wrong'

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSource = simplifiedError.errorSource
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
  })
}

export default globalErrorhandler
