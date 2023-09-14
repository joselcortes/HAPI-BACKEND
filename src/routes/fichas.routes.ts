import { Router } from "express";
const router = Router();
import { FichasController } from "../controllers/fichas.controllers";
import { verificarId } from "../middlewares/historial.ficha.middleware";
import { validarRut } from "../middlewares/validarRutConsulta.middleware";


router.get('/activa/:rutPaciente', verificarId,FichasController.fichaActiva);

router.get('/inactivas/:rutPaciente', verificarId,FichasController.fichaInactiva);
router.get('/listar/:idFicha', FichasController.listarFichaId);
router.get('/dataPanel/:rutPaciente', FichasController.dataPanel);
router.get('/dataPacienteAtencion/:run', FichasController.pacienteAtencion);

export default router;
