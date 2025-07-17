import {Router} from "express";
import UserController from "../controllers/user.controller";
import TransactionController from "../controllers/transaction.controller";
import AuthService from "../services/auth/auth.service";

const router = Router();
const userController = UserController();
const transactionController = TransactionController();


router.post("/api/v1/login", userController.login);
router.post("/api/v1/register", userController.register);

router.get('/transaction', AuthService.verifyToken, transactionController.getTransaction);
router.post('/transaction/process', AuthService.verifyToken, transactionController.createOrUpdate);
// router.get("/user/me", userController.me);


export default router;