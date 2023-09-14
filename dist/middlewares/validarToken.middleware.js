"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
function verificarToken(req, res, next) {
    const header = req.headers;
    if (header.authorization === 'Bearer null') {
        return res.status(401).json({
            ok: false,
            err: "debe haber un token"
        });
    }
    next();
}
exports.verificarToken = verificarToken;
