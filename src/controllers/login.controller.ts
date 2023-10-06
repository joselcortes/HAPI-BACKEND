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
                const token = Login.generarToken(res)
                return response.status(200).json({
                    login: true,
                    usuario: res,
                    token: token
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

    public buscarUsuario = async (req: Request, respon: Response) => {
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
        console.log(payloadJSON.id);
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