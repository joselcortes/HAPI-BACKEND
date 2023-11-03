import { Application, Router }  from "express";

import routerFormulario from './formulario.routes';
import tablarouter from './table.routes';
import routerMain from './main.routes';
import routerUsuario from './user.routes';
import routerSesion from './sesion.routes';
import routerApiFonasa from './apiCesfam.routes';
import routerFicha from './fichas.routes';
import routerCentros from './centro.routes'
import routerComunas from './comunas.routes'
import routerLogin from './login.routes'
import routerToken from './token.routes'

import TokenMiddleware from "../middlewares/validaToken.middleware";

const tokenMiddleware: TokenMiddleware = new TokenMiddleware();

const router = Router();

export function endPoints(app: Application){

    app.use('/api/v1', router);
    router.use('/form', routerFormulario);
    router.use('/tabla', tablarouter);
    router.use('/fichas', routerFicha);
    router.use('/main', routerMain);
    router.use('/usuario', routerUsuario);
    router.use('/centro',routerCentros);
    router.use('/sesion', routerSesion);
    router.use('/fonasa', routerApiFonasa);
    router.use('/comuna', routerComunas);
    router.use('/login', routerLogin);
    router.use('/token', routerToken );
}

