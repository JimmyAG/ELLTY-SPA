import { ErrorCodes } from '../config/error.codes'
import { CustomError } from './custom.error'

export class ErrorUtils {
    static createValidationError(message: string, code?: number) {
        throw new CustomError(
            ErrorCodes.VALIDATION_ERROR.code,
            code || ErrorCodes.VALIDATION_ERROR.status,
            ErrorCodes.VALIDATION_ERROR.message + message
        )
    }

    static createError(error, afterMessage = '', beforeMessage = '') {
        throw new CustomError(
            error?.code,
            error?.status,
            beforeMessage + error?.message + afterMessage
        )
    }
}
