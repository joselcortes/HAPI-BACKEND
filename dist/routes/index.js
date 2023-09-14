"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endPoints = void 0;
const express_1 = require("express");
const formulario_routes_1 = __importDefault(require("./formulario.routes"));
const table_routes_1 = __importDefault(require("./table.routes"));
const main_routes_1 = __importDefault(require("./main.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const sesion_routes_1 = __importDefault(require("./sesion.routes"));
const apiCesfam_routes_1 = __importDefault(require("./apiCesfam.routes"));
const fichas_routes_1 = __importDefault(require("./fichas.routes"));
const centro_routes_1 = __importDefault(require("./centro.routes"));
const comunas_routes_1 = __importDefault(require("./comunas.routes"));
const login_routes_1 = __importDefault(require("./login.routes"));
const router = (0, express_1.Router)();
function endPoints(app) {
    app.use('/api/v1', router);
    router.use('/form', formulario_routes_1.default);
    router.use('/tabla', table_routes_1.default);
    router.use('/fichas', fichas_routes_1.default);
    router.use('/main', main_routes_1.default);
    router.use('/usuario', user_routes_1.default);
    router.use('/centro', centro_routes_1.default);
    router.use('/sesion', sesion_routes_1.default);
    router.use('/fonasa', apiCesfam_routes_1.default);
    router.use('/comuna', comunas_routes_1.default);
    router.use('/login', login_routes_1.default);
}
exports.endPoints = endPoints;
