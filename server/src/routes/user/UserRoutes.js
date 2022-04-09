import express from "express";
import UserController from "../../controllers/user/UserController";

export class UserRoutes {
        static configureRoutes() {
                const controller = new UserController();
                const router = express.Router();
                router.get("/:id", controller.findUserById);
                router.post("/login", controller.login);
                router.post("/register", controller.registerUser);
                router.get("/logout/:id", controller.logout);
                return router;
        }
}