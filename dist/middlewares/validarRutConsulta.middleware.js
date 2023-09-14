"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarRut = void 0;
function validarRut(req, res, next) {
    const { run } = req.params;
    if (run === '' || run === null)
        return;
    next();
}
exports.validarRut = validarRut;
