"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComunasController = void 0;
const comunas_model_1 = require("../models/classes/comunas.model");
let comunas = new comunas_model_1.Comunas();
class ComunasController {
    static listarComunas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respo = yield comunas.listarComuna();
                return res.json(respo);
            }
            catch (error) {
                return res.status(500).json({
                    error,
                    msg: 'Error en el servidor'
                });
            }
        });
    }
    static listarComunasId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idComuna } = req.params;
                const repo = yield comunas.listarComunaId(idComuna);
                return res.json(repo);
            }
            catch (error) {
            }
        });
    }
}
exports.ComunasController = ComunasController;
