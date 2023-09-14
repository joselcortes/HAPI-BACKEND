import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { endPoints } from "../../routes";
import ConexionDatabase from "../../database/conexion.database";
import upload from 'express-fileupload';
import path from "path";

export class Server {
  private app: Application;
  private objConexion;

  constructor() {
    // process.env.PORT = '3003';
    // process.env.SECRET_TOKEN = 'MILuLTRAsECRETO';
    this.objConexion = new ConexionDatabase();
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }
  settings(): void {
    this.app.set("port", process.env.PORT || 3003);
  }
  middlewares(): void {


    this.app.use(cors({
      exposedHeaders: ['Authorization']
    }));

    this.app.use(upload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
  }))

   
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ limit: '10mb', extended: true }));
    this.app.use('/images', express.static(path.join(__dirname, 'dist/assets/img')));
  }

  routes(): void {
    endPoints(this.app);
  }

  async conexionDatabase() {
    try {
      return await this.objConexion.getConnection();
    } catch (err) {
      console.log(err);
    }
  }

  iniciarServidor(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("SERVER UP PORT " + this.app.get("port"));
      console.log(process.env.PORT);
    });
  }
}


