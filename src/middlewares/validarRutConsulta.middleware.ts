import { NextFunction, Request, Response } from "express";


export function validarRut( req: Request, res: Response, next: NextFunction){
    const {run} = req.params
    if(run === '' || run === null) return
    next();
}