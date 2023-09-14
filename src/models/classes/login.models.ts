import { consultasGenerales } from "../../consultas/consultasGenerales"
import { query } from 'express';

export class Login {
    public static verificarCuenta = ( usuario: string, password: string ): Promise<any> => {
        const sql = `select profesionales_usuarios_salud.*,
        cs.nombre_centro_salud as nombre_centro,
        cs.logo as ruta from profesionales_usuarios_salud
        inner join centros_salud as cs on profesionales_usuarios_salud.fk_centro_salud = cs.id_centro_salud
        where profesionales_usuarios_salud.nombre_usuario = ?`


        return new Promise((resolve, reject) => {
            consultasGenerales(sql,[usuario])
        })
    }
}