import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { PatientService } from "../../services/patient/PatientService";

export default class PatientController extends BaseController {

    async addPatientDetails(req, res, next) {
        try {
            logger.info("Started Exceution for addPatientDetails Controller");
            const responseObj = new ReponseMessage();
            const patientService = new PatientService();
            const data = await patientService.addPatientServ(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async deletePatientById(req, res, next) {
        try {
            logger.info("Started Exceution for deletePatient Controller");
            const responseObj = new ReponseMessage();
            const patientService = new PatientService();
            const data = await patientService.deletePatientServ(req.params.id);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async updatePatientDetails(req, res, next) {
        try {
            logger.info("Started Exceution for updatePatientDetails Controller");
            const responseObj = new ReponseMessage();
            const patientService = new PatientService();
            const data = await patientService.updatePatientServ(req.params.id,req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }


    async findPatientById(req, res, next) {
        try {
            logger.info("In Controller of findPatientById")
            const patientService = new PatientService();
            const responseObj = new ReponseMessage();
            const data = await patientService.findPatientByIdServ(req.params.id);
            logger.info(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async getAllPatients(req, res, next) {
        try {
            logger.info("In Controller of findPatientById")
            const patientService = new PatientService();
            const responseObj = new ReponseMessage();
            const data = await patientService.getAllPatients();
            logger.info(data);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

}
