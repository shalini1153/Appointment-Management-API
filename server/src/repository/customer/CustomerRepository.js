import { Customer } from "../../models/customer/CustomerModel";
import { CustomerAuth } from "../../models/customer/CustomerAuthModel";
import { CustomerToken } from "../../models/customer/CustomerToken";
import { customer } from "../../constants/ErrorConstant";
import { Partner } from "../../models/partner/Partner";
import { Sequelize, Op } from "sequelize";
import config from "../../config/Index";
export class CustomerRepository {

    async findCustomerByEmail(emailId) {
        return await Customer.findOne({ where: { email: emailId } });
    }

    async findCustomerByPassword(password) {
        return await Customer.findOne({ where: { password: password } });
    }

    async findCustomerByIdAuth(customerId) {
        return await CustomerAuth.findOne({ where: { customer_id: customerId } });
    }

    async saveCustomerSession(authData) {
        return await CustomerAuth.create(authData);
    }

    async updateIsLoggedInByCustomerId(customerId) {
        return CustomerAuth.updateOne({ customerId, "isLoggedIn": true }, { $set: { isLoggedIn: false } });
    }

    async saveCustomer(customerObj) {
        return Customer.create(customerObj)
            .catch(Sequelize.UniqueConstraintError, () => {
                throw new Error(customer.uniqueEmail);
            }).catch((err) => {
                throw ({ message: err.message });
            });
    }

    async findCustomerById(customerId) {
        return await Customer.findOne({ where: { id: customerId }, attributes: { exclude: ["password"] } });
    }

    async findCustomerByIdWIthPassword(customerId) {
        return await Customer.findOne({ where: { id: customerId } });
    }

    async update(id, customer) {
        return await Customer.update(customer, { where: { id } });
    }

    async checkNearByLocationByLatLong({ longitude, latitude,partnerId }) {
        const partnerFilters = (config.mail.isDev == "true") ? {} : { is_active: true, id:partnerId};
        return Partner.findOne({
            attributes: [[Sequelize.literal("3959 * acos(cos(radians(" + latitude + ")) * cos(radians(latitude)) * cos(radians(" + longitude + ") - radians(longitude)) + sin(radians(" + latitude + ")) * sin(radians(latitude)))"), 'distance'], 'id','latitude', 'longitude'],
            where: partnerFilters,
            having: { 'distance': { [Op.lt]: config.radiusInMiles } }
        });
    }

    async fetchCustomerByToken(token) {
        return CustomerAuth.findOne({ where: { token } });
    }

    async updateExpireTime(token, end_time) {
        return CustomerAuth.update({ token }, { where: { end_time } });
    }

    async updateIsLoggedInByToken(token) {
        return CustomerAuth.update({ isLoggedIn: false }, { where: { token, "isLoggedIn": true } });
    }

    async saveCustomerToken(user) {
        return await CustomerToken.create(user);
    }
    async findCustomerToken(condition) {
        return await CustomerToken.findOne({ where: condition , order: [
            ['createdat', 'DESC'],
        ]});
    }
    async findCustomerByIdToken(customerId) {
        return await Customer.findOne({ where: { id: customerId }});
    }
}




