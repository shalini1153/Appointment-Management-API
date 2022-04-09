import logger from "../../core/Logger";
import { PatientRepository } from "../../repository/patient/patientRepository";

export class PatientService {

    async addPatientServ(patient) {
        const patientRepo = new PatientRepository();
        logger.info(`Started executing service addPatientDetails with body ${JSON.stringify(patient)}`);
        await patientRepo.addPatientDetails(patient);
        return patient;
    }

    async deletePatientServ(patientId) {
        const patientRepo = new PatientRepository();
        console.log(`Started executing service deletePatientById with id ${patientId}`);
        return await patientRepo.deletePatientById(patientId);
    }

    async updatePatientServ(patientId, patient) {
        try {
            const patientRepo = new PatientRepository();
            console.log('Start executing service => updatePatientDetails');
            return await patientRepo.updatePatientDetails(patientId,patient);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async findPatientByIdServ(patientId) {
        try {
            const patientRepo = new PatientRepository();
            logger.info('Start executing service => findPatientByIdServ');
            return await patientRepo.findPatientById(patientId);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async getAllPatients() {
        try {
            const patientRepo = new PatientRepository();
            logger.info('Start executing service => findPatientByIdServ');
            return await patientRepo.findAllPatients();
        }
        catch (e) {
            throw new Error(e);
        }
    }


}

