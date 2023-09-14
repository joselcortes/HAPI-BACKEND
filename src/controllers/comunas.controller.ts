
import express,{ Request, Response } from 'express';
import { Comunas } from '../models/classes/comunas.model';

let comunas = new Comunas();
export class ComunasController{
    static async listarComunas(req: Request, res: Response){
        try {
            const respo = await comunas.listarComuna();
            return res.json(respo);
        } catch (error) {
            return res.status(500).json({
                error, 
                msg: 'Error en el servidor'
                
            })
        }
    }

    static async listarComunasId(req: Request, res:Response){
        try {
            const {idComuna} = req.params;
            const repo = await comunas.listarComunaId(idComuna);
            return res.json(repo)

        } catch (error) {
            
        }
    }
}
