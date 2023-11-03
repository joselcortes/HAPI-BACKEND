import { RequestHandler, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


export default class TokenMiddleware{
    constructor(){}
    
    public verificarToken: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
        const token = request.header('Authorization');
        if (token === undefined || token === '') {
            return response.status(200).json({
                verificar: false,
                msg: 'No existe token en verificar token.',
            });
        }

        try {
        
            jwt.verify(token, process.env.SECRET_TOKEN!);
            next();
        } catch (error) {
            return response.status(200).json({
                verificar: false,
                msg: 'El token está malformado verificar token',
            });
        }
    }

    public verificarTiempoToken:RequestHandler = ( req: Request, resp: Response, next: NextFunction) => {
        const token = req.header('Authorization')!;
       
        if(token === undefined || token === ''){
            return resp.status(200).json({
                verificar: false,
                msg: 'No existe el token',
            });
        }
        try {
            const deco:any = jwt.decode(token);
            const tiempoExpirado = deco.exp;
            // const zonaHoraria = 'America/Santiago';
            // const horaExpira = new Date(tiempoExpirado * 1000).toLocaleTimeString('es-CL', { timeZone: zonaHoraria});
            // const tiempoActual = new Date().toLocaleTimeString('es-CL', { timeZone: zonaHoraria });
            const tiempoActual = Date.now();
            const diferencia = tiempoExpirado * 1000 - tiempoActual

            const segundosfaltante = Math.floor((diferencia / 1000) % 60);
            const minutosfaltante = Math.floor((diferencia / 1000 / 60) % 60);
            const horafaltante = Math.floor(diferencia / 1000 / 60 / 60);

            if(horafaltante === 0 && minutosfaltante <= 3){
                next();
                return resp.status(200).json({
                    tiempoExpira: true,
                    msg: 'El token está por expirar',
                    minutosfaltante
                });
            }
            // console.log(`quedan ${horafaltante}: ${minutosfaltante}: ${segundosfaltante}`);
            // const diasRestantes = Math.floor(horasRestantes / 24);


           
            next();
        } catch (error) {
            
        }
    }
}