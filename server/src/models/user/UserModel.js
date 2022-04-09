import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
	
	firstName: {
		type: String,
		required: true,
	},
    lastName: {
		type: String,
		required: true,
	},
    emailId: {
		type: String,
		required: true,
	},
    password: {
		type: String,
		required: true,
	}
   
});

export const User = mongoose.model('users', new mongoose.Schema(UsersSchema));

