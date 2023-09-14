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
exports.CentrosController = void 0;
const express_1 = __importDefault(require("express"));
const fs = require('fs').promises;
const centros_model_1 = require("../models/classes/centros.model");
const uploadImagen_middleware_1 = require("../helpers/uploadImagen.middleware");
const app = (0, express_1.default)();
let centro_salud = new centros_model_1.Centros();
class CentrosController {
    static crearCentro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { nombre_centro_salud, comuna_centro_salud, logo, } = req.body;
                const { archivo } = req.files;
                let ext = archivo.name.slice(-4);
                let nombre = nombre_centro_salud.replace(/\s+/g, '_');
                let nombreArchivo = nombre + ext;
                let nuevoLogo = `dist/assets/img/${nombreArchivo}`;
                centro_salud.setNombreCentroSalud(nombre_centro_salud);
                centro_salud.setComunaCentroSalud(comuna_centro_salud);
                centro_salud.setLogo(nuevoLogo);
                const resp = yield centro_salud.guardarCentro();
                if (resp === 'ok') {
                    (0, uploadImagen_middleware_1.crearImagen)(archivo, nombreArchivo);
                }
                res.status(200).json(resp);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msj: false,
                    error
                });
            }
        });
    }
    static listarCentroRut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idCentro } = req.params;
                const resp = yield centro_salud.mostrarCentrosRut(idCentro);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Error en la conexion',
                    error
                });
            }
        });
    }
    static mostrarCentro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield centro_salud.mostrarCentros();
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Error en la conexión',
                    error
                });
            }
        });
    }
    static elimianrCentro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const rutaCentros = req.body;
                const { ruta } = req.body;
                const { idCentro } = req.params;
                const eliminar = yield centro_salud.eliminarCentro(parseInt(idCentro));
                if (eliminar.serverStatus === 2) {
                    fs.unlink(ruta)
                        .then(() => {
                        console.log('File removed');
                    }).catch((err) => {
                        console.error('Something wrong happened removing the file', err);
                    });
                }
                res.status(200).json(eliminar);
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Error al conectar',
                    error
                });
            }
        });
    }
    static actualizarCentro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let archivos;
                let ext;
                let nombre;
                let nombreArchivo;
                let nuevoLogo;
                let { nombre_centro_salud, comuna_centro_salud, logo } = req.body;
                if (req.files) {
                    const { archivo } = req.files;
                    archivos = archivo;
                    ext = archivo.name.slice(-4);
                    nombre = nombre_centro_salud.replace(/\s+/g, '_');
                    nombreArchivo = nombre + ext;
                    nuevoLogo = `dist/assets/img/${nombreArchivo}`;
                    console.log(archivo);
                }
                const { idCentro } = req.params;
                centro_salud.setNombreCentroSalud(nombre_centro_salud);
                centro_salud.setComunaCentroSalud(comuna_centro_salud);
                centro_salud.setLogo(nuevoLogo);
                let resp;
                //TODO: cambiar el nombre de la imagen
                if (req.files) {
                    resp = yield centro_salud.actualizarCentro(parseInt(idCentro));
                    if (resp === 'ok') {
                        fs.unlink(logo)
                            .then(() => {
                            console.log('File removed');
                        }).catch((err) => {
                            console.error('Something wrong happened removing the file', err);
                        });
                        (0, uploadImagen_middleware_1.crearImagen)(archivos, nombreArchivo);
                    }
                }
                else {
                    resp = yield centro_salud.actualizarCentroSinImg(parseInt(idCentro));
                }
                res.status(200).json(resp);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msj: false,
                    error
                });
            }
        });
    }
}
exports.CentrosController = CentrosController;
