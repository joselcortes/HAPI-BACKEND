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
exports.Ficha = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
const espesificarFecha_1 = require("../../utils/espesificarFecha");
class Ficha {
    constructor(fechaIngreso, estado, nivelFormulario, apoyoEscolar, judicializacion, detallesApoyo, detallesJudicializacion, fkPaciente, fkUsuario, fkAreaPsiquica, fkHistoria, fkeEncargada, fkAcompanante, fkIdHistoria) {
        this.fechaIngreso = fechaIngreso;
        this.estado = estado;
        this.nivelFormulario = nivelFormulario;
        this.apoyoEscolar = apoyoEscolar;
        this.judicializacion = judicializacion;
        this.detallesApoyo = detallesApoyo;
        this.detallesJudicializacion = detallesJudicializacion;
        this.fkPaciente = fkPaciente;
        this.fkUsuario = fkUsuario;
        this.fkAreaPsiquica = fkAreaPsiquica;
        this.fkHistoria = fkHistoria;
        this.fkeEncargada = fkeEncargada;
        this.fkAcompanante = fkAcompanante;
        this.fkIdHistoria = fkIdHistoria;
    }
    finalizarFicha(idFicha) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = (0, espesificarFecha_1.fechaExacta)();
            const estado = 0;
            const queryComprobacion = `SELECT estado_ficha FROM fichas_tecnicas WHERE id_ficha_tecnica = ?`;
            const query = `
    UPDATE fichas_tecnicas SET estado_ficha = ?, fecha_finalizacion= ?
    WHERE id_ficha_tecnica = ?
    `;
            try {
                const status = yield (0, consultasGenerales_1.consultasGenerales)(queryComprobacion, [idFicha]);
                if (status[0].estado_ficha == 0)
                    return "La ficha ya ha sido finalizada";
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    estado,
                    fecha,
                    idFicha
                ]);
                return "Finalizado con exito";
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    crearFichaTecnica() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO fichas_tecnicas(
        fecha_ingreso,
        estado_ficha,
        nivelFormulario, 
        apoyo_escolar,
        judicializacion,
        detalles_apoyo_es,
        detalles_judicializacion,
        fk_paciente,
        fk_profesional_usuario,
        fk_area_psiquica,
        fk_historia_clinica,
        fk_persona_involucrada_encargada,
        fk_persona_involucrada_acompanante,
        fk_historias_identidad_genero)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            try {
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.fechaIngreso,
                    this.estado,
                    this.nivelFormulario,
                    this.apoyoEscolar,
                    this.judicializacion,
                    this.detallesApoyo,
                    this.detallesJudicializacion,
                    this.fkPaciente,
                    this.fkUsuario,
                    this.fkAreaPsiquica,
                    this.fkHistoria,
                    this.fkeEncargada,
                    this.fkAcompanante,
                    this.fkIdHistoria,
                ]);
                return `Los datos han sido creado correctamente`;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static estatusFicha(rutPaciente) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select estado_ficha,
      id_ficha_tecnica,
      nivelFormulario, id_paciente
      from fichas_tecnicas AS ft
      left join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
      WHERE rut_paciente  = ?  AND estado_ficha = 1`;
            try {
                const estadoFicha = yield (0, consultasGenerales_1.consultasGenerales)(query, [rutPaciente]);
                if (!estadoFicha[0]) {
                    return false;
                }
                return true;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    actulizarFicha(idFicha) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      UPDATE fichas_tecnicas SET 
      fecha_ingreso = ?,
      nivelFormulario = ?, 
      apoyo_escolar = ?, 
      judicializacion = ?,
      detalles_apoyo_es = ?,
      detalles_judicializacion=?
      WHERE id_ficha_tecnica  = ?`;
            try {
                if (!idFicha)
                    return 0;
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.fechaIngreso,
                    this.nivelFormulario,
                    this.apoyoEscolar,
                    this.judicializacion,
                    this.detallesApoyo,
                    this.detallesJudicializacion,
                    idFicha
                ]);
                return 'La ficha ha sido actulizada';
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // const fecha = fechaExacta();
    // const estado = 0;
    // const queryComprobacion = `SELECT estado_ficha FROM fichas_tecnicas WHERE id_ficha_tecnica = ?`;
    // const query:string = `
    // UPDATE fichas_tecnicas SET estado_ficha = ?, fecha_finalizacion= ?
    // WHERE id_ficha_tecnica = ?
    // `;
    // try{
    //   const status = await consultasGenerales(queryComprobacion, [idFicha]);  
    //   if(status[0].estado_ficha == 0) return "La ficha ya ha sido finalizada";
    //   await consultasGenerales(query, 
    //     [ 
    //     estado,
    //     fecha,
    //     idFicha
    //     ]);
    //=================================================AGREGADO========================================
    actulizarFinalizarFicha(idFicha) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = (0, espesificarFecha_1.fechaExacta)();
            const query = `
      UPDATE fichas_tecnicas SET 
      fecha_ingreso = ?,
      fecha_finalizacion = ?,
      estado_ficha=?,
      nivelFormulario = ?, 
      apoyo_escolar = ?, 
      judicializacion = ?,
      detalles_apoyo_es = ?,
      detalles_judicializacion=?
      WHERE id_ficha_tecnica  = ?`;
            try {
                if (!idFicha)
                    return 0;
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.fechaIngreso,
                    fecha,
                    this.estado,
                    this.nivelFormulario,
                    this.apoyoEscolar,
                    this.judicializacion,
                    this.detallesApoyo,
                    this.detallesJudicializacion,
                    idFicha
                ]);
                return 'La ficha ha sido actulizada';
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    crearFinalizarFichaTecnica() {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = (0, espesificarFecha_1.fechaExacta)();
            const query = `INSERT INTO fichas_tecnicas(
        fecha_ingreso,
        fecha_finalizacion,
        estado_ficha,
        nivelFormulario, 
        apoyo_escolar,
        judicializacion,
        detalles_apoyo_es,
        detalles_judicializacion,
        fk_paciente,
        fk_profesional_usuario,
        fk_area_psiquica,
        fk_historia_clinica,
        fk_persona_involucrada_encargada,
        fk_persona_involucrada_acompanante,
        fk_historias_identidad_genero)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            try {
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.fechaIngreso,
                    fecha,
                    this.estado,
                    this.nivelFormulario,
                    this.apoyoEscolar,
                    this.judicializacion,
                    this.detallesApoyo,
                    this.detallesJudicializacion,
                    this.fkPaciente,
                    this.fkUsuario,
                    this.fkAreaPsiquica,
                    this.fkHistoria,
                    this.fkeEncargada,
                    this.fkAcompanante,
                    this.fkIdHistoria,
                ]);
                return `Los datos han sido creado correctamente`;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.Ficha = Ficha;
