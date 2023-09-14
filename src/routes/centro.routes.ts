import { Request, Response, Router } from "express";
import fs from 'fs';
import { CentrosController } from "../controllers/centro.controller"; 
const router = Router();


router.post('/guardarCentro', CentrosController.crearCentro);
//Verificar archivo
router.get('/listarCentro', CentrosController.mostrarCentro);
router.get('/listarCentroRut/:idCentro', CentrosController.listarCentroRut )
router.post('/actualizarCentro/:idCentro',CentrosController.actualizarCentro);
router.post('/eliminarCentro/:idCentro', CentrosController.elimianrCentro );
router.get('/obtener-archivo/', (req: Request, res: Response) => {
    const ruta = req.query.ruta as string;

    fs.readFile(ruta, (err, data) => {
        const ruta = req.query.ruta as string;
        return res.download(ruta);
    });
   
})
export default router;