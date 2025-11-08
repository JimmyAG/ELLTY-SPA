export const ErrorCodes = {
    VALIDATION_ERROR: {
        code: 'E1000',
        status: 400,
        message: '',
    },
    INVALID_EMAIL_OR_PASSWORD: {
        code: 'E1001',
        status: 401,
        message: 'Invalid email or password',
    },
    INVALID_ACCESS_TOKEN: {
        code: 'E1002',
        status: 400,
        message: 'Invalid access token',
    },
    EXPIRED_ACCESS_TOKEN: {
        code: 'E1003',
        status: 401,
        message: 'Access token is expired',
    },
}
