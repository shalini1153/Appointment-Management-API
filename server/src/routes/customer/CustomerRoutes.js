import express from "express";
import CustomerController from "../../controllers/customer/CustomerController";
import { authorizationApp } from "../../core/middleware/AppAuthorization";

export class CustomerRoutes {
        static configureRoutes() {
                const controller = new CustomerController();
                const router = express.Router();
                router.get("/resetApp/:token/:deviceType", controller.resetApp);
                router.get("/:id", authorizationApp(), controller.findCustomerById);
                router.post("/login", controller.login);
                router.post("/registerCustomer", controller.registerCustomer);
                router.post("/update", authorizationApp(), controller.updateCustomerDetails);
                router.post("/checkNearByLocation", authorizationApp(), controller.checkNearByLocation);
                router.post("/resetPassword",  controller.resetPassword);
                router.post("/forgotPassword",  controller.forgotPassword);
                return router;
        }
}
