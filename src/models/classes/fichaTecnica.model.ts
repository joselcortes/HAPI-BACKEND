import { mysqlConnexion } from "../..";
import { consultasGenerales } from "../../consultas/consultasGenerales";
import { fechaExacta } from "../../utils/espesificarFecha";

export class Ficha{
  fechaIngreso?: string;
  estado?: boolean;
  nivelFormulario?: number;
  apoyoEscolar?: boolean;
  judicializacion?: boolean;
  detallesApoyo?: string;
  detallesJudicializacion?: string;
  fkPaciente?: number;
  fkUsuario?: number;
  fkAreaPsiquica?: number;
  fkHistoria?: number;
  fkeEncargada?: number;
  fkAcompanante?: number;
  fkIdHistoria?: number;

 
  constructor(
    fechaIngreso?: string,
    estado?: boolean,
    nivelFormulario?: number,
    apoyoEscolar?: boolean,
    judicializacion?: boolean,
    detallesApoyo?: string,
    detallesJudicializacion?: string,
    fkPaciente?: number,
    fkUsuario?: number,
    fkAreaPsiquica?: number,
    fkHistoria?: number,
    fkeEncargada?: number,
    fkAcompanante?: number,
    fkIdHistoria?: number,
  ) {
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




  async finalizarFicha(idFicha:number){

    const fecha = fechaExacta();
    const estado = 0;

    const queryComprobacion = `SELECT estado_ficha FROM fichas_tecnicas WHERE id_ficha_tecnica = ?`;
    
    const query:string = `
    UPDATE fichas_tecnicas SET estado_ficha = ?, fecha_finalizacion= ?
    WHERE id_ficha_tecnica = ?
    `;
    try{

      const status = await consultasGenerales(queryComprobacion, [idFicha]);  

      if(status[0].estado_ficha == 0) return "La ficha ya ha sido finalizada";

      await consultasGenerales(query, 
        [ 
        estado,
        fecha,
        idFicha
        ]);
      return "Finalizado con exito";

    }catch(err:any){

      throw new Error(err);

    }

  }






  async crearFichaTecnica() {
    const query: string = `INSERT INTO fichas_tecnicas(
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
      await consultasGenerales(query, [
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
    } catch (err: any) {
      throw new Error(err);
    }
  }

  static async estatusFicha(rutPaciente: string) {
    const query: string = `select estado_ficha,
      id_ficha_tecnica,
      nivelFormulario, id_paciente
      from fichas_tecnicas AS ft
      left join PACIENTES AS pa ON ft.fk_paciente = pa.id_paciente
      WHERE rut_paciente  = ?  AND estado_ficha = 1`;
    try {
      const estadoFicha = await consultasGenerales(query, [rutPaciente]);
      if (!estadoFicha[0]) {
        return false;
      } 


      return true;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async actulizarFicha(idFicha: number) {
    const query: string = `
      UPDATE fichas_tecnicas SET 
      fecha_ingreso = ?,
      nivelFormulario = ?, 
      apoyo_escolar = ?, 
      judicializacion = ?,
      detalles_apoyo_es = ?,
      detalles_judicializacion=?
      WHERE id_ficha_tecnica  = ?`;

    try { 

    
      if(!idFicha) return 0;

      await consultasGenerales(query, [
        this.fechaIngreso,
        this.nivelFormulario, 
        this.apoyoEscolar, 
        this.judicializacion, 
        this.detallesApoyo, 
        this.detallesJudicializacion, 
        idFicha
      ]);

      return 'La ficha ha sido actulizada'

    } catch (err: any) {
      throw new Error(err);
    }
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
  async actulizarFinalizarFicha(idFicha: number) {
    const fecha = fechaExacta();
    const query: string = `
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

    
      if(!idFicha) return 0;

      await consultasGenerales(query, [
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

      return 'La ficha ha sido actulizada'

    } catch (err: any) {
      throw new Error(err);
    }
  }

  async crearFinalizarFichaTecnica() {
    const fecha = fechaExacta();
    const query: string = `INSERT INTO fichas_tecnicas(
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
      await consultasGenerales(query, [
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
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
