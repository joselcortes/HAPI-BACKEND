import { Request, Response } from "express";
import { Login } from "../models/classes/login.models";


let objLogin = new Login();
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
                    // token: token
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
    
    static async verificarUsuario(req: Request, res:Response){
        try {
            const { email, password } = req.body;
            objLogin.setEmail(email);
            objLogin.setPassword(password);
            
            const respuesta = await objLogin.verificarCuenta();
            // if(respuesta.length <= 0){ return false}
            // res.status(200).json(respuesta)

            
        } catch (error) {
            
        }
    }
}