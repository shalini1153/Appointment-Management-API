import express from "express";
import PatientController from "../../controllers/patient/PatientController";

export class PatientRoutes {
        static configureRoutes() {
                const controller = new PatientController();
                const router = express.Router();
                router.get("/:id", controller.findPatientById);
                router.get("/", controller.getAllPatients);
                router.post("/addPatient", controller.addPatientDetails);
                router.put("/updatePatient/:id",  controller.updatePatientDetails);
                router.delete("/deletePatient/:id",  controller.deletePatientById);
                return router;
        }
}
