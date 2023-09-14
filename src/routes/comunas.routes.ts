import { Router } from "express";
import { ComunasController } from "../controllers/comunas.controller";
const router = Router();

router.get('/listarComunas', ComunasController.listarComunas);
router.get('/listarComunasId/:idComuna', ComunasController.listarComunasId);

export default router;
