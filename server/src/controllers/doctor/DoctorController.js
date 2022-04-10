import BaseController from "../../core/utility/BaseController";
import ReponseMessage from "../../core/utility/ReponseMessage";
import logger from "../../core/Logger";
import { DoctorService } from "../../services/doctor/DoctorService";

export default class DoctorController extends BaseController {

    async addDoctorDetails(req, res, next) {
        try {
            logger.info("Started Exceution for addDoctorDetails Controller");
            const responseObj = new ReponseMessage();
            const doctorService = new DoctorService();
            const data = await doctorService.addDoctorServ(req.body);
            if (data) {
                responseObj.data = data;
                responseObj.httpStatusCode = 201;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async deleteDoctorById(req, res, next) {
        try {
            logger.info("Started Exceution for deleteDoctorById Controller");
            const responseObj = new ReponseMessage();
            const doctorService = new DoctorService();
            const data = await doctorService.deleteDoctorById(req.body);
            if (data) {
                responseObj.data = data;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async updateDoctorDetails(req, res, next) {
        try {
            logger.info("Started Exceution for updateDoctorDetails Controller");
            const responseObj = new ReponseMessage();
            const doctorService = new DoctorService();
            const data = await doctorService.updateDoctorServ(req.param.id,req.body);
            if (data) {
                responseObj.data = data;
                responseObj.httpStatusCode = 201;
                super.createResponse.success(res, responseObj);
            }
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }


    async findDoctorById(req, res, next) {
        try {
            logger.info("In Controller of findDoctorById")
            const doctorService = new DoctorService();
            const responseObj = new ReponseMessage();
            const data = await doctorService.findDoctorByIdServ(req.params.id);
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

    async getAllDoctors(req, res, next) {
        try {
            logger.info("In Controller of getAllDoctors")
            const doctorService = new DoctorService();
            const responseObj = new ReponseMessage();
            const data = await doctorService.getAllDoctors();
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

    async searchDoctor(req, res, next) {
        try {
            logger.info("In Controller of searchDoctor")
            const doctorService = new DoctorService();
            const responseObj = new ReponseMessage();
            const data = await doctorService.searchDoctor(req.query.searchString);
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
