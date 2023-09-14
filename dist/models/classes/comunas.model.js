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
exports.Comunas = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Comunas {
    constructor(id_comuna, nombre_comuna) {
        this.id_comuna = id_comuna;
        this.nombre_comuna = nombre_comuna;
    }
    listarComuna() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'select * from comunas';
                const res = yield (0, consultasGenerales_1.consultasGenerales)(query);
                return res;
            }
            catch (error) {
                return error;
            }
        });
    }
    listarComunaId(idComuna) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'select nombre_comuna from comunas where id_comuna = ?';
                const respuesta = yield (0, consultasGenerales_1.consultasGenerales)(query, [parseInt(idComuna)]);
                return respuesta;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.Comunas = Comunas;
