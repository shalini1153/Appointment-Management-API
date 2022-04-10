import { httpStatus } from "../constants/HttpStatusCode";

export default class AppError extends Error {

    constructor(_message = "", _isOperational = true, _httpStatusCode = httpStatus.internalServerError) {
        super();
        Error.call(this);
        Error.captureStackTrace(this);
        this.message = _message;
        this.isOperational = _isOperational;
        this.httpStatusCode = _httpStatusCode;
    }
}
