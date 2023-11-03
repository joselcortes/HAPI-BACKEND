import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { consultasGenerales } from "../../consultas/consultasGenerales";

export class Usuario {

  private rutProfesional?: string;
  private nombreProfesional?: string;
  private contrasenaProfesional?: string;
  private cargoProfesional?: string;
  private rolProfesional?: string;
  private centroProfesional?: number;
  private estadoProfesional?: number;


  //admin
  //commonUser

  constructor(
    rutProfesional?: string,
    nombreProfesional?: string,
    contrasenaProfesional?: string,
    cargoProfesional?: string,
    rolProfesional?: string,
    centroProfesional?: number,
    estadoProfesional?: number,
  ) {

    this.rutProfesional = rutProfesional;
    this.nombreProfesional = nombreProfesional;
    this.contrasenaProfesional = contrasenaProfesional;
    this.cargoProfesional = cargoProfesional;
    this.rolProfesional = rolProfesional;
    this.centroProfesional = centroProfesional;
    this.estadoProfesional = estadoProfesional;
   
  }

  async ingresarUsuario() {
    try {
      const query: string = `INSERT INTO PROFESIONALES_USUARIOS_SALUD VALUES (NULL,?,?,?,?,?,?,?)`;

      await consultasGenerales(query, [
        this.rutProfesional,
        this.nombreProfesional,
        this.contrasenaProfesional,
        this.cargoProfesional,
        this.rolProfesional,
        this.centroProfesional,
        1

      ]);

     
      return "Usuario ha sido creado";
    } catch (err) {
      console.log(err);
      throw "Error al crear el usuario";
    }
  }

  async actualizarUsuario(idProfesionalSalud: number) {
    try {
      if( this.contrasenaProfesional != undefined){
        const query: string = `
        UPDATE PROFESIONALES_USUARIOS_SALUD SET
        rut_profesional_salud = ?, 
        nombre_usuario = ?,
        contrasena = ?,
        cargo_profesional_salud  = ?,
        roles = ?,
        fk_centro_salud = ?,
        estado = ?
        WHERE id_profesional_salud = ?`;
  
  
        
        consultasGenerales(query, [
          this.rutProfesional,
          this.nombreProfesional,
          this.contrasenaProfesional,
          this.cargoProfesional,
          this.rolProfesional,
          this.centroProfesional,
          this.estadoProfesional,
          idProfesionalSalud,
        ]);
  
        return "Los cambios se han guardado correctamente";
      }else{
        const query: string = `
        UPDATE PROFESIONALES_USUARIOS_SALUD SET
        rut_profesional_salud = ?, 
        nombre_usuario = ?,
        cargo_profesional_salud  = ?,
        roles = ?,
        fk_centro_salud = ?,
        estado = ?
        WHERE id_profesional_salud = ?`;
  
  
        
        consultasGenerales(query, [
          this.rutProfesional,
          this.nombreProfesional,
          this.cargoProfesional,
          this.rolProfesional,
          this.centroProfesional,
          this.estadoProfesional,
          idProfesionalSalud,
        ]);
  
        return "Los cambios se han guardado correctamente";
      }
      
    } catch (err) {
      console.log(err);
      throw "Error al actualizar usuario";
    }
  }
  async listarUsuarios() {
   
    try {
      
      const rolApartado = "administrador";

      const query: string = `
        SELECT id_profesional_salud,
        rut_profesional_salud,
        nombre_usuario,
        cargo_profesional_salud,  
        fk_centro_salud, roles, estado FROM profesionales_usuarios_salud WHERE roles != ?`;

      const listUsuarios = await consultasGenerales(query, [rolApartado]);
      return listUsuarios;
    } catch (err) {
      console.log(err);
      throw "Error consulta listar usuario";
    }
  }


  async eliminarUsuario(idProfesionalSalud: number) {
   
    try {
      
      const rolApartado = "administrador";

      const query: string = `
        DELETE FROM PROFESIONALES_USUARIOS_SALUD WHERE id_profesional_salud = ${idProfesionalSalud}`;

      const listUsuarios = await consultasGenerales(query, [rolApartado]);
      return listUsuarios;
    } catch (err) {
      console.log(err);
      throw "Error consulta eliminar usuario";
    }
  }
  async listarUsuarioPorRut(rutUsuario: string) {
   
    try {
      
      const rutUser = rutUsuario 
      const rolApartado = "administrador";

      const query: string = `
        SELECT id_profesional_salud,
        rut_profesional_salud,
        nombre_usuario,
        cargo_profesional_salud,  
        fk_centro_salud, roles, estado FROM profesionales_usuarios_salud WHERE rut_profesional_salud = '${rutUser}'`;

      const listUsuarios = await consultasGenerales(query, [rutUser]);
      return listUsuarios;
    } catch (err) {
      console.log(err);
      throw "Error consulta listar usuario";
    }
  }

  async exitenciaUsuario(rutProfesional: string) {
    try {
      const query =
        "SELECT EXISTS (SELECT 1 FROM PROFESIONALES_USUARIOS_SALUD WHERE rut_profesional_salud = ?) AS existe_registro;";
      const existe = await consultasGenerales(query, [rutProfesional]);
      return existe[0].existe_registro;
    } catch (err) {
      console.log(err);
      throw "Error en la cosulta, existencia usuario";
    }
  }

  async buscarUsuario(id: number){
    try {
      const query: string = `
      select id_profesional_salud, nombre_usuario, cargo_profesional_salud,
      roles, co.nombre_comuna  , nombre_centro_salud ,logo  from PROFESIONALES_USUARIOS_SALUD as ps
      left join CENTROS_SALUD as cs on ps.fk_centro_salud = cs.id_centro_salud
      left join comunas as co on cs.id_comuna_fk = co.id_comuna
      where id_profesional_salud  = ?`;

      const listUsuarios = await consultasGenerales(query, [id]);
      return listUsuarios;
    } catch (err) {
      console.log(err);
      throw "Error consulta listar usuario";
    }
  }

 
  public setRutProfesional(rutProfesional: string): void {
    this.rutProfesional = rutProfesional;
  }
  public setNombreProfesional(nombreProfesional: string): void {
    this.nombreProfesional = nombreProfesional;
  }
  public setCargoProfesional(cargoProfesional: string): void {
    this.cargoProfesional = cargoProfesional;
  }
  public setContrasenaProfesional(contrasenaProfesional: string): void {
    this.contrasenaProfesional = contrasenaProfesional;
  }

  public setCentroProfesional(centroProfesional: number): void {
    this.centroProfesional = centroProfesional;
  }
  public setRolProfesional(rolProfesional: string): void {
    this.rolProfesional = rolProfesional;
  }

  public setEstado(estadoProfesional: number):void {
    
    this.estadoProfesional = estadoProfesional;
  }
}
