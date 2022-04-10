import { UserRepository } from "../../repository/user/UserRepository";
import logger from "../../core/Logger";
import bcrypt from "bcryptjs";
import AppError from "../../core/utility/AppError";
import * as messages from "../../constants/MessageConstant";
import TokenService from "../../core/utility/TokenService";
import config from "../../config/Index";
import moment from "moment";

export class UserService {

    async login(user) {
        try {
            const userRepo = new UserRepository();
            const tokenService = new TokenService(config.token.privateKey, config.token.options);
            console.log("Request body is",config.token.privateKey);
            const emailResponse = await userRepo.findCustomerByEmail(user.emailId);
            console.log("Email Response is",emailResponse);
            if (emailResponse?.emailId) {
                const isValidPass = await this.comparePassword(user.password, emailResponse.password);
                if (!isValidPass) {
                    throw new AppError(messages.errorMessages.passwordIncorrect);
                }
                else {
                    console.log("Password Valid");
                    const token = tokenService.sign({},config.token.privateKey,config.token.options);
                    const startTime = moment().utc().format();
                    const endTime = moment().utc().add(config.logoutExpTime, "minutes").format();
                    const usertokendata = {
                        token,
                        userId: emailResponse.id,
                        startTime,
                        endTime,
                        isLoggedIn: true
                    };
                    await userRepo.saveCustomerSession(usertokendata);
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
            else{
                throw new Error("Invalid Username or Password!")
            }
        }
        catch (error) {
            console.log(`Error in login method of UserService ${error}`);
            throw error;
        }
    }

    async registerUser(user) {
        try {
            const userRepo = new UserRepository();
            logger.info("Started Execution for registerUser Service method==>")
            let { password } = user;
            const validatePasswordRegex = this.checkPasswordFormat(password)
            if (!validatePasswordRegex) {
                throw new AppError(messages.errorMessages.passwordFormatErrorForCustomer);
            }
            user.password = await this.getHashedPassword(password);
            const res = await userRepo.saveUser(user);
            return res;
        }
        catch (error) {
            logger.error(`Error in registerUser method of UserService ${error}`);
            throw error;
        }
    }

    async findUserById(userId) {
        const userRepo = new UserRepository();
        return await userRepo.findUserById(userId);
    }


    async logout(token, userid) {
        try {
            logger.info("Started Execution for logOut ==>");
            return await this.userRepo.deleteUserByToken(token, userid);
        } catch (error) {
            logger.error(`Error in logOut method of AuthService ${error}`);
            throw error;
        }
    }

    checkPasswordFormat(str) {
        const re = /^.{8,}$/;
        return re.test(str);
    }

    //Hash Based authentication
    async getHashedPassword(password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    async comparePassword(password, hashedPass) {
        const isValidPass = await bcrypt.compare(password, hashedPass);
        return isValidPass;
    }

    async verifyUserToken(token) {
        const userRepo = new UserRepository();
        const tokenData = await this.fetchUserByToken(token);
        console.log(`tokenData is ${tokenData}`);
        console.log(`tokenData is ${tokenData.endTime}`);
        if (tokenData && tokenData.endTime) {
            const timedifference = moment(tokenData.endTime).utc().diff(moment().utc().format(), "minutes");
            console.log(`Time difference is ${timedifference}`);
            if (timedifference > 0 && tokenData.isLoggedIn) {
                //valid token
                const refreshToken = tokenData.token;
                await this.RefreshUserToken(refreshToken);
                return tokenData._id;
            } else {
                if (tokenData.isLoggedIn) {
                    await userRepo.updateIsLoggedInByToken(
                        tokenData.token
                    );
                }
                return false;
            }
        } else {
            return false;
        }
    }

    async fetchUserByToken(token) {
        const userRepo = new UserRepository();
        return userRepo.fetchUserByToken(token);
    }

    async RefreshUserToken(refreshToken) {
        const userRepo = new UserRepository();
        const endTime = moment().utc().add(config.logoutExpTime, "minutes").format();
        const res = await userRepo.updateExpireTime(refreshToken, endTime);
        console.log("Res is",res);
        return res;
    }


}
