import { Doctor } from "../../models/doctor/DoctorModel";
import mongoose from 'mongoose';

export class DoctorRepository {

    async deleteDoctorById(doctorId) {
        await Doctor.findByIdAndDelete(mongoose.Types.ObjectId(doctorId));
        return true;
    }

    async addDoctorDetails(doctor) {
        const doctorDetails = new Doctor(doctor);
        return doctorDetails.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!");
        });
    }

    async findDoctorById(doctorId) {
        console.log("findDoctorById");
        const id = mongoose.Types.ObjectId(doctorId.toString());
        return await Doctor.findById(id);
    }

    async findAllDoctors() {
        console.log("findAllDoctors");
        return await Doctor.find();
    }

    async updateDoctorDetails(doctorId, doctor) {
        try {
            console.log('Start executing service => updateDoctorDetails');
            return await Doctor.findOneAndUpdate({ _id: mongoose.Types.ObjectId(doctorId) }, doctor);
        }
        catch (e) {
            console.log("error is",e)
            throw new Error(e);
        }
    }
}




