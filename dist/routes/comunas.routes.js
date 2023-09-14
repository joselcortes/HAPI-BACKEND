"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comunas_controller_1 = require("../controllers/comunas.controller");
const router = (0, express_1.Router)();
router.get('/listarComunas', comunas_controller_1.ComunasController.listarComunas);
router.get('/listarComunasId/:idComuna', comunas_controller_1.ComunasController.listarComunasId);
exports.default = router;
