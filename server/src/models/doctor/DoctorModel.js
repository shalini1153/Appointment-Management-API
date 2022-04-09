import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    }

});


export const Doctor = mongoose.model('doctor', new mongoose.Schema(DoctorSchema));
