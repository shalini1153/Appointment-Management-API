import { Patient } from "../../models/patient/PatientModel";
import mongoose from 'mongoose';

export class PatientRepository {

    async deletePatientById(patientId) {
        return await Patient.findByIdAndRemove(mongoose.Types.ObjectId(patientId));
    }

    async addPatientDetails(patient) {
        const patientDetails = new Patient(patient);
        return patientDetails.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!");
        });
    }

    async findPatientById(patientId) {
        console.log("findPatientById");
        const id = mongoose.Types.ObjectId(patientId.toString());
        return await Patient.findById(id);
    }

    async updatePatientDetails(patientId, patient) {
        try {
            console.log('Start executing service => updatePatientDetails');
            return await Patient.findOneAndUpdate({ _id: mongoose.Types.ObjectId(patientId) }, patient);
        }
        catch (e) {
            throw new Error(e);
        }
    }
}




