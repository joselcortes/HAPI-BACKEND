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
const login_models_1 = require("../models/classes/login.models");
let objLogin = new login_models_1.Login();
class LoginController {
    constructor() {
        this.login = (req, response) => {
            try {
                const { email, password } = req.body;
                const usuarioLogin = login_models_1.Login.verificarCuentaLogin(email, password);
                usuarioLogin.then((res) => {
                    const token = login_models_1.Login.generarToken(res);
                    return response.status(200).json({
                        login: true,
                        usuario: res,
                        // token: token
                    });
                }).catch(err => {
                    console.log(err);
                    return response.status(200).json({
                        login: false,
                        error: err
                    });
                });
            }
            catch (error) {
                console.log(error);
            }
        };
    }
    static verificarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                objLogin.setEmail(email);
                objLogin.setPassword(password);
                const respuesta = yield objLogin.verificarCuenta();
                // if(respuesta.length <= 0){ return false}
                // res.status(200).json(respuesta)
            }
            catch (error) {
            }
        });
    }
}
exports.default = LoginController;
