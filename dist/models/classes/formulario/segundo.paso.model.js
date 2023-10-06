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
exports.FormularioSegundoPaso = void 0;
const primer_paso_model_1 = require("./primer.paso.model");
const __1 = require("../../..");
const consultasGenerales_1 = require("../../../consultas/consultasGenerales");
class FormularioSegundoPaso extends primer_paso_model_1.FormularioPrimerPaso {
    constructor(genero, primerPaso, pacientes, prendas) {
        var _a, _b;
        super(primerPaso, pacientes);
        (this.identidadGenero = genero.identidadGenero || null),
            (this.orientacionSexual = genero.orientacionSexual || null),
            (this.autoPercepcion = genero.autoPercepcion || null);
        (this.inicioTransicioSexual = ((_a = genero.inicioTransicioSexual) === null || _a === void 0 ? void 0 : _a.slice(0, 10)) || null),
            (this.tiempoLatencia = ((_b = genero.tiempoLatencia) === null || _b === void 0 ? void 0 : _b.slice(0, 10)) || null),
            (this.apoyoFamiliar = genero.apoyoFamiliar),
            (this.usoPrenda = genero.usoPrenda),
            (this.presenciaDisforia = genero.presenciaDisforia),
            (this.detallesDiforia = genero.detallesDiforia || null);
        // (this.nombrePacienteHG = genero.nombrePacienteHG);
        // (this.apellidoPaternoPaHG = genero.apellidoPaternoPaHG);
        // (this.apellidoMaternoPaHG = genero.apellidoMaternoPaHG);
        this.tipoPrenda = prendas || null;
    }
    crearSegundoPaso(idPaciente) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO HISTORIAS_IDENTIDADES_GENEROS VALUES (NULL, ?,?,?,?,?,?,?,?,?,?,?,?,?)";
            const query1 = "INSERT INTO SELECCION_PRENDA VALUES (null, ?,?)";
            try {
                const setHeaderHgenero = yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.identidadGenero,
                    this.orientacionSexual,
                    this.autoPercepcion,
                    this.inicioTransicioSexual,
                    this.tiempoLatencia,
                    this.apoyoFamiliar,
                    this.usoPrenda,
                    this.presenciaDisforia,
                    this.detallesDiforia,
                    idPaciente,
                    this.nombrePaciente,
                    this.apellidoPaternoPa,
                    this.apellidoMaternoPa,
                    // this.nombrePacienteHG,
                    // this.apellidoPaternoPaHG,
                    // this.apellidoMaternoPaHG,
                ]);
                const idHgenero = setHeaderHgenero.insertId;
                for (let i = 0; i < 5; i++) {
                    if (i > this.tipoPrenda.length - 1) {
                        this.tipoPrenda[i] = null;
                    }
                }
                (_a = this.tipoPrenda) === null || _a === void 0 ? void 0 : _a.map((data) => __awaiter(this, void 0, void 0, function* () {
                    console.log(data);
                    yield (0, consultasGenerales_1.consultasGenerales)(query1, [idHgenero, data]);
                }));
                return { idHgenero };
            }
            catch (err) {
                console.log(err);
                throw {
                    status: "failure",
                    msj: "Error al crear el segundo paso",
                };
            }
        });
    }
    actualizarSegundoPaso(idHistoria, idPrenda) {
        return __awaiter(this, void 0, void 0, function* () {
            let cont = 0;
            const objConexion = yield __1.mysqlConnexion;
            const queryHistoria = `UPDATE HISTORIAS_IDENTIDADES_GENEROS
    SET identidad_genero  = ?, orientacion_sexual= ?, autopercepcion = ? , inicio_transicion_sexual = ?,tiempo_latencia  = ?,apoyo_nucleo_familiar= ?, uso_prenda  = ?, presencia_disforia = ?,
    detalles_diforia = ?, nombre_paciente_historia = ?, apellido_paterno_paciente_historia = ?, apellido_materno_paciente_historia = ? WHERE id_historia_identidad_genero = ?`;
            const queryPrenda = `UPDATE SELECCION_PRENDA SET fk_prenda_disconformidad  =  ? WHERE id_prenda_n_n = ?`;
            try {
                if (!idHistoria)
                    return 0;
                yield (objConexion === null || objConexion === void 0 ? void 0 : objConexion.query(queryHistoria, [
                    this.identidadGenero,
                    this.orientacionSexual,
                    this.autoPercepcion,
                    this.inicioTransicioSexual,
                    this.tiempoLatencia,
                    this.apoyoFamiliar,
                    this.usoPrenda,
                    this.presenciaDisforia,
                    this.detallesDiforia,
                    this.nombrePaciente,
                    this.apellidoPaternoPa,
                    this.apellidoMaternoPa,
                    idHistoria,
                    // this.nombrePacienteHG,
                    // this.apellidoPaternoPaHG,
                    // this.apellidoMaternoPaHG,
                ]));
                console.log(idPrenda);
                idPrenda.map((data) => {
                    (0, consultasGenerales_1.consultasGenerales)(queryPrenda, [
                        this.tipoPrenda[cont],
                        data
                    ]);
                    cont += 1;
                });
                return "Los datos han sido actualizados: segundo paso";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.FormularioSegundoPaso = FormularioSegundoPaso;
