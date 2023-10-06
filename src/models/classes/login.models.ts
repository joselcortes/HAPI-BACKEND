import { consultasGenerales } from "../../consultas/consultasGenerales"
import jwt from "jsonwebtoken";
import { query } from 'express';
import bcrypt from 'bcryptjs';

export class Login {
    public secret?: string;
    private email?: string; 
    private password?: string;

    constructor (
        email?: string,
        password?: string,
    ) {
        this.email = email,
        this.password = password;
        // process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';
        
    }

    async verificarCuenta(){

        try {
            const sql = `select profesionales_usuarios_salud.*,
            cs.nombre_centro_salud as nombre_centro,
            cs.logo as ruta from profesionales_usuarios_salud
            inner join centros_salud as cs on profesionales_usuarios_salud.fk_centro_salud = cs.id_centro_salud
            where profesionales_usuarios_salud.nombre_usuario = ?`

            const res = await consultasGenerales(sql, [this.email]);
            if(res.length <= 0 )
            return res;
        } catch (error) {
            console.log(error);
        }
        
        
    }


    public static verificarCuentaLogin = ( usuario: string, password: string ): Promise<any> => {
        const sql = `select profesionales_usuarios_salud.*,
        cs.nombre_centro_salud as nombre_centro,
        cs.logo as ruta from profesionales_usuarios_salud
        inner join centros_salud as cs on profesionales_usuarios_salud.fk_centro_salud = cs.id_centro_salud
        where profesionales_usuarios_salud.nombre_usuario = ?`

        return new Promise(async (resolve, reject) => {
            const respuesta = await consultasGenerales(sql, [usuario]);
            if(respuesta.length <= 0) { 
                reject("Usuario o contraseña incorretos") 
                return;
            }
            if(!bcrypt.compareSync(password, respuesta[0].contrasena)){
                reject('Usuario o contraseña incorrectos')
                return;
            }
            if(respuesta[0].estado != 1){
                reject('El usuario se encuentra inactivo')
                return
            }
            resolve(respuesta);
            return
        });
    }

    public static generarToken = (usuario: any) => {
        const id = usuario[0].id_profesional_salud;
        const us = usuario[0].nombre_usuario;
        const rol = usuario[0].roles;
        const prof = usuario[0].cargo_profesional_salud;
        // const secret = process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';

        const payload: any = { id, us, rol, prof };

        return jwt.sign(payload, process.env.SECRET_TOKEN! , {
            expiresIn: '5h'
        })
    }

    public setEmail(email:string){
        this.email = email;
    }

    public setPassword(password: string){
        this.password = password;
    }
}