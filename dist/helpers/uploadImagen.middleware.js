"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearImagen = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
function crearImagen(archivo, nombre) {
    let sampleFile;
    let uploadPath;
    sampleFile = archivo;
    uploadPath = `dist/assets/img/${nombre}`;
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            console.log('no se subio el archivo');
        }
    });
}
exports.crearImagen = crearImagen;
