import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Comunas {

    private id_comuna?: string
    private nombre_comuna?: string;

    constructor (
        id_comuna?:string,
        nombre_comuna?:string,
    ){
        this.id_comuna = id_comuna;
        this.nombre_comuna = nombre_comuna;
    }

    async listarComuna(){
        try {
            const query:string = 'select * from comunas';
            const res = await consultasGenerales(query);
            return res;
        } catch (error) {
            return error;
        }
    }

    async listarComunaId(idComuna: string){
        try {
            const query:string = 'select nombre_comuna from comunas where id_comuna = ?';
            const respuesta = await consultasGenerales(query, [parseInt(idComuna)]);
            return respuesta
        } catch (error) {
            return error
        }
    }

}