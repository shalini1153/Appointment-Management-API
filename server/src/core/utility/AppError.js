import { httpStatus } from "../constants/HttpStatusCode";

export default class AppError extends Error {

    constructor(_message = "", _isOperational = true, _httpStatusCode = httpStatus.internalServerError) {
        super();
        Error.call(this);
        Error.captureStackTrace(this);
        AppError.message = _message;
        AppError.isOperational = _isOperational;
        this.httpStatusCode = _httpStatusCode;
    }
}
