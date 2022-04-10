import express from "express";
import PatientController from "../../controllers/patient/PatientController";
import { authorization } from "../../core/middleware/Authorization";

export class PatientRoutes {
        static configureRoutes() {
                const controller = new PatientController();
                const router = express.Router();
                router.get("/:id", authorization(), controller.findPatientById);
                router.get("/", controller.getAllPatients);
                router.post("/addPatient", authorization(), controller.addPatientDetails);
                router.put("/updatePatient/:id", authorization(), controller.updatePatientDetails);
                router.delete("/deletePatient/:id", authorization(), controller.deletePatientById);
                return router;
        }
}
