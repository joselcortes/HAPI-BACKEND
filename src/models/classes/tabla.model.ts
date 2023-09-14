import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Tabla {
  async listarPacientes() {
    try {

        const query: string = ` 
        SELECT estado_ficha, id_paciente, id_ficha_tecnica, fecha_ingreso, rut_paciente, nombre_paciente,
        nombre_social, apellido_paterno_paciente, apellido_materno_paciente, nombre_centro_salud
        FROM fichas_tecnicas AS ft
        JOIN PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
        JOIN PROFESIONALES_USUARIOS_SALUD AS ucs ON ft.fk_profesional_usuario = id_profesional_salud
        JOIN CENTROS_SALUD AS cs ON fk_centro_salud = cs.id_centro_salud
        ORDER BY CASE WHEN estado_ficha = 'inactivo' THEN 1 ELSE 0 END, fecha_ingreso DESC
         `;

      const dataPaciente = await consultasGenerales(query);

  

      return dataPaciente;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

  async listarPacientesNombreAntiguo() {
    try {

        const query: string = ` 
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

      const dataPaciente = await consultasGenerales(query);

  

      return dataPaciente;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

}





