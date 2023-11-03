import { Router } from "express";

import LoginController from '../controllers/login.controller';

const loginController: LoginController = new LoginController;
const router = Router();

router.get('/verificar-tiempo-token', loginController.verificarTiempoToken);

export default router;
