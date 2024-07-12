import mongoose from 'mongoose'
import { TGenericErrorResponse } from '../interface/error'

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSource = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      }
    },
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  }
}

export default handleValidationError
