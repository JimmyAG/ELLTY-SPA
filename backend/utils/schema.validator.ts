/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ErrorCodes } from '../config/error.codes'
import { CustomError } from './custom.error'
import { Request, Response, NextFunction } from 'express'

class SchemaValidator {
    public validate(bodySchema: Request['body']) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = bodySchema.validate(req.body)
            error ? next(this.createValidationError(error)) : next()
        }
    }

    public validateRequestQueryParams(querySchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { error } = querySchema.validate(req.query)
            error ? next(this.createValidationError(error)) : next()
        }
    }

    private createValidationError(error: string) {
        return new CustomError(
            ErrorCodes.VALIDATION_ERROR.code,
            ErrorCodes.VALIDATION_ERROR.status,
            error
        )
    }

    public validateInService(
        bodySchema: Request['body'],
        requestBody: Request
    ) {
        const { error } = bodySchema.validate(requestBody)
        if (error) throw this.createValidationError(error)
    }
}

const schemaValidator = new SchemaValidator()
export default schemaValidator
