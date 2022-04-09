import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { UserService } from "../../services/user/UserService";

export default class UserController extends BaseController {

    async login(req, res, next) {
        try {
            logger.info("In Controller of login.")
            const responseObj = new ReponseMessage();
            const userService = new UserService();
            const data = await userService.login(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async registerUser(req, res, next) {
        try {
            logger.info("Start Executing registerUser method in Controller")
            const body = req.body;
            const userService = new UserService();
            const responseObj = new ReponseMessage();
            const data = await userService.registerUser(body);
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
            logger.info("In Controller of findUserById")
            const userService = new UserService();
            const responseObj = new ReponseMessage();
            const data = await userService.findUserById(req.params.id);
            logger.info(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            logger.info("In Controller of logout")
            const userService = new UserService();
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
                const data = await userService.logout(bearerToken,userid);
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

}
