/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { error } from 'console'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    massage: 'API is not found !!',
    error: '',
  })
}

export default notFoundHandler
