import express from "express";
import PatientController from "../../controllers/patient/PatientController";

export class PatientRoutes {
        static configureRoutes() {
                const controller = new PatientController();
                const router = express.Router();
                router.get("/:id", controller.findPatientById);
                router.post("/addPatient", controller.addPatientDetails);
                router.post("/updatePatient/:id",  controller.updatePatientDetails);
                router.delete("/deletePatient/:id",  controller.deletePatientById);
                return router;
        }
}
