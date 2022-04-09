import express from "express";
import { UserRoutes } from "./user/UserRoutes";
import { PatientRoutes } from "./patient/PatientRoutes";
import { DoctorRoutes } from "./doctor/DoctorRoute";


export class RouteBinder {
    static bindRoutes() {
        const router = express.Router();
        // @** attach route guard i.e access restriction based on module level.
        router.use("/user", UserRoutes.configureRoutes());
        router.use("/patient", PatientRoutes.configureRoutes());
        router.use("/doctor", DoctorRoutes.configureRoutes());
        return router;
    }
}
