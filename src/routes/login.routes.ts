import { Request, Response ,Router } from "express";
import LoginController from "../controllers/login.controller";
import TokenMiddleware from "../middlewares/validaToken.middleware";
const router = Router();
const loginController: LoginController = new LoginController();
const tokenMiddleware: TokenMiddleware = new TokenMiddleware();

router.post('/verificar-usuario', loginController.login);
router.get('/verificar-token', [tokenMiddleware.verificarToken], loginController.verificarToken);
router.post('/renovar-token',loginController.renovarToken);
// router.get('/obtener-tiempo-token', [tokenMiddleware.verificarToken], )
// router.post('/pedir-usuario', loginController.buscarUsuario);


export default router;
