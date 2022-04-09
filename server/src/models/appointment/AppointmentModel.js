import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({

    time: {
        type: String,
        required: true,
    },
    doctorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
    patientId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},

});

export default mongoose.model('appointment', AppointmentSchema);
