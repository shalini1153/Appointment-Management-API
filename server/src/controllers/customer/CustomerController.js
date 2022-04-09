import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { CustomerService } from "../../services/customer/CustomerService";
import { emailSuccess, updateMessage,notNearBy,nearBy } from "../../constants/MessageConstant";
import config from "../../config/Index";

export default class CustomerController extends BaseController {

    async login(req, res, next) {
        try {
            logger.info("In Controller of login.")
            const responseObj = new ReponseMessage();
            const customerService = new CustomerService();
            const data = await customerService.login(req);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async registerCustomer(req, res, next) {
        try {
            logger.info("In Controller of registerCustomer")
            const body = req.body;
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.registerCustomer(body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }


    async findCustomerById(req, res, next) {
        try {
            logger.info("In Controller of registerCustomer")
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.findCustomerById(req.params.id);
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

    async updateCustomerDetails(req, res, next) {
        try {
            logger.info("In Controller of registerCustomer")
            const body = req.body;
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.updateCustomerDetails(body);
            logger.info(data);
            if (data) {
                responseObj.message = updateMessage;
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async checkNearByLocation(req, res, next) {
        try {
            logger.info("In Controller of checkNearByLocation")
            const body = req.body;
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.checkNearByLocationByLatLong(body);
            logger.info(data);
            let msg=data?nearBy:notNearBy
                responseObj.message = msg;
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async resetPassword(req, res, next) {
        try {
            logger.info("In Controller of resetPassword")
            const body = req.body;
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.resetPassword(body);
            if (data) {
                responseObj.message = updateMessage;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async resetApp(req, res, next) {
        try {
            logger.info("In Controller of Partner resetApp");
            if (req.params.token && req.params.deviceType) {
                const deviceType = req.params.deviceType.toLowerCase();
                if (deviceType === 'android' || deviceType==='ios') {
                    res.redirect(`${config.resetLinks[deviceType]}?token=${req.params.token}`);
                } else {
                    return null;
                }
            }
            return null;
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async forgotPassword(req, res, next) {
        try {
            logger.info("In Controller of resetPassword")
            const body = req.body;
            const customerService = new CustomerService();
            const responseObj = new ReponseMessage();
            const data = await customerService.forgotPassword(body);
            if (data) {
                responseObj.message = emailSuccess;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}
