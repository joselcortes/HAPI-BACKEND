"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenMiddleware {
    constructor() {
        this.verificarToken = (request, response, next) => {
            const token = request.header('Authorization');
            if (token === undefined || token === '') {
                return response.status(200).json({
                    verificar: false,
                    msg: 'No existe token.',
                });
            }
            try {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
                next();
            }
            catch (error) {
                console.log('malisimo');
                return response.status(200).json({
                    verificar: false,
                    msg: 'El token está malformado',
                });
            }
        };
    }
}
exports.default = TokenMiddleware;
