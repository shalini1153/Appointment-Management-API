import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { AuthService } from "../../services/auth/AuthService";
import { auth } from "../../constants/ErrorConstant";
import {  httpStatus} from "../../core/constants/HttpStatusCode";
import {

    tokenNotFoundMessage, updateMessage, errorMessages

} from "../../constants/MessageConstant";
import { appCode } from "../../core/constants/AppCode";

export default class AuthController extends BaseController {

    async login(req, res, next) {
        try {
            logger.info("In Controller of login")
            const responseObj = new ReponseMessage();
            const authService = new AuthService();
            const data = await authService.login(req);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            if(error.message === errorMessages.userPendingApproval){
            error.appCode =  appCode.error;
            }
            else error.message = auth.login;
            next(error);
        }
    }

    async registerUser(req, res, next) {
        try {
            logger.info("In Controller of registerUser")
            const body = req.body;
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.registerUser(body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }



    async findUserById(req, res, next) {
        try {
            logger.info("In Controller of registerUser")
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.findUserById(req.params.id);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async forgotPwd(req, res, next) {
        try {
            logger.info("In Controller of restPwd")
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const body = req.body;
            const data = await authService.forgotPwd(body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {

            logger.error(error);
            next(error);
        }
    }



    async logOut(req, res, next) {
        try {
            logger.info("In Controller of logOut")
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            let bearerToken;
            const userid=req.params.id;
            if (
                Object.prototype.hasOwnProperty.call(req.headers, "authorization")
            ) {

                const token = req.headers.authorization;
                if (token && token.startsWith("Bearer ")) {
                    bearerToken = token.split(" ")[1];
                }
            }
            if (!bearerToken) {
                responseObj.message = tokenNotFoundMessage;
                return res.status(httpStatus.unAuthorised).send(responseObj);
            } else {
                const data = await authService.logOut(bearerToken,userid);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async registerNewUser(req, res, next) {
        try {
            logger.info("In Controller of registerUser")
            const body = req.body;
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.registerNewUser(body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async resetPassword(req, res, next) {
        try {
            logger.info("In Controller of Partner resetPassword")
            const body = req.body;
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.resetPassword(body);
            if (data) {
                responseObj.message = updateMessage;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }


    async updateUserDetails(req, res, next) {
        try {
            logger.info("In Controller of registerUser")
            const body = req.body;
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.updateUserDetails(body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async activateUser(req, res, next) {
        try {
            logger.info("In Controller of activateUser")
            const body = req.body;
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.activateUser(body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            error.appCode = error.message === errorMessages.usernotActive ? appCode.error : appCode.success;
            next(error);
        }
    }

    async resendActivationLink(req, res, next) {
        try {
            logger.info("In Controller of resendActivationLink")
            const body = req.body;
            const authService = new AuthService();
            const responseObj = new ReponseMessage();
            const data = await authService.resendActivationLink(body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

}
