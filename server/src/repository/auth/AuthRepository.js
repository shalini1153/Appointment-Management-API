import { User } from "../../models/user/User";
import { UserAuth } from "../../models/user/UserAuth";
import Sequelize, { Op } from "sequelize";
import { auth } from "../../constants/ErrorConstant";
import { UserToken } from "../../models/user/UserToken";
import { Partner } from "../../models/partner/Partner";
import { UserRole } from "../../models/user-roles/UserRole";
import { PartnerRole } from "../../models/user-roles/PartnerRole";
import { PartnerRoleEntitlement } from "../../models/user-roles/PartnerRoleEntitlement";
import { CheqEntitlement } from "../../models/user-roles/CheqEntitlement";
import logger from "../../core/Logger";
import { executeTransaction } from '../../core/utility/Transaction';
import { roleEntitlements, userStatus } from "../../constants/Shared";

export class AuthRepository {

    async findUser(condition) {
        return await User.findOne({ where: condition });
    }

    async findUserByIdAuth(userId) {
        return await UserAuth.findOne({ where: { user_id: userId } });
    }

    async saveUserSession(authData) {
        return await UserAuth.create(authData);
    }

    async updateIsLoggedInByUserId(userId) {
        return UserAuth.update({ userId, "isLoggedIn": true }, { where: { isLoggedIn: false } });
    }
    async updateIsLoggedInByToken(token) {
        return UserAuth.update({ isLoggedIn: false }, { where: { token, "isLoggedIn": true } });
    }
    async saveUser(user) {
        return User.create(user).catch(Sequelize.UniqueConstraintError, () => {
            throw new Error(auth.uniqueEmail);
        }).catch((err) => {
            throw ({ message: err.message });
        });
    }

    async fetchUserByToken(token) {
        return UserAuth.findOne({ where: { token } }, {}, {});
    }

    async updateExpireTime(token, end_time) {
        return UserAuth.update({ token }, { where: { end_time } });
    }

    async updateUserPwd(updatepwd, Id) {
        return User.update({ password: updatepwd }, { where: { id: Id } });
    }
    async deleteUserByToken(token, userid) {

        const data = await UserAuth.destroy({ where: { token: token, user_id: userid } }) == 0 ? "Logout Failed " : "User Logout Successfull";
        return data;

    }


    async updateUser(user) {
        const userData = (user.userPin)?{ email: user.email,firstName:user.firstName,lastName:user.lastName , userPin:user.userPin }:{ email: user.email,firstName:user.firstName,lastName:user.lastName };
        return User.update(userData, { where: { id: user.Id } }).catch(Sequelize.UniqueConstraintError, () => {
            throw new Error(auth.uniqueEmail);
        }).catch((err) => {
            throw ({ message: err.message });
        });

    }

    async saveUserAuth(user) {
        return await UserToken.create(user);
    }
    async findUserToken(condition) {
        return await UserToken.findOne({ where: condition , order: [
            ['createdat', 'DESC'],
        ]});
    }

    async updateUserPartner(user,title) {
        const transaction = await executeTransaction();
        try {
            const userResponse = await User.findOne({ attributes: { exclude : ["password","partnerId"]}
            , where: { id: user.userId }  , transaction: transaction });
            const partnerData ={
            email : userResponse.email,            
            partnerName : userResponse.partnerName,
            firstName : userResponse.firstName,
            lastName : userResponse.lastName
            }
            const partnerResponse = await Partner.create(partnerData, { transaction: transaction });
            user.partnerId = partnerResponse.id;
            await User.update(user, { where: { id: user.userId } , transaction: transaction });
            const partnerRoleData ={
            partnerId : partnerResponse.id,
            title
            }
            const partnerRoleResponse = await PartnerRole.create(partnerRoleData, { transaction: transaction });
            user.roleId = partnerRoleResponse.id;
            await UserRole.create(user, { transaction: transaction });
            const entitlementData = await CheqEntitlement.findAll({attributes: ['id'] , transaction: transaction });
            let PartnerRoleEntitlementData =[];
            entitlementData?.map(item => {
                PartnerRoleEntitlementData.push({ "partnerRoleId": partnerRoleResponse.id, "entitlementId": item.id })
                });
            await PartnerRoleEntitlement.bulkCreate(PartnerRoleEntitlementData, { transaction: transaction });
            transaction.commit();
            return userResponse;
        }
        catch (error) {
            logger.error(`Error In: activateUser method in repository is ${error}`);
            if (error instanceof Sequelize.UniqueConstraintError) {
                transaction.rollback();
                throw new Error(auth.uniqueEmail);
            } else {
                transaction.rollback();
                throw ({ message: error.message });
            }
        }
    }

    async updateUserToken(token,condition) {
        return UserToken.update(token, {where:condition});
    }

    async findUserByEmail(email,status,userId) {
        return (userId)?User.findOne({ where: {email , status: { [Sequelize.Op.or]: status }, id: { [Sequelize.Op.not]: userId }} }): User.findOne({ where: {email , status: { [Sequelize.Op.or]: status }} });
    }

    async isValidPin(userPin, partnerId) {
        return User.findAll({
            include:  [
                {
                    model: UserRole,
                    as: 'userRoles',
                    required: true,
                    include: [
                        {
                            model: PartnerRole,
                            as: "role",
                            required: true,
                            include: [
                                {
                                    model: PartnerRoleEntitlement,
                                    as: "roleEntitlements",
                                    required: true,
                                    where: {
                                        entitlementId: roleEntitlements.refundOrder
                                    }
                                }
                            ]                            
                        }
                    ]
                }
            ],
            where: {
                partnerId, 
                userPin: {
                    [Op.ne]: null
                },
                status: userStatus.indexOf("Active")
            }
        }).then(async (users) => {
            let _users = [];
            for (let user of users) {
                    if (await user.validUserPin(userPin)) {
                        _users.push(user);
                    }               
            }
            return _users;
        });
    }

    async findUserTokenByUserID(userid , token , expiresat) {
        return UserToken.findAll({ where: { userid, token: { [Sequelize.Op.not]: token  } , expiresat:{
            [Op.gt]: expiresat } } , order: [
            ['createdat', 'DESC'],
        ]});
    }

}
