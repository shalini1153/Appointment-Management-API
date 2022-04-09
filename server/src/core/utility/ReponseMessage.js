
// ****
// ****  Custom Response format for the Rest Api
// *****
// *****
// ***** @param :
// ****  APP_CODE : -1(error) or 1 (success)
// ****  HTTP_STATUS_CODE : 200/404/500
// ****  MESSAGE : User Defined Message (Success or error)
// ****  Data : Entity

class ResponseMessage {


    constructor(_httpStatusCode = 0, _appCode = 0, _message = "", _data) {
        ResponseMessage.httpStatusCode = _httpStatusCode || null;
        ResponseMessage.appCode = _appCode || null;
        ResponseMessage.message = _message || "";
        ResponseMessage.data = _data || {};
    }
}


export default ResponseMessage; // *** No singleTon



