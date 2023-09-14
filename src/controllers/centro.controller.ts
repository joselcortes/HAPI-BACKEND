
import express,{ Request, Response } from 'express';
const fs = require('fs').promises
import { Centros } from '../models/classes/centros.model';
import { crearImagen } from '../helpers/uploadImagen.middleware';
const app = express();



let centro_salud = new Centros();
export class CentrosController{
    static async crearCentro(req: Request, res: Response){
        try {
            let {
                nombre_centro_salud,
                comuna_centro_salud,
                logo,
            } = req.body
            const { archivo }:any = req.files;

            let ext = archivo.name.slice(-4)
            let nombre = nombre_centro_salud.replace(/\s+/g, '_');
            let nombreArchivo = nombre + ext
            let nuevoLogo = `dist/assets/img/${nombreArchivo}`;
            
            centro_salud.setNombreCentroSalud(nombre_centro_salud);
            centro_salud.setComunaCentroSalud(comuna_centro_salud)
            centro_salud.setLogo(nuevoLogo);
            
            const resp = await centro_salud.guardarCentro()
            if(resp === 'ok'){
                crearImagen(archivo, nombreArchivo);
            }
            res.status(200).json(resp)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msj: false,
                error
            })
        }
    }

    static async listarCentroRut(req: Request, res: Response){
        try {
            const { idCentro } = req.params
            const resp = await centro_salud.mostrarCentrosRut(idCentro)
            res.status(200).json(resp);
        } catch (error) {
            res.status(500).json({
                msg: 'Error en la conexion',
                error
            })
        }
    }

    static async mostrarCentro(req: Request, res: Response){
        try {
            const resp = await centro_salud.mostrarCentros();
            res.status(200).json(resp);
        } catch (error) {
            res.status(500).json({
                msg: 'Error en la conexión',
                error
            })
        }
    }

    static async elimianrCentro(req: Request, res: Response){
        try {
            // const rutaCentros = req.body;
            const {ruta} = req.body
            const {idCentro} = req.params
            const eliminar = await centro_salud.eliminarCentro(parseInt(idCentro));
            if(eliminar.serverStatus === 2){
                fs.unlink(ruta)
                    .then(() => {
                        console.log('File removed')
                    }).catch((err:any) => {
                        console.error('Something wrong happened removing the file', err)
                    })
            }
            res.status(200).json(eliminar)
        } catch (error) {
            res.status(500).json({
                msg: 'Error al conectar',
                error
            })
        }
    }

    static async actualizarCentro(req: Request, res: Response){
        try {
            let archivos:any;
            let ext;
            let nombre;
            let nombreArchivo;
            let nuevoLogo:any;
            let {
                nombre_centro_salud,
                comuna_centro_salud,
                logo
            } = req.body

            if( req.files) {
                
                const {archivo}:any = req.files;
                archivos = archivo
                ext = archivo.name.slice(-4)
                nombre = nombre_centro_salud.replace(/\s+/g, '_');
                nombreArchivo = nombre + ext
                nuevoLogo = `dist/assets/img/${nombreArchivo}`;
                console.log(archivo);
            }
            const { idCentro } = req.params
            
            centro_salud.setNombreCentroSalud(nombre_centro_salud);
            centro_salud.setComunaCentroSalud(comuna_centro_salud)
            centro_salud.setLogo(nuevoLogo);

            let resp;
            //TODO: cambiar el nombre de la imagen
            if(req.files){
                resp = await centro_salud.actualizarCentro(parseInt(idCentro))
                if(resp === 'ok'){
    
                        fs.unlink(logo)
                        .then(() => {
                            console.log('File removed')
                        }).catch((err:any) => {
                            console.error('Something wrong happened removing the file', err)
                        })

                        crearImagen(archivos, nombreArchivo);
                }
            }else {
                resp = await centro_salud.actualizarCentroSinImg(parseInt(idCentro))
            }
            
            res.status(200).json(resp)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msj: false,
                error
            })
        }
    }
}
