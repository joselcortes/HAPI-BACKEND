import { Request, Response, Router } from "express";
const router = Router();
import { UsuarioController } from "../controllers/usuario.controller";
import { vericarDataUsuario } from "../middlewares/usuario.middleware";

router.post('/guardar', vericarDataUsuario ,UsuarioController.crearUsuario);
router.get('/listar', UsuarioController.listaUsuarios);
router.post('/actualizar/:idUsuario', UsuarioController.actualizarUsuario);
router.post('/eliminar/:idUsuario', UsuarioController.eliminarUsuario);
router.get('/listarPorRut/:rutProfesional', UsuarioController.listarUsuarioPorRut);


export default router;
