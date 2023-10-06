import { RequestHandler, NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


export default class TokenMiddleware{
    constructor(){}
    
    public verificarToken: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
        const token = request.header('Authorization');

        if (token === undefined || token === '') {
            return response.status(200).json({
                verificar: false,
                msg: 'No existe token.',
            });
        }

        try {
            jwt.verify(token, process.env.SECRET_TOKEN!);
            next();
        } catch (error) {
            console.log('malisimo');
            return response.status(200).json({
                verificar: false,
                msg: 'El token está malformado',
            });
        }
    }
}