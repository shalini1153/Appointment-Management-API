import express from "express";
import DoctorController from "../../controllers/doctor/DoctorController";
import { authorization } from "../../core/middleware/Authorization";
export class DoctorRoutes {
        static configureRoutes() {
                const controller = new DoctorController();
                const router = express.Router();
                router.get("/search", controller.searchDoctor);
                router.get("/", authorization(), controller.getAllDoctors);
                router.post("/addDoctor", authorization(), controller.addDoctorDetails);
                router.post("/updateDoctor/:id", authorization(), controller.updateDoctorDetails);
                router.delete("/deleteDoctor/:id", authorization(), controller.deleteDoctorById);
                router.get("/:id", authorization(), controller.findDoctorById);
                return router;
        }
}
