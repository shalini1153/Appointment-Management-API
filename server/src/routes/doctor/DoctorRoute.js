import express from "express";
import DoctorController from "../../controllers/doctor/DoctorController";

export class DoctorRoutes {
        static configureRoutes() {
                const controller = new DoctorController();
                const router = express.Router();
                router.get("/:id", controller.findDoctorById);
                router.post("/addDoctor", controller.addDoctorDetails);
                router.post("/updateDoctor",  controller.updateDoctorDetails);
                router.delete("/deleteDoctor/:id",  controller.deleteDoctorById);
                return router;
        }
}
