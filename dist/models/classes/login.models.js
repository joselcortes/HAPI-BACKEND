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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Login {
    constructor(email, password) {
        this.email = email,
            this.password = password;
    }
    verificarCuenta() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `select profesionales_usuarios_salud.*,
            cs.nombre_centro_salud as nombre_centro,
            cs.logo as ruta from profesionales_usuarios_salud
            inner join centros_salud as cs on profesionales_usuarios_salud.fk_centro_salud = cs.id_centro_salud
            where profesionales_usuarios_salud.nombre_usuario = ?`;
                const res = yield (0, consultasGenerales_1.consultasGenerales)(sql, [this.email]);
                if (res.length <= 0)
                    return res;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
}
_a = Login;
Login.verificarCuentaLogin = (usuario, password) => {
    const sql = `select profesionales_usuarios_salud.*,
        cs.nombre_centro_salud as nombre_centro,
        cs.logo as ruta from profesionales_usuarios_salud
        inner join centros_salud as cs on profesionales_usuarios_salud.fk_centro_salud = cs.id_centro_salud
        where profesionales_usuarios_salud.nombre_usuario = ?`;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const respuesta = yield (0, consultasGenerales_1.consultasGenerales)(sql, [usuario]);
        if (respuesta.length <= 0) {
            reject("Usuario o contraseña incorretos");
            return;
        }
        if (!bcryptjs_1.default.compareSync(password, respuesta[0].contrasena)) {
            reject('Usuario o contraseña incorrectos');
            return;
        }
        resolve(respuesta);
        return;
    }));
};
Login.generarToken = (usuario) => {
    const id = usuario[0].id_profesional_salud;
    const us = usuario[0].nombre_usuario;
    const rol = usuario[0].roles;
    const prof = usuario[0].cargo_profesional_salud;
    const payload = { id, us, rol, prof };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT, {
        expiresIn: '1h'
    });
};
exports.Login = Login;
