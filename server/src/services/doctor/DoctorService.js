import { HealthAPI } from "../../external/HealthAPI";
import { DoctorRepository } from "../../repository/doctor/DoctorRepository";
import config from "../../config/Index";
import qs from 'qs';
import axios from 'axios';

export class DoctorService {

    async addDoctorServ(doctor) {
        try {
            const doctorRepo = new DoctorRepository();
            console.log(`Started executing service addDoctorDetails with body ${JSON.stringify(doctor)}`);
            await doctorRepo.addDoctorDetails(doctor);
            return doctor;
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async deleteDoctorById(doctorId) {
        try {
            const doctorRepo = new DoctorRepository();
            console.log(`Started executing service deleteDoctorById with id ${doctorId}`);
            return await doctorRepo.deleteDoctorById(doctorId);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async updateDoctorServ(doctorId, doctor) {
        try {
            const doctorRepo = new DoctorRepository();
            console.log('Start executing service => updateDoctorServ');
            return await doctorRepo.updateDoctorDetails(doctorId, doctor);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async findDoctorByIdServ(doctorId) {
        try {
            const doctorRepo = new DoctorRepository();
            console.log('Start executing service => findDoctorByIdServ');
            return await doctorRepo.findDoctorById(doctorId);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async getAllDoctors() {
        try {
            const doctorRepo = new DoctorRepository();
            console.log('Start executing service => getAllDoctors');
            return await doctorRepo.findAllDoctors();
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async searchDoctor(searchString) {
        try {
            const { client_id, client_secret, token_url } = config.healthAPI;
            console.log('Start executing service => searchDoctor');
            const healthAPI = new HealthAPI();
            //Get Authorization Code
            const authorizeCode = await healthAPI.generateAuthorizationCode();
            const data = qs.stringify({client_id,client_secret,code: authorizeCode.code,grant_type: 'authorization_code'});
            const body = {
                method: 'post',
                url: token_url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
            //Get Access Token
            const token = await axios(body);
            console.log("Res uis", token.data);
            //Search data for doctors
            const searchReq = {
                method: 'get',
                url: `https://api.1up.health/fhir/dstu2/Practitioner?_public=true&name=${searchString}`,
                headers: { 
                  'Authorization': `Bearer ${token.data.access_token}'`
                }
              };
            axios(searchReq)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              return response.data
            })
            .catch(function (error) {
              console.log(error);
            });
            return true;
        }
        catch (e) {
            throw new Error(e);
        }
    }

}

