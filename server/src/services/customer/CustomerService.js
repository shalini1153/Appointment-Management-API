import TokenService from "../../core/utility/TokenService";
import config from "../../config/Index";
import { CustomerRepository } from "../../repository/customer/CustomerRepository";
import AppError from "../../core/utility/AppError";
import moment from "moment";
import requestIp from "request-ip";
import * as messages from "../../constants/MessageConstant";
import logger from "../../core/Logger";
import { AuthService } from "../auth/AuthService";
import Mailer from "../../core/utility/Mailer";

export class CustomerService {

    static customerRepo;
    static authService;
    constructor() {
        this.customerRepo = new CustomerRepository();
        this.authService = new AuthService;
    }

    async login(req) {
        try {
            const body = req.body;
            const tokenService = new TokenService(config.token.privateKey, config.token.options);
            const emailResponse = await this.customerRepo.findCustomerByEmail(body.email);
            if (emailResponse?.email) {
                // const pwdResponse = await this.customerRepo.findCustomerByPassword(body.password);
                const isValidPass = await this.authService.comparePassword(body.password, emailResponse.password);
                if (!isValidPass) {
                    throw new AppError(messages.errorMessages.passwordIncorrect);
                }
                else {
                    const token = tokenService.sign({});
                    const startTime = moment().utc().format();
                    const endTime = moment().utc().add(config.logoutExpTime, "minutes").format();
                    const usertokendata = {
                        token,
                        customerId: emailResponse.id,
                        startTime,
                        endTime,
                        isLoggedIn: true,
                        ip: requestIp.getClientIp(req),
                        customerAgent: req.headers["customer-agent"]
                    };
                    await this.customerRepo.saveCustomerSession(usertokendata);
                    return {
                        token: token,
                        customerId: emailResponse.id,
                        firstName: emailResponse.firstName,
                        lastName: emailResponse.lastName,
                        email: emailResponse.email,
                        phone: emailResponse.phone
                    };
                }
            }
            else {
                throw new AppError(messages.errorMessages.emailIncorrect);
            }
        }
        catch (error) {
            logger.error(`Error in login method of CustomerService ${error}`);
            throw error;
        }
    }

    async registerCustomer(customer) {
        try {
            logger.info("Started Execution for registerCustomer ==>")
            let { password } = customer;
            const validatePasswordRegex = this.authService.checkPasswordForCustomer(password)
            if (!validatePasswordRegex) {
                throw new AppError(messages.errorMessages.passwordFormatErrorForCustomer);
            }
            customer.password = await this.authService.getHashedPassword(password);

            const res = await this.customerRepo.saveCustomer(customer);
            const mailer = new Mailer();
            mailer.sendEmail({
                from: config.mail.from,
                to: customer.email,
                subject: config.mail.Subject,
                html: config.mail.registerMailBody
            })
            return res;
        }
        catch (error) {
            logger.error(`Error in registerCustomer method of CustomerService ${error}`);
            throw error;
        }
    }

    async findCustomerById(customerId) {
        logger.info("Started Execution for findCustomerById ==>")
        return await this.customerRepo.findCustomerById(customerId);
    }

    async resetPassword(passwordResetReq) {
        try {
            logger.info("Started Execution for resetPassword ==>")
            let customerDataFromDb;
            //get customer data from db
            if (passwordResetReq?.customerid) {
                customerDataFromDb = await this.customerRepo.findCustomerByIdToken(passwordResetReq.customerid);
                if (!customerDataFromDb?.id) {
                    throw new AppError(messages.errorMessages.usernotFound);
                }
                const isValidPass = await this.authService.comparePassword(passwordResetReq.password, customerDataFromDb.password);
                if (!isValidPass) {
                    throw new AppError(messages.errorMessages.oldPasswordIncorrect);
                }
            }
            else if (passwordResetReq?.token) {

                customerDataFromDb = await this.customerRepo.findCustomerToken({ token: passwordResetReq.token });
                if (!customerDataFromDb?.token) {
                    throw new AppError(messages.errorMessages.invalidToken);
                }
                if (moment(customerDataFromDb.expiresat).utc().format() < moment().utc().format()) {
                    throw new AppError(messages.errorMessages.tokenExpire);
                }
            }
            else {
                throw new AppError(messages.errorMessages.invalidToken);
            }
            // validate old password

            if (passwordResetReq.newPassword != passwordResetReq.confirmPassword) {
                throw new AppError(messages.errorMessages.passwordVerificationError);
            }
            const validatePasswordRegex = this.authService.checkPasswordForCustomer(passwordResetReq.newPassword)
            if (!validatePasswordRegex) {
                throw new AppError(messages.errorMessages.passwordFormatErrorForCustomer);
            }
            //Hash the updated password
            const hashedPassword = await this.authService.getHashedPassword(passwordResetReq.newPassword);
            return await this.customerRepo.update(passwordResetReq?.customerid ? customerDataFromDb?.id : customerDataFromDb?.customerid, { password: hashedPassword });
        }
        catch (error) {
            logger.error(`Error in resetPassword method of CustomerService ${error}`);
            throw error;
        }
    }

    async updateCustomerDetails(customerReq) {
        logger.info("Started Execution for updateCustomerDetails ==>")
        const { id, ...customer } = customerReq;
        await this.customerRepo.update(id, customer);
        return await this.customerRepo.findCustomerById(id);
    }

    async checkNearByLocationByLatLong(locationFilters) {
        logger.info('in service checkNearByLocationByLatLong');
        if (locationFilters.latitude && locationFilters.longitude && locationFilters.partnerId) {
            let partner = await this.customerRepo.checkNearByLocationByLatLong(locationFilters);
            return partner ? true : false;
        }
        else {
            throw new AppError(messages.errorMessages.requiredFields);
        }
    }


    async forgotPassword(body) {
        try {
            logger.info("Started Execution for forgotPassword ==>");
            const emailResponse = await this.customerRepo.findCustomerByEmail(body.email);
            if (emailResponse?.email) {
                const customerauth = {
                    customerid: emailResponse.id,
                    token: await this.authService.getLinkToken(),
                    tokentype: 'resetPwd',
                    expiresat: moment().utc().add(Number(config.linkexptime * 60), "minutes").format(),
                    createdat: moment().utc().format()
                }
                await this.customerRepo.saveCustomerToken(customerauth);
                let originURL = config.serverUrl + config.apiBaseUri + '/customer/resetApp';
                const deviceType = body.deviceType && body.deviceType.toLowerCase();
                const link = originURL + '/' + customerauth.token + '/' + deviceType;
                logger.info(`URL For Applications ${link}`);
                const emailObj={firstName:emailResponse.firstName,link:link}

                const mailer = new Mailer();
                const htmlMessage = await mailer.parseEmailTemplate(config.mail.resetPwdCust, emailObj);
                await mailer.sendEmail({
                    from: config.mail.from,
                    to: body.email,
                    subject: config.mail.forgotPwdSubject,
                    html: htmlMessage
                }, (error) => {
                    if (error)
                        throw error;

                });

                return messages.resetMailsent;

            }
            else {
                throw new AppError(messages.errorMessages.emailIncorrect);
            }
        }
        catch (error) {
            logger.error(`Error in forgotPassword method of CustomerService ${error}`);
            throw error;
        }
    }


}
