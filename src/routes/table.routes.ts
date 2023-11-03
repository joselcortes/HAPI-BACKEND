import { TablaController } from "../controllers/tabla.controller";
import { Router } from "express";
import TokenMiddleware from "../middlewares/validaToken.middleware";

const router = Router();
const tokenMiddleware: TokenMiddleware = new TokenMiddleware();



router.get('/listar', TablaController.listarPaciente);
router.get('/listarAntiguo',TablaController.listarPacienteNombreAntiguo);


export default router;
