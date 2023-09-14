import { Router } from "express";
import { MainController } from "../controllers/main.controller";
const router = Router();

router.get('/estadisticas', MainController.estadisticas);
router.get('/estadisticasTabla', MainController.estadisticasTabla);

export default router;
