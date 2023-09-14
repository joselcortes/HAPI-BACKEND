

    export interface Pacientes {

      rutPaciente?: string;
      nombrePaciente: string;
      apellidoPaternoPa: string | null;
      apellidoMaternoPa: string | null;
      pronombre: string | null;
      nombreSocial: string | null;
      fechaNacimientoPa: string| null;
      domicilioPaciente: string | null;
      telefonoPaciente: string | null;
    }




export interface AntecedentesClinicos {

  antecedentePerinatales: string | null;
  antecedenteHospitalizaciones: string | null;
  antecedentesQuirurgicos: string | null;
  antecedentesAlergicos: string | null;
  antecedentesPni: string | null;
  funcionalidadGenital: string | null;
  antecedentesFamilia:string | null
}



export interface AreaPsiquica {
  controlEquipoSaludMental?: boolean;
  psicoterapia?: boolean;
  evaluacionPsiquica?: boolean;
  diagnosticoPsiquiatrico?: boolean;
  utilizacionFarmaco?: boolean;
  detallesFarmacos?: string | null;
}

export interface PrimerPaso{

  involucrado: {

    rutInvolucrado: string | null;
    nombreInvolucrado: string | null;
    apellidoPInvolucrado: string | null;
    apellidoMInvolucrado: string | null;
    fechaNacimiento: string | null

    parentescoInvolucrado: string | null;
    telefonoInvolucrado: string | null;
    domicilioInvolucrado: string | null;
  
  },
  acompanante: {

      rutInvolucrado: string | null;
      nombreInvolucrado: string | null;
      apellidoPInvolucrado: string | null;
      apellidoMInvolucrado: string | null;
      fechaNacimiento: string | null;
      parentescoInvolucrado: string | null;
      telefonoInvolucrado: string | null;
      domicilioInvolucrado: string | null;

  
    }
}

export interface HistoriaDrogas {
  usoDroga?: boolean;
  detalleDroga?: string;
}

export interface AntecedentesFamilia {
  antecedente?: boolean;
  detalleAntecedente?: boolean;
}


export interface Dieta {
  tipoDieta: string;
}

export interface HistoriaGenero {
    
    identidadGenero: string | null;
    orientacionSexual: string | null;
    autoPercepcion: number | null;
    inicioTransicioSexual: string | null;
    tiempoLatencia: string | null;
    apoyoFamiliar: boolean;
    usoPrenda: boolean;
    presenciaDisforia: boolean;
    detallesDiforia: string | null;
    // nombrePacienteHG: string;
    // apellidoPaternoPaHG: string;
    // apellidoMaternoPaHG: string;
   

  
}

