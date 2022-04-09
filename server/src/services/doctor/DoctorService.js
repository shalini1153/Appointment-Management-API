import logger from "../../core/Logger";
import { doctorRepository } from "../../repository/doctor/DoctorRepository";

export class DoctorService {

    constructor() {
        DoctorService.doctorRepo = new doctorRepository();
    }

    async addDoctorServ(doctor) {
        logger.info(`Started executing service addDoctorDetails with body ${JSON.stringify(doctor)}`);
        await this.doctorRepo.addDoctorDetails(doctor);
        return doctor;
    }

    async deleteDoctorById(doctorId) {
        logger.info(`Started executing service deleteDoctorById with id ${doctorId}`);
        await this.doctorRepo.deleteDoctorById(doctorId);
    }

    async updateDoctorServ(doctor) {
        try {
            logger.info('Start executing service => updateDoctorServ');
            return await this.doctorRepo.updateDoctorDetails(doctor);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async findDoctorByIdServ(doctorId) {
        try {
            logger.info('Start executing service => findDoctorByIdServ');
            return await this.doctorRepo.findDoctorById(doctorId);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    

}

