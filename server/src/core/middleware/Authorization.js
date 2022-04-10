import ResponseMessage from "../utility/ReponseMessage";
import { appCode } from "../constants/AppCode";
import { httpStatus } from "../constants/HttpStatusCode";
import {
    errorMessages,
} from "../../constants/MessageConstant";
import { UserService } from "../../services/user/UserService";
import logger from "../Logger";
import AppError from "../utility/AppError";
export const authorization = () => {
    return async (req, res, next) => {
        try {
            console.log("In authorize");
            let bearerToken;
            const userAuthService = new UserService();
            // @ get services for container

            const obj = new ResponseMessage();
            obj.httpStatusCode = httpStatus.unAuthorised;
            obj.appCode = appCode.error;

            if (
                req.query &&
                Object.prototype.hasOwnProperty.call(req.query, "access_token")
            ) {
                req.headers.authorization = `Bearer ${req.query.access_token}`;
            }
            // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
            if (req.query && typeof req.headers.authorization === "undefined") {
                req.headers.authorization = `Bearer ${req.cookies.token}`;
            }

            // @** Get bearer token from header
            if (
                Object.prototype.hasOwnProperty.call(
                    req.headers,
                    "authorization"
                ) ||
                Object.prototype.hasOwnProperty.call(
                    req.headers,
                    "x-access-token"
                )
            ) {
                const token = req.headers.authorization;
                if (token && token.startsWith("Bearer ")) {
                    bearerToken = token.split(" ")[1];
                }
            }
            console.log("bearerToken",bearerToken);
            if (!bearerToken) {
                obj.message = errorMessages.tokenNotFoundMessage;
                return res.status(httpStatus.unAuthorised).send(obj);
            } else {
                try {
                    const userId = await userAuthService.verifyUserToken(
                        bearerToken
                    );
                    console.log("userId",userId);
                    if (!userId) {
                        throw new AppError(errorMessages.invalidToken);
                    }
                    //const user = await userAuthService.getUserById();
                    //req.user = user; // @inject user in the request Session i.e stateless protocol
                    next(); //@ by pass to the next request or middleware
                } catch (tokenError) {
                    logger.error(`###tokenError ${tokenError}`);
                    obj.message = errorMessages.unAuthorisedMessage;
                    return res.status(httpStatus.unAuthorised).send(obj);
                }
            }
        } catch (error) {
            next(error);
        }
    };
};
