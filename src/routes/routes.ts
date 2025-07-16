import {Router} from "express";
import UserController from "../controllers/user.controller";

const router = Router();
const userController = UserController()


router.get("/user/me", userController.me);


export default router;