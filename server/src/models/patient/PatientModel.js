import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    symptoms: {
        type: String,
        required: true,
    },
    appointment_history: {
        type: String,
    }

});


export const Patient = mongoose.model('patient', new mongoose.Schema(PatientSchema));
