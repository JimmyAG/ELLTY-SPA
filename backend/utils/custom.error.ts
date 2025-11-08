export class CustomError extends Error {
    code: string
    status: number
    statusText?: string

    constructor(
        errorCode: string,
        httpStatusCode: number,
        message: string,
        httpStatusText?: string
    ) {
        super(message)
        this.code = errorCode
        this.status = httpStatusCode
        this.statusText = httpStatusText
    }
}
