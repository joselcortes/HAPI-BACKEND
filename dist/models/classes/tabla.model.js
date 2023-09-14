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
exports.Tabla = void 0;
const consultasGenerales_1 = require("../../consultas/consultasGenerales");
class Tabla {
    listarPacientes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = ` 
        SELECT estado_ficha, id_paciente, id_ficha_tecnica, fecha_ingreso, rut_paciente, nombre_paciente,
        nombre_social, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud
        FROM fichas_tecnicas AS ft
        JOIN PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
        JOIN PROFESIONALES_USUARIOS_SALUD AS ucs ON ft.fk_profesional_usuario = id_profesional_salud
        JOIN CENTROS_SALUD AS cs ON fk_centro_salud = cs.id_centro_salud
        ORDER BY CASE WHEN estado_ficha = 'inactivo' THEN 1 ELSE 0 END, fecha_ingreso DESC
         `;
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(query);
                return dataPaciente;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    listarPacientesNombreAntiguo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = ` 
        WITH RankedResults AS (
          SELECT 
              estado_ficha, id_paciente, id_ficha_tecnica, nombre_paciente,
              apellido_paterno_paciente, apellido_materno_paciente,
              fecha_ingreso, rut_paciente, hig.nombre_paciente_historia,
              nombre_social, hig.apellido_paterno_paciente_historia, hig.apellido_materno_paciente_historia, nombre_centro_salud,
              ROW_NUMBER() OVER (PARTITION BY rut_paciente ORDER BY fecha_ingreso DESC) AS rn
          FROM fichas_tecnicas AS ft
          JOIN PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
          JOIN historias_identidades_generos as hig ON ft.fk_historias_identidad_genero = hig.id_historia_identidad_genero  
          JOIN PROFESIONALES_USUARIOS_SALUD AS ucs ON ft.fk_profesional_usuario = id_profesional_salud
          JOIN CENTROS_SALUD AS cs ON fk_centro_salud = cs.id_centro_salud
      )
      SELECT 
          estado_ficha, id_paciente, id_ficha_tecnica, nombre_paciente,
          apellido_paterno_paciente, apellido_materno_paciente,
          fecha_ingreso, rut_paciente, nombre_paciente_historia,
          nombre_social, apellido_paterno_paciente_historia, apellido_materno_paciente_historia, nombre_centro_salud
      FROM RankedResults
      WHERE rn = 1
      ORDER BY CASE WHEN estado_ficha = 0 THEN 1 ELSE 0 END, fecha_ingreso DESC;
        
         `;
                const dataPaciente = yield (0, consultasGenerales_1.consultasGenerales)(query);
                return dataPaciente;
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
}
exports.Tabla = Tabla;
