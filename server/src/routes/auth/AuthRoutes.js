import express from "express";
import AuthController from "../../controllers/auth/AuthController";
import { authorization } from "../../core/middleware/Authorization";
import { tokenAuth } from "../../core/middleware/TokenAuthorization";
export class AuthRoutes {
        static configureRoutes() {
                const controller = new AuthController();
                const router = express.Router();
                router.get("/:id", controller.findUserById);
                router.post("/login", controller.login);
                router.post("/registerUser", controller.registerUser);
                router.post("/forgotPwd", controller.forgotPwd);
                router.get("/logout/:id",authorization(), controller.logOut);
                router.post("/registerNewUser",tokenAuth(), controller.registerNewUser);
                router.post("/resetPassword", controller.resetPassword);
                router.post("/updateUserDetails",  authorization(),controller.updateUserDetails);
                router.patch("/users/activate_user",controller.activateUser);
                router.patch("/users/resend_activation_link",controller.resendActivationLink);
                return router;
        }
}