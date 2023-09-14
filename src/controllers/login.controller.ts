import { Request, Response } from "express";


export class LoginController {
    public Login = (req: Request, res: Response) => {
        try {
            const { email, password} = req.body;
            // const usuarioLogin: Promise<any> =
        } catch (error) {
            console.log(error);
        }
    } 
}