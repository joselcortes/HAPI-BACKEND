import mysql, {Connection} from "mysql2/promise";



class ConexionDatabase {

  sqlConexion:Promise<Connection>;

  constructor() {

      this.crearConexion();
      this.sqlConexion = this.crearConexion();
  }

  async crearConexion(){
    try {

      const objSql =await mysql.createConnection({

        host: "10.67.119.186",
        // host: 'localhost',
        database: "transicion_genero",
        user: "root",
        // password: "123456",

        password: "Cb7A506a",

      });

      return objSql;
    } catch (err) {

      console.log(`ERROR DE CONEXION A LA BASE DE DATOS ---> ${err}`);
      throw new Error("LA CONEXION A LA BASE DE DATOS SE HA PERDIDO");

    }
  }

  async getConnection(){

    if (!this.sqlConexion) {
      throw new Error("LA CONEXION AUN NO SE HA ESTABLECIDO");
    } 
    return this.sqlConexion;
  }



}

export default ConexionDatabase;
