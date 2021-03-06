import { User } from "../../models/user/UserModel";
import { UserSession } from "../../models/user/UserSessionModel";
import mongoose from 'mongoose';

export class UserRepository {

    async findCustomerByEmail(emailId) {
        const user = await User.findOne({ "emailId": emailId });
        return user;
    }

    async findCustomerByPassword(password) {
        return await User.findOne({ where: { password: password } });
    }

    async saveUser(user) {
        const userDetails = new User(user);
        return await userDetails.save();
    }

    async findUserById(userId) {
        return await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
    }

    async saveCustomerSession(session) {
        const sessionDetails = new UserSession(session);
        return await sessionDetails.save();
    }

    async fetchUserByToken(token) {
        return UserSession.findOne({ token }, {}, {});
    }

    async updateExpireTime(token, end_time) {
        console.log('Start executing service => updateExpireTime');
        return await UserSession.findOneAndUpdate({ token }, { end_time });
    }

    async updateIsLoggedInByToken(token) {
        return UserSession.findOneAndUpdate({ isLoggedIn: false }, { token, "isLoggedIn": true });
    }
}




