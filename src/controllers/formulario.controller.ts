import { Request, Response } from "express";

import {
  AntecedentesClinicos,
  PrimerPaso,
} from "../models/interfaces/tipos.entidades";
import {
  Pacientes,
  HistoriaGenero,
  AreaPsiquica,
} from "../models/interfaces/tipos.entidades";
import { fechaExacta } from "../utils/espesificarFecha";
import { FormularioCuartoPaso } from "../models/classes/formulario/cuarto.paso.model";
import { Ficha } from "../models/classes/fichaTecnica.model";
import { Fichas } from "../models/classes/historial.fichas.model";
import { consultasGenerales } from "../consultas/consultasGenerales";

const objFichas = new Fichas();

export class FormularioController {
  static async buscarFichaPaciente(req: Request, res: Response) {
    try {
      const { rutPaciente } = req.params;
      const dataFicha = await objFichas.listarInformacionPaciente(rutPaciente);

      res.status(200).json(dataFicha);
    } catch (err) {
      res.status(400).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }

  static async crearFichaTecnica(req: any, res: Response) {
    const {
      fichas,
      paciente,
      habitos,
      antecedentes,
      involucrado,
      acompanante,
      areaPsiquica,
      historialDrogas,
      genero,
      prendas,
    } = req.body;


    const nivel = parseInt(req.query.nivel as string);
    const idUsuario = parseInt(req.params.idUsuario as string);

    let fechaIngreso;
    let estado: boolean | undefined = true;

    fechaIngreso = fechaExacta();

    const historiaGeneroTipada: HistoriaGenero = genero;
    const areaPsiquicaTipada: AreaPsiquica = areaPsiquica;
    const antecedentesTipado: AntecedentesClinicos = antecedentes;
    const primerPasoTipado: PrimerPaso = {
      involucrado,
      acompanante,
    };

    const fichaTipada: Pacientes = paciente;
    

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
      if(paciente.fechaNacimientoPa == "NaN/aN/aN"){
        
        paciente.fechaNacimientoPa = null;
      }
      if(paciente.fechaNacimientoPa != undefined || paciente.fechaNacimientoPA != null){
        if(paciente.fechaNacimientoPa.length > 10)
        {
          paciente.fechaNacimientoPa = paciente.fechaNacimientoPa.slice(0,10)
        }
      }
      const objCuarto = new FormularioCuartoPaso(
        antecedentesTipado,
        areaPsiquicaTipada,
        historialDrogas.usoDrogas,
        historialDrogas.detallesDrogas,
        habitos.dieta,
        historiaGeneroTipada,
        primerPasoTipado,
        fichaTipada,
        prendas.prenda
      );

      const verificacionFicha = await Ficha.estatusFicha(paciente.rutPaciente);
    

      //update en caso de existir el paciente
      if (verificacionFicha && req.idTablas.idPaciente) {

        await objCuarto.actulizarPaciente(req.idTablas.idPaciente);
        await objCuarto.actualizarprimerPaso(
          req.idTablas.idInvolucrado,
          req.idTablas.idAcompanante
        );
        await objCuarto.actualizarSegundoPaso(
          req.idTablas.idGenero,
          req.idTablas.idPrenda
        );
        await objCuarto.actulizarTercerPaso(
          req.idTablas.idAreaPsiquica,
          req.idTablas.idDieta,
          req.idTablas.idDrogas
        );
        await objCuarto.actualizarCuartoPaso(req.idTablas.idAntecedente);

        const objFichas = new Ficha(
          fechaIngreso,
          estado,
          nivel,
          fichas.apoyoEscolar,
          fichas.judicializacion,
          fichas.detallesApoyo,
          fichas.detallesJudicializacion
        );

        const msj = await objFichas.actulizarFicha(req.idTablas.idFicha);
        return res.status(201).json(msj);
      }

      //Actualiza el paciente si ya está registrado
      const dataPaciente = await objCuarto.consultarPaciente(fichaTipada.rutPaciente)
      if(dataPaciente){
        await objCuarto.actulizarPaciente(req.idTablas.idPaciente);
      }


      const idPaciente = await objCuarto.crearPaciente();

      const idPrimerPaso = await objCuarto.guardarPrimerPaso();
      const idhistoriaGenero = await objCuarto.crearSegundoPaso(idPaciente);
      const idTecerPaso = await objCuarto.crearTercerPaso(idPaciente);
      const idCuartoPaso = await objCuarto.crearCuartoPaso();
      const objFichas = new Ficha(
        fechaIngreso,
        estado,
        nivel,
        fichas.apoyoEscolar,
        fichas.judicializacion,
        fichas.detallesApoyo,
        fichas.detallesJudicializacion,
        idPaciente,
        idUsuario,
        idTecerPaso.idAreaPsiquica,
        idCuartoPaso,
        idPrimerPaso.idInvolucrado,
        idPrimerPaso.idAcompanante,
        idhistoriaGenero.idHgenero,
      );
      const msj = await objFichas.crearFichaTecnica();

      res.status(201).json(msj);
    } catch (err: any) {
      res.status(201).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }

  static async finalizar(req: Request, res: Response) {
    
    const {idFicha} = req.query;
    const objFicha = new Ficha();
    try {
      const resFinalizacion = await objFicha.finalizarFicha(parseInt(idFicha as string));
      return res.status(201).json(resFinalizacion);

    } catch (err) {
      return res.status(400).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }

  static async GuardaryFinalizarFichaTecnica(req: any, res: Response) {
    const {
      fichas,
      paciente,
      habitos,
      antecedentes,
      involucrado,
      acompanante,
      areaPsiquica,
      historialDrogas,
      genero,
      prendas,
    } = req.body;

    const nivel = parseInt(req.query.nivel as string);
    const idUsuario = parseInt(req.params.idUsuario as string);
    const {idFicha} = req.query;

    let fechaIngreso;
    let estado: boolean | undefined = false;

    fechaIngreso = fechaExacta();

    const historiaGeneroTipada: HistoriaGenero = genero;
    const areaPsiquicaTipada: AreaPsiquica = areaPsiquica;
    const antecedentesTipado: AntecedentesClinicos = antecedentes;
    const primerPasoTipado: PrimerPaso = {
      involucrado,
      acompanante,
    };

    const fichaTipada: Pacientes = paciente;

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
           
      if(paciente.fechaNacimientoPa == "NaN/aN/aN"){
        
        paciente.fechaNacimientoPa = null;
      }

      if(paciente.fechaNacimientoPa != undefined || paciente.fichaNacimientoPa != null){
        if(paciente.fechaNacimientoPa.length > 10)
        {
          paciente.fechaNacimientoPa = paciente.fechaNacimientoPa.slice(0,10)
        }
      }
      const pacienteTipado: Pacientes = {
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

      const objCuarto = new FormularioCuartoPaso(
        antecedentesTipado,
        areaPsiquicaTipada,
        historialDrogas.usoDrogas,
        historialDrogas.detallesDrogas,
        habitos.dieta,
        historiaGeneroTipada,
        primerPasoTipado,
        pacienteTipado,
        prendas.prenda
      );
      
      const verificacionFicha = await Ficha.estatusFicha(paciente.rutPaciente);
      //update en caso de existir el paciente
      if (verificacionFicha && req.idTablas.idPaciente) {
        await objCuarto.actulizarPaciente(req.idTablas.idPaciente);
        await objCuarto.actualizarprimerPaso(
          req.idTablas.idInvolucrado,
          req.idTablas.idAcompanante
        );
        await objCuarto.actualizarSegundoPaso(
          req.idTablas.idGenero,
          req.idTablas.idPrenda
        );
        await objCuarto.actulizarTercerPaso(
          req.idTablas.idAreaPsiquica,
          req.idTablas.idDieta,
          req.idTablas.idDrogas
        );
        await objCuarto.actualizarCuartoPaso(req.idTablas.idAntecedente);
        const objFichas = new Ficha(
          fechaIngreso,
          estado,
          nivel,
          fichas.apoyoEscolar,
          fichas.judicializacion,
          fichas.detallesApoyo,
          fichas.detallesJudicializacion
        );
        const msj = await objFichas.actulizarFinalizarFicha(req.idTablas.idFicha);

        // const msj = await objFichas.actulizarFicha(req.idTablas.idFicha);
        // await objFichas.finalizarFicha(parseInt(idFicha as string));

        return res.status(201).json(msj);
      }
      //Actualiza el paciente si ya está registrado
      const dataPaciente = await objCuarto.consultarPaciente(fichaTipada.rutPaciente)
      if(dataPaciente){
        await objCuarto.actulizarPaciente(req.idTablas.idPaciente);
      }
      
      const idPaciente = await objCuarto.crearPaciente();
      const idPrimerPaso = await objCuarto.guardarPrimerPaso();
      const idhistoriaGenero = await objCuarto.crearSegundoPaso(idPaciente);
      const idTecerPaso = await objCuarto.crearTercerPaso(idPaciente);
      const idCuartoPaso = await objCuarto.crearCuartoPaso();

      const objFichas = new Ficha(
        fechaIngreso,
        estado,
        nivel,
        fichas.apoyoEscolar,
        fichas.judicializacion,
        fichas.detallesApoyo,
        fichas.detallesJudicializacion,
        idPaciente,
        idUsuario,
        idTecerPaso.idAreaPsiquica,
        idCuartoPaso,
        idPrimerPaso.idInvolucrado,
        idPrimerPaso.idAcompanante,
        idhistoriaGenero.idHgenero,
      );
      const msj = await objFichas.crearFinalizarFichaTecnica();
      // await objFichas.finalizarFicha(parseInt(idFicha as string));

      res.status(201).json(msj);
    } catch (err: any) {
      res.status(500).json({
        err,
        msj: "Error interno del servidor",
      });
    }
  }
}
