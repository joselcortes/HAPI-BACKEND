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
Object.defineProperty(exports, "__esModule", { value: true });
const login_models_1 = require("../models/classes/login.models");
const usurio_model_1 = require("../models/classes/usurio.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// let objLogin = new Login();
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
                        token: token
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
        this.verificarToken = (req, respon) => __awaiter(this, void 0, void 0, function* () {
            const token = req.header('Authorization');
            // const secret = process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';
            if (token === '' || token === undefined || token === null) {
                return respon.status(200).json({
                    verificar: 'false',
                    msg: 'token mal formado'
                });
            }
            const partesToken = token.split('.');
            const payloadCodificado = partesToken[1];
            const payloadCrudo = Buffer.from(payloadCodificado, 'base64').toString('ascii');
            const payloadJSON = JSON.parse(payloadCrudo);
            const usuario = new usurio_model_1.Usuario();
            try {
                const usuarioRes = yield usuario.buscarUsuario(payloadJSON.id);
                jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
                return respon.status(200).json({
                    verificar: true,
                    usuario: usuarioRes,
                });
            }
            catch (error) {
                return respon.status(500).json({
                    verificar: false,
                    msg: 'Token malformado.',
                });
            }
        });
        this.buscarUsuario = (req, respon) => __awaiter(this, void 0, void 0, function* () {
            const token = req.header('Authorization');
            // const secret = process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';
            if (token === '' || token === undefined || token === null) {
                return respon.status(200).json({
                    verificar: 'false',
                    msg: 'token mal formado'
                });
            }
            const partesToken = token.split('.');
            const payloadCodificado = partesToken[1];
            const payloadCrudo = Buffer.from(payloadCodificado, 'base64').toString('ascii');
            const payloadJSON = JSON.parse(payloadCrudo);
            console.log(payloadJSON.id);
            const usuario = new usurio_model_1.Usuario();
            try {
                const usuarioRes = yield usuario.buscarUsuario(payloadJSON.id);
                jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
                return respon.status(200).json({
                    verificar: true,
                    usuario: usuarioRes,
                });
            }
            catch (error) {
                return respon.status(500).json({
                    verificar: false,
                    msg: 'Token malformado.',
                });
            }
        });
    }
}
exports.default = LoginController;
