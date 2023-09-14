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
exports.FormularioController = void 0;
const espesificarFecha_1 = require("../utils/espesificarFecha");
const cuarto_paso_model_1 = require("../models/classes/formulario/cuarto.paso.model");
const fichaTecnica_model_1 = require("../models/classes/fichaTecnica.model");
const historial_fichas_model_1 = require("../models/classes/historial.fichas.model");
const objFichas = new historial_fichas_model_1.Fichas();
class FormularioController {
    static buscarFichaPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rutPaciente } = req.params;
                const dataFicha = yield objFichas.listarInformacionPaciente(rutPaciente);
                res.status(200).json(dataFicha);
            }
            catch (err) {
                res.status(400).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static crearFichaTecnica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fichas, paciente, habitos, antecedentes, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            const nivel = parseInt(req.query.nivel);
            const idUsuario = parseInt(req.params.idUsuario);
            let fechaIngreso;
            let estado = true;
            fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const antecedentesTipado = antecedentes;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = paciente;
            try {
                if (primerPasoTipado.involucrado.fechaNacimiento == "NaN/aN/aN") {
                    primerPasoTipado.involucrado.fechaNacimiento = null;
                }
                if (primerPasoTipado.acompanante.fechaNacimiento == "NaN/aN/aN") {
                    primerPasoTipado.acompanante.fechaNacimiento = null;
                }
                if (historiaGeneroTipada.inicioTransicioSexual == "NaN/aN/aN") {
                    historiaGeneroTipada.inicioTransicioSexual = null;
                }
                if (historiaGeneroTipada.tiempoLatencia == "NaN/aN/aN") {
                    historiaGeneroTipada.tiempoLatencia = null;
                }
                if (paciente.fechaNacimientoPa == "NaN/aN/aN") {
                    paciente.fechaNacimientoPa = null;
                }
                if (paciente.fechaNacimientoPa != undefined || paciente.fechaNacimientoPA != null) {
                    if (paciente.fechaNacimientoPa.length > 10) {
                        paciente.fechaNacimientoPa = paciente.fechaNacimientoPa.slice(0, 10);
                    }
                }
                const objCuarto = new cuarto_paso_model_1.FormularioCuartoPaso(antecedentesTipado, areaPsiquicaTipada, historialDrogas.usoDrogas, historialDrogas.detallesDrogas, habitos.dieta, historiaGeneroTipada, primerPasoTipado, fichaTipada, prendas.prenda);
                const verificacionFicha = yield fichaTecnica_model_1.Ficha.estatusFicha(paciente.rutPaciente);
                //update en caso de existir el paciente
                if (verificacionFicha && req.idTablas.idPaciente) {
                    yield objCuarto.actulizarPaciente(req.idTablas.idPaciente);
                    yield objCuarto.actualizarprimerPaso(req.idTablas.idInvolucrado, req.idTablas.idAcompanante);
                    yield objCuarto.actualizarSegundoPaso(req.idTablas.idGenero, req.idTablas.idPrenda);
                    yield objCuarto.actulizarTercerPaso(req.idTablas.idAreaPsiquica, req.idTablas.idDieta, req.idTablas.idDrogas);
                    yield objCuarto.actualizarCuartoPaso(req.idTablas.idAntecedente);
                    const objFichas = new fichaTecnica_model_1.Ficha(fechaIngreso, estado, nivel, fichas.apoyoEscolar, fichas.judicializacion, fichas.detallesApoyo, fichas.detallesJudicializacion);
                    const msj = yield objFichas.actulizarFicha(req.idTablas.idFicha);
                    return res.status(201).json(msj);
                }
                //Actualiza el paciente si ya está registrado
                const dataPaciente = yield objCuarto.consultarPaciente(fichaTipada.rutPaciente);
                if (dataPaciente) {
                    yield objCuarto.actulizarPaciente(req.idTablas.idPaciente);
                }
                const idPaciente = yield objCuarto.crearPaciente();
                const idPrimerPaso = yield objCuarto.guardarPrimerPaso();
                const idhistoriaGenero = yield objCuarto.crearSegundoPaso(idPaciente);
                const idTecerPaso = yield objCuarto.crearTercerPaso(idPaciente);
                const idCuartoPaso = yield objCuarto.crearCuartoPaso();
                const objFichas = new fichaTecnica_model_1.Ficha(fechaIngreso, estado, nivel, fichas.apoyoEscolar, fichas.judicializacion, fichas.detallesApoyo, fichas.detallesJudicializacion, idPaciente, idUsuario, idTecerPaso.idAreaPsiquica, idCuartoPaso, idPrimerPaso.idInvolucrado, idPrimerPaso.idAcompanante, idhistoriaGenero.idHgenero);
                const msj = yield objFichas.crearFichaTecnica();
                res.status(201).json(msj);
            }
            catch (err) {
                res.status(201).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static finalizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idFicha } = req.query;
            const objFicha = new fichaTecnica_model_1.Ficha();
            try {
                const resFinalizacion = yield objFicha.finalizarFicha(parseInt(idFicha));
                return res.status(201).json(resFinalizacion);
            }
            catch (err) {
                console.log();
                return res.status(400).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
    static GuardaryFinalizarFichaTecnica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fichas, paciente, habitos, antecedentes, involucrado, acompanante, areaPsiquica, historialDrogas, genero, prendas, } = req.body;
            const nivel = parseInt(req.query.nivel);
            const idUsuario = parseInt(req.params.idUsuario);
            const { idFicha } = req.query;
            let fechaIngreso;
            let estado = false;
            fechaIngreso = (0, espesificarFecha_1.fechaExacta)();
            const historiaGeneroTipada = genero;
            const areaPsiquicaTipada = areaPsiquica;
            const antecedentesTipado = antecedentes;
            const primerPasoTipado = {
                involucrado,
                acompanante,
            };
            const fichaTipada = paciente;
            try {
                if (primerPasoTipado.involucrado.fechaNacimiento == "NaN/aN/aN") {
                    primerPasoTipado.involucrado.fechaNacimiento = null;
                }
                if (primerPasoTipado.acompanante.fechaNacimiento == "NaN/aN/aN") {
                    primerPasoTipado.acompanante.fechaNacimiento = null;
                }
                if (historiaGeneroTipada.inicioTransicioSexual == "NaN/aN/aN") {
                    historiaGeneroTipada.inicioTransicioSexual = null;
                }
                if (historiaGeneroTipada.tiempoLatencia == "NaN/aN/aN") {
                    historiaGeneroTipada.tiempoLatencia = null;
                }
                if (paciente.fechaNacimientoPa == "NaN/aN/aN") {
                    paciente.fechaNacimientoPa = null;
                }
                if (paciente.fechaNacimientoPa != undefined || paciente.fichaNacimientoPa != null) {
                    if (paciente.fechaNacimientoPa.length > 10) {
                        paciente.fechaNacimientoPa = paciente.fechaNacimientoPa.slice(0, 10);
                    }
                }
                const pacienteTipado = {
                    rutPaciente: fichaTipada.rutPaciente,
                    nombrePaciente: fichaTipada.nombrePaciente,
                    apellidoPaternoPa: fichaTipada.apellidoPaternoPa,
                    apellidoMaternoPa: fichaTipada.apellidoMaternoPa,
                    nombreSocial: fichaTipada.nombreSocial,
                    domicilioPaciente: fichaTipada.domicilioPaciente,
                    fechaNacimientoPa: fichaTipada.fechaNacimientoPa,
                    pronombre: fichaTipada.pronombre,
                    telefonoPaciente: fichaTipada.telefonoPaciente,
                };
                const objCuarto = new cuarto_paso_model_1.FormularioCuartoPaso(antecedentesTipado, areaPsiquicaTipada, historialDrogas.usoDrogas, historialDrogas.detallesDrogas, habitos.dieta, historiaGeneroTipada, primerPasoTipado, pacienteTipado, prendas.prenda);
                const verificacionFicha = yield fichaTecnica_model_1.Ficha.estatusFicha(paciente.rutPaciente);
                //update en caso de existir el paciente
                if (verificacionFicha && req.idTablas.idPaciente) {
                    yield objCuarto.actulizarPaciente(req.idTablas.idPaciente);
                    yield objCuarto.actualizarprimerPaso(req.idTablas.idInvolucrado, req.idTablas.idAcompanante);
                    yield objCuarto.actualizarSegundoPaso(req.idTablas.idGenero, req.idTablas.idPrenda);
                    yield objCuarto.actulizarTercerPaso(req.idTablas.idAreaPsiquica, req.idTablas.idDieta, req.idTablas.idDrogas);
                    yield objCuarto.actualizarCuartoPaso(req.idTablas.idAntecedente);
                    const objFichas = new fichaTecnica_model_1.Ficha(fechaIngreso, estado, nivel, fichas.apoyoEscolar, fichas.judicializacion, fichas.detallesApoyo, fichas.detallesJudicializacion);
                    const msj = yield objFichas.actulizarFinalizarFicha(req.idTablas.idFicha);
                    // const msj = await objFichas.actulizarFicha(req.idTablas.idFicha);
                    // await objFichas.finalizarFicha(parseInt(idFicha as string));
                    return res.status(201).json(msj);
                }
                //Actualiza el paciente si ya está registrado
                const dataPaciente = yield objCuarto.consultarPaciente(fichaTipada.rutPaciente);
                if (dataPaciente) {
                    yield objCuarto.actulizarPaciente(req.idTablas.idPaciente);
                }
                const idPaciente = yield objCuarto.crearPaciente();
                const idPrimerPaso = yield objCuarto.guardarPrimerPaso();
                const idhistoriaGenero = yield objCuarto.crearSegundoPaso(idPaciente);
                const idTecerPaso = yield objCuarto.crearTercerPaso(idPaciente);
                const idCuartoPaso = yield objCuarto.crearCuartoPaso();
                const objFichas = new fichaTecnica_model_1.Ficha(fechaIngreso, estado, nivel, fichas.apoyoEscolar, fichas.judicializacion, fichas.detallesApoyo, fichas.detallesJudicializacion, idPaciente, idUsuario, idTecerPaso.idAreaPsiquica, idCuartoPaso, idPrimerPaso.idInvolucrado, idPrimerPaso.idAcompanante, idhistoriaGenero.idHgenero);
                const msj = yield objFichas.crearFinalizarFichaTecnica();
                // await objFichas.finalizarFicha(parseInt(idFicha as string));
                res.status(201).json(msj);
            }
            catch (err) {
                res.status(500).json({
                    err,
                    msj: "Error interno del servidor",
                });
            }
        });
    }
}
exports.FormularioController = FormularioController;
