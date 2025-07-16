import {Router} from "express";
import UserController from "../controllers/user.controller";

const router = Router();
const userController = UserController()


router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/user/me", userController.me);
router.get("/user/me", userController.me);


export default router;