/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

const globalErrorhandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500
  const massage = error.message || 'Something went wrong'

  res.status(statusCode).json({
    success: false,
    massage,
    error,
  })
}

export default globalErrorhandler
