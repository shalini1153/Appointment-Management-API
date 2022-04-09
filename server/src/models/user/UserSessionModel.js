import mongoose from 'mongoose';

const UserSessionSchema = new mongoose.Schema({
	
	token: {
		type: String,
		required: true,
	},
    userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
    startTime: {
		type: Date,
		required: true,
	},
    endTime: {
		type: Date,
		required: true,
	},
    isLoggedIn: {
		type: Boolean
	}
   
});

export const UserSession = mongoose.model('user_session', new mongoose.Schema(UserSessionSchema));

