"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const validaToken_middleware_1 = __importDefault(require("../middlewares/validaToken.middleware"));
const router = (0, express_1.Router)();
const loginController = new login_controller_1.default();
const tokenMiddleware = new validaToken_middleware_1.default();
router.post('/verificar-usuario', loginController.login);
router.get('/verificar-token', [tokenMiddleware.verificarToken], loginController.verificarToken);
router.post('/pedir-usuario', loginController.buscarUsuario);
exports.default = router;
