import { TablaController } from "../controllers/tabla.controller";
import { Router } from "express";
import { validarRut } from "../middlewares/validarRutConsulta.middleware";
const router = Router();


router.get('/listar', TablaController.listarPaciente);
router.get('/listarAntiguo',TablaController.listarPacienteNombreAntiguo);


export default router;
