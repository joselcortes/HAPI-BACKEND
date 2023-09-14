import express, {NextFunction, Request, Response} from 'express';
import fs from 'fs';
const app = express();

export function crearImagen(archivo: any, nombre: string){
    let sampleFile;
    let uploadPath;
    sampleFile = archivo;
    uploadPath = `dist/assets/img/${nombre}`;
    sampleFile.mv(uploadPath, function(err: any) {
      if (err) {
        console.log('no se subio el archivo');
      }
    });
}

