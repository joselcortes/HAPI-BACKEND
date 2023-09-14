import { NextFunction, Request, Response } from "express";

export function verificarToken(req:Request, res:Response, next:NextFunction){

    const header = req.headers;
    if(header.authorization === 'Bearer null'){
        return res.status(401).json({

            ok:false, 
            err: "debe haber un token"
        });
    }
    next(); 
}

