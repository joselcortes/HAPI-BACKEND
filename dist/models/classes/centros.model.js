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
exports.Centros = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Centros {
    constructor(nombre_centro, comuna_centro, logo) {
        this.nombre_centro_salud = nombre_centro;
        this.comuna_centro_salud = comuna_centro;
        this.logo = logo;
    }
    guardarCentro() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'insert into centros_salud values (null, ?, ?, ?)';
                yield (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.nombre_centro_salud,
                    this.comuna_centro_salud,
                    this.logo
                ]);
                return 'ok';
            }
            catch (error) {
                throw 'Error al crear el centro';
            }
        });
    }
    actualizarCentro(idCentro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
                update centros_salud set
                nombre_centro_salud = ?,
                id_comuna_fk = ?,
                logo = ?
                where id_centro_salud = ?
            `;
                (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.nombre_centro_salud,
                    this.comuna_centro_salud,
                    this.logo,
                    idCentro
                ]);
                return 'ok';
            }
            catch (error) {
                throw 'Error al actualizar el centro';
            }
        });
    }
    actualizarCentroSinImg(idCentro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(idCentro);
                const query = `
                update centros_salud set
                nombre_centro_salud = ?,
                id_comuna_fk = ?
                where id_centro_salud = ?
            `;
                (0, consultasGenerales_1.consultasGenerales)(query, [
                    this.nombre_centro_salud,
                    this.comuna_centro_salud,
                    idCentro
                ]);
                return 'ok';
            }
            catch (error) {
                throw 'Error al actualizar el centro';
            }
        });
    }
    mostrarCentros() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'select id_centro_salud, c.nombre_comuna  ,nombre_centro_salud,logo  from centros_salud cs left join comunas c on cs.id_comuna_fk = c.id_comuna ';
                const mostrarCentros = yield (0, consultasGenerales_1.consultasGenerales)(query);
                return mostrarCentros;
            }
            catch (error) {
                return error;
            }
        });
    }
    mostrarCentrosRut(idCentro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM centros_salud where id_centro_salud = ?';
                const mostrarCentros = yield (0, consultasGenerales_1.consultasGenerales)(query, [idCentro]);
                return mostrarCentros;
            }
            catch (error) {
                return error;
            }
        });
    }
    eliminarCentro(idCentro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'DELETE FROM centros_salud WHERE id_centro_salud=?';
                const eliminarCentro = yield (0, consultasGenerales_1.consultasGenerales)(query, [idCentro]);
                return eliminarCentro;
            }
            catch (error) {
                return error;
            }
        });
    }
    setNombreCentroSalud(nombre) {
        this.nombre_centro_salud = nombre;
    }
    setComunaCentroSalud(comuna) {
        this.comuna_centro_salud = comuna;
    }
    setLogo(logo) {
        this.logo = logo;
    }
}
exports.Centros = Centros;
