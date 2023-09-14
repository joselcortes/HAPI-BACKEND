import { consultasGenerales } from "../../consultas/consultasGenerales";
import { query } from 'express';


export class Centros {
    private nombre_centro_salud?: string;
    private comuna_centro_salud?: string;
    private logo?: string;


    constructor(
        nombre_centro?: string,
        comuna_centro?: string,
        logo?: string,
    ){

        this.nombre_centro_salud = nombre_centro;
        this.comuna_centro_salud = comuna_centro;
        this.logo = logo;

    }

    async guardarCentro(){
        try {
           const query: string = 'insert into centros_salud values (null, ?, ?, ?)'

           await consultasGenerales(query,[
            this.nombre_centro_salud,
            this.comuna_centro_salud,
            this.logo
           ]);

           return 'ok'
        } catch (error) {
            throw 'Error al crear el centro'
        }
    }

    async actualizarCentro(idCentro: number){
        try {
            const query: string = `
                update centros_salud set
                nombre_centro_salud = ?,
                id_comuna_fk = ?,
                logo = ?
                where id_centro_salud = ?
            `

            consultasGenerales( query, [
                this.nombre_centro_salud,
                this.comuna_centro_salud,
                this.logo,
                idCentro
            ])
            return 'ok'
        } catch (error) {
            throw 'Error al actualizar el centro'
        }
    }

    async actualizarCentroSinImg(idCentro: number){
        try {
            console.log(idCentro);
            const query: string = `
                update centros_salud set
                nombre_centro_salud = ?,
                id_comuna_fk = ?
                where id_centro_salud = ?
            `

            consultasGenerales( query, [
                this.nombre_centro_salud,
                this.comuna_centro_salud,
                idCentro
            ])
            return 'ok'
        } catch (error) {
            throw 'Error al actualizar el centro'
        }
    }

    async mostrarCentros(){
        try {
            const query: string = 'select id_centro_salud, c.nombre_comuna  ,nombre_centro_salud,logo  from centros_salud cs left join comunas c on cs.id_comuna_fk = c.id_comuna ';
            const mostrarCentros = await consultasGenerales(query)
            return mostrarCentros;
        } catch (error) {
            return error;
        }
    }

    async mostrarCentrosRut(idCentro: any){
        try {
            const query: string = 'SELECT * FROM centros_salud where id_centro_salud = ?';
            const mostrarCentros = await consultasGenerales(query, [idCentro])
            return mostrarCentros;
        } catch (error) {
            return error;
        }
    }

    async eliminarCentro(idCentro:number){
        try {
            const query: string = 'DELETE FROM centros_salud WHERE id_centro_salud=?'
            const eliminarCentro = await consultasGenerales(query, [idCentro]);
            return eliminarCentro;
        } catch (error) {
            return error;
        }
    }


    public setNombreCentroSalud(nombre: string){
        this.nombre_centro_salud = nombre
    }

    public setComunaCentroSalud(comuna: string){
        this.comuna_centro_salud = comuna
    }

    public setLogo(logo: string){
        this.logo = logo;
    }

}