"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = require("express");
const centro_controller_1 = require("../controllers/centro.controller");
const validaToken_middleware_1 = __importDefault(require("../middlewares/validaToken.middleware"));
const tokenMiddleware = new validaToken_middleware_1.default();
const router = (0, express_1.Router)();
router.post('/guardarCentro', centro_controller_1.CentrosController.crearCentro);
//Verificar archivo
router.get('/listarCentro', centro_controller_1.CentrosController.mostrarCentro);
router.get('/listarCentroRut/:idCentro', centro_controller_1.CentrosController.listarCentroRut);
router.post('/actualizarCentro/:idCentro', centro_controller_1.CentrosController.actualizarCentro);
router.post('/eliminarCentro/:idCentro', centro_controller_1.CentrosController.eliminarCentro);
router.get('/obtener-archivo/', (req, res) => {
    const ruta = req.query.ruta;
    fs_1.default.readFile(ruta, (err, data) => {
        const ruta = req.query.ruta;
        return res.download(ruta);
    });
});
exports.default = router;
