import ResponseMessage from "../utility/ReponseMessage";
import { appCode } from "../constants/AppCode";
import { httpStatus } from "../constants/HttpStatusCode";
import CreateResponse from "../utility/CreateResponse";

export const exceptionHandling = (err, req, res, next) => {
    const createResponse = new CreateResponse();
    const obj = new ResponseMessage();
    obj.appCode = err.appCode ? err.appCode : appCode.success;
    obj.httpStatusCode = err.httpStatusCode ? err.httpStatusCode : httpStatus.internalServerError;
    obj.message = err.message;
    createResponse.error(res, obj);
};
