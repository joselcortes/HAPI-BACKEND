import { Request, Response, response } from "express";
import { Login } from "../models/classes/login.models";
import { verificarToken } from '../middlewares/validarToken.middleware';
import { Usuario } from "../models/classes/usurio.model";
import jwt from "jsonwebtoken";


// let objLogin = new Login();
export default class LoginController {
    constructor(){}

    public login = (req: Request, response: Response) => {
        try {
            const { email, password} = req.body;
            const usuarioLogin: Promise<any> = Login.verificarCuentaLogin(email, password);
            usuarioLogin.then((res:any) => {
                const token = Login.generarToken(res);
                const tokendeco: any = jwt.decode(token);
                return response.status(200).json({
                    login: true,
                    usuario: res,
                    token: token,
                    tokenExpira: tokendeco.exp
                })
            }).catch(err => {
                console.log(err);
                return response.status(200).json({
                    login:false,
                    error: err
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    public verificarToken = async (req: Request, respon: Response) => {
        const token = req.header('Authorization');
        // const secret = process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';
        if( token === '' || token === undefined ||token === null){
            return respon.status(200).json({
                verificar: 'false',
                msg: 'token mal formado'
            });
        }

        const partesToken = token.split('.');
        const payloadCodificado = partesToken[1];
        const payloadCrudo = Buffer.from(payloadCodificado, 'base64').toString('ascii');
        const payloadJSON = JSON.parse(payloadCrudo);
        const usuario = new Usuario();
        
        try {
            const usuarioRes = await usuario.buscarUsuario(payloadJSON.id);
            jwt.verify(token!, process.env.SECRET_TOKEN!);
            return respon.status(200).json({
                verificar: true,
                usuario: usuarioRes,
            });
        } catch (error: any) {
            return respon.status(500).json({
                verificar: false,
                msg: 'Token malformado.',
            });
        }
    }

    public renovarToken = (request: Request, response: Response) => {
        // const {
        //     id,
        //     usuario,
        //     rol,
        //     profesion
        // } = request.body;
        
        const token = request.header('Authorization');

        if( token === '' || token === undefined ||token === null){
            return response.status(200).json({
                verificar: 'false',
                msg: 'token mal formado'
            });
        }
        const tokenDeco:any = jwt.decode(token);
        const id_profesional_salud = tokenDeco.id;
        const nombre_usuario = tokenDeco.us;
        const roles = tokenDeco.rol;
        const cargo_profesional_salud = tokenDeco.prof;

        const usuarioRenovar = [{
            id_profesional_salud,
            nombre_usuario,
            roles,
            cargo_profesional_salud
        }
        ];
        
        try {
            const token = Login.generarToken(usuarioRenovar);
            const tokendeco: any = jwt.decode(token);
            return response.status(200).json({
                renovar: true,
                token,
                tokenExpira: tokendeco.exp
            });
        } catch (error: any) {
            console.log(error);
            return response.status(200).json({
                renovar: false,
                msg: 'Error al renovar token.',
            });
        }
    }


    public verificarTiempoToken = ( req: Request, resp: Response) => {
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
            console.log('miunutos',minutosfaltante);
            if(horafaltante === 0 && minutosfaltante <= 3){
                return resp.status(200).json({
                    tokenTiempo: true,
                    msg: 'El token está por expirar',
                    minutosfaltante
                });
            }
            // console.log(`quedan ${horafaltante}: ${minutosfaltante}: ${segundosfaltante}`);
            // const diasRestantes = Math.floor(horasRestantes / 24);
           
        } catch (error) {
            
        }
    }

    // public buscarUsuario = async (req: Request, respon: Response) => {
    //     const token = req.header('Authorization');
    //     // const secret = process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';
    //     if( token === '' || token === undefined ||token === null){
    //         return respon.status(200).json({
    //             verificar: 'false',
    //             msg: 'token mal formado'
    //         });
    //     }

    //     const partesToken = token.split('.');
    //     const payloadCodificado = partesToken[1];
    //     const payloadCrudo = Buffer.from(payloadCodificado, 'base64').toString('ascii');
    //     const payloadJSON = JSON.parse(payloadCrudo);
    //     console.log(payloadJSON.id);
    //     const usuario = new Usuario();
        
    //     try {
    //         const usuarioRes = await usuario.buscarUsuario(payloadJSON.id);
    //         jwt.verify(token!, process.env.SECRET_TOKEN!);
    //         return respon.status(200).json({
    //             verificar: true,
    //             usuario: usuarioRes,
    //         });
    //     } catch (error: any) {
    //         return respon.status(500).json({
    //             verificar: false,
    //             msg: 'Token malformado.',
    //         });
    //     }
    // }

    
    // static async verificarUsuario(req: Request, res:Response){
    //     try {
    //         const { email, password } = req.body;
    //         objLogin.setEmail(email);
    //         objLogin.setPassword(password);
            
    //         const respuesta = await objLogin.verificarCuenta();
    //         // if(respuesta.length <= 0){ return false}
    //         // res.status(200).json(respuesta)

            
    //     } catch (error) {
            
    //     }
    // }
}