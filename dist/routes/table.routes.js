"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tabla_controller_1 = require("../controllers/tabla.controller");
const express_1 = require("express");
const validaToken_middleware_1 = __importDefault(require("../middlewares/validaToken.middleware"));
const router = (0, express_1.Router)();
const tokenMiddleware = new validaToken_middleware_1.default();
router.get('/listar', tabla_controller_1.TablaController.listarPaciente);
router.get('/listarAntiguo', tabla_controller_1.TablaController.listarPacienteNombreAntiguo);
exports.default = router;
