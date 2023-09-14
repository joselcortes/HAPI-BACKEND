import { OkPacket } from "mysql2";
import { mysqlConnexion } from "../../..";
import {
  AreaPsiquica,
  HistoriaGenero,
  Pacientes,
  PrimerPaso,
  AntecedentesClinicos,
} from "../../interfaces/tipos.entidades";
import { FormularioTercerPaso } from "./tercer.paso.model";
import { consultasGenerales } from "../../../consultas/consultasGenerales";

export class FormularioCuartoPaso
  extends FormularioTercerPaso
  implements AntecedentesClinicos
{
  antecedentePerinatales: string | null;
  antecedenteHospitalizaciones: string | null;
  antecedentesQuirurgicos: string | null;
  antecedentesAlergicos: string | null;
  antecedentesPni: string | null;
  funcionalidadGenital: string | null;
  antecedentesFamilia: string | null;

  constructor(
    antecedentes: AntecedentesClinicos,
    areaPsiquica: AreaPsiquica,
    usoDroga: boolean,
    detallesDroga: string | null,
    dieta: string,
    genero: HistoriaGenero,
    primerPaso: PrimerPaso,
    pacientes: Pacientes,
    prendas: number[]
  ) {
    super(
      areaPsiquica,
      usoDroga,
      detallesDroga,
      dieta,
      genero,
      primerPaso,
      pacientes,
      prendas
    );

    this.antecedentePerinatales = antecedentes.antecedentePerinatales;
    this.antecedenteHospitalizaciones = antecedentes.antecedenteHospitalizaciones;
    this.antecedentesQuirurgicos = antecedentes.antecedentesQuirurgicos;
    this.antecedentesAlergicos = antecedentes.antecedentesAlergicos;
    this.antecedentesPni = antecedentes.antecedentesPni;
    this.funcionalidadGenital = antecedentes.funcionalidadGenital;
    this.antecedentesFamilia = antecedentes.antecedentesFamilia;

  }

  async crearCuartoPaso() {
 
    const query: string = `INSERT INTO HISTORIAS_CLINICAS VALUES (NULL, ?,?,?,?,?,?,?)`; 

    try {

      const setHeaderAntecedente: any = await consultasGenerales(query, [
        this.antecedentePerinatales,
        this.antecedenteHospitalizaciones,
        this.antecedentesQuirurgicos,
        this.antecedentesAlergicos,
        this.antecedentesPni,
        this.funcionalidadGenital,
        this.antecedentesFamilia,
      ]);

      const idAntecedentes = (setHeaderAntecedente as OkPacket).insertId;
      
      return idAntecedentes;
    } catch (err) {
      console.log(err);
      throw "Error al ejecutar la consulta";
    }
  }
  
  async actualizarCuartoPaso(idAntecedentes:number) {
    const conexion = await mysqlConnexion;
    const query:string = `UPDATE HISTORIAS_CLINICAS
    SET  detalles_antecedente_perinatales = ?, detalles_antecedentes_hospitalizaciones  = ?,
    detalles_antecedentes_quirurgicos =?,
    detalles_antecedentes_alergicos = ?,
    detalles_antecedentes_pni =  ?,
    detalles_funcionalidad_genital = ?,
    detalles_antecedentes_familia = ?
    WHERE id_historia_clinica = ? `;


    try{

      if(!idAntecedentes) return 0;
      
      await conexion?.query(query, [

        this.antecedentePerinatales, 
        this.antecedenteHospitalizaciones, 
        this.antecedentesQuirurgicos, 
        this.antecedentesAlergicos, 
        this.antecedentesPni, 
        this.funcionalidadGenital,
        this.antecedentesFamilia,
        idAntecedentes

      ]);

      return "Los datos han sido actualizados: cuarto paso";

    }catch(err:any){

      console.log(err);
      throw new Error(err);

    }

  }


}
