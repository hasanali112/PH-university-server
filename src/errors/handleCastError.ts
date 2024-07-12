import mongoose from 'mongoose'
import { TGenericErrorResponse } from '../interface/error'

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSource = [
    {
      path: error.path,
      message: error.message,
    },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid id',
    errorSource,
  }
}

export default handleCastError
