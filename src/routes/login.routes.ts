import { Request, Response ,Router } from "express";
import LoginController from "../controllers/login.controller";
// import { LoginController } from "../controllers/login.controller";
const router = Router();
const loginController: LoginController = new LoginController();

router.post('/verificar-usuario', loginController.login);
router.get('/listarComunasId/:idComuna', );

export default router;
